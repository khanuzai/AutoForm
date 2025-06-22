import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { saveAs } from 'file-saver';
import { fillFormWithHuggingFace } from './fillFormWithHuggingFace';

// Setting up the PDF.js worker is crucial for it to work in a web environment.
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// This dictionary maps profile data keys to an array of regex patterns.
// This makes the label detection far more flexible and robust.
const FIELD_PATTERNS = {
    name: [/full\s*name/i, /name/i],
    firstName: [/first\s*name/i, /given\s*name/i],
    lastName: [/last\s*name/i, /surname/i],
    email: [/email\s*address/i, /email/i],
    phone: [/phone\s*number/i, /phone/i, /mobile/i, /contact\s*no/i],
    address: [/address/i, /street/i, /mailing\s*address/i],
    city: [/city/i],
    state: [/state/i, /province/i],
    zipCode: [/zip\s*code/i, /postal\s*code/i],
    country: [/country/i],
    company: [/company/i, /organization/i, /employer/i],
    position: [/position/i, /job\s*title/i, /role/i],
};

// A helper function to find the best match for a field in the PDF text.
const findFieldMatch = (text, patterns) => {
    for (const pattern of patterns) {
        if (pattern.test(text)) {
            return true;
        }
    }
    return false;
};

const buildAgentPrompt = (pdfText, userProfile) => {
  const instructions = `
You are an AI assistant. Your task is to analyze the text of a PDF form and a user's profile, and then map the user's information to the correct fields in the form.

Return a single JSON object where keys are the form field labels from the PDF and values are the corresponding data from the user's profile.

**Example Task:**

*PDF Text Contains:*
"Full Name: _________"
"Date of Birth: ________"

*User Profile:*
{ "name": "Jane Doe", "dob": "1990-01-01" }

**Your Output (must be only a single JSON object):**
{
  "Full Name": "Jane Doe",
  "Date of Birth": "1990-01-01"
}

**Rules:**
- Match labels semantically (e.g., "DOB" or "Date of Birth" should map to the "dob" profile value).
- Only include fields found in the PDF text.
- Do not invent fields.
- The output must be a single, valid JSON object.

Begin processing the following inputs now.
`;

  const formattedProfile = `UserProfile:
${JSON.stringify(userProfile, null, 2)}
`;

  const formattedPdfText = `PDFText:
${pdfText}
`;

  return `${instructions}\n${formattedProfile}\n${formattedPdfText}`;
};

export const fillPdfForm = async (file, profileData) => {
  console.log("Starting advanced PDF filling process...");
  const fileBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(fileBuffer);
  
  // --- Priority 1: Attempt to fill AcroForm fields ---
  const form = pdfDoc.getForm();
  const acroFields = form.getFields();
  let filledAcroFields = 0;

  if (acroFields.length > 0) {
    console.log(`Found ${acroFields.length} interactive AcroForm fields. Attempting to fill them.`);
    // Basic mapping for now, can be improved with AI later
    const fieldMapping = {
      name: [/name/i], email: [/email/i], phone: [/phone/i], address: [/address/i],
      company: [/company/i], position: [/position/i],
    };
    acroFields.forEach(field => {
      const fieldName = field.getName();
      for (const [key, patterns] of Object.entries(fieldMapping)) {
        if (profileData[key] && patterns.some(p => p.test(fieldName))) {
          try {
            field.setText(profileData[key]);
            console.log(`Filled AcroForm field '${fieldName}' with '${profileData[key]}'`);
            filledAcroFields++;
            break;
          } catch (e) { console.warn(`Could not fill AcroForm field '${fieldName}'.`); }
        }
      }
    });
  }

  if (filledAcroFields > 0) {
      console.log("Successfully filled interactive form fields. Saving result.");
  } else {
    console.log("No interactive fields filled. Falling back to text-based AI filling.");

    // --- Priority 2: Text-based Analysis ---
    const pdfJsDoc = await pdfjsLib.getDocument({ data: fileBuffer.slice(0) }).promise;
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    for (let i = 0; i < pdfJsDoc.numPages; i++) {
      const page = pdfDoc.getPages()[i];
      const textContent = await (await pdfJsDoc.getPage(i + 1)).getTextContent();
      const viewport = page.getViewport({ scale: 1.0 });
      
      const lines = {}; // Use an object to group text items by line
      textContent.items.forEach(item => {
        if (typeof item.str !== 'string' || !item.str.trim()) return;
        const y = Math.round(viewport.height - item.transform[5]);
        if (!lines[y]) lines[y] = [];
        lines[y].push({ text: item.str, x: Math.round(item.transform[4]), width: item.width });
      });

      const pageText = Object.values(lines).map(line => line.map(l => l.text).join(' ')).join('\n');
      if (!pageText.trim()) continue;

      const prompt = buildAgentPrompt(pageText, profileData);
      const jsonResponse = await fillFormWithHuggingFace(profileData, prompt, true);
      const fieldsToFill = JSON.parse(jsonResponse);
      console.log(`AI response for page ${i + 1}:`, fieldsToFill);

      for (const [label, value] of Object.entries(fieldsToFill)) {
        for (const line of Object.values(lines)) {
          const lineText = line.map(l => l.text).join(' ');
          if (lineText.includes(label)) {
            const labelItem = line.find(item => item.text.includes(label));
            if (!labelItem) continue;

            let x;
            // Heuristic A: Look for underscores
            if (lineText.includes('___')) {
              const underscoreItem = line.find(item => item.text.includes('___'));
              x = underscoreItem.x;
            } else {
              // Heuristic B: Dynamic offset based on label width
              const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
              const labelWidth = font.widthOfTextAtSize(labelItem.text, 10);
              x = labelItem.x + labelWidth + 10;
            }
            
            const y = viewport.height - (Object.keys(lines).find(key => lines[key] === line));
            
            page.drawText(String(value), { x, y: y - 2, size: 10, font, color: rgb(0, 0, 0) });
            
            // Debugging Rectangle
            page.drawRectangle({
              x: x - 1, y: y - 4, width: font.widthOfTextAtSize(String(value), 10) + 2, height: 12,
              borderColor: rgb(0, 1, 0), borderWidth: 0.5, opacity: 0.2,
            });

            break; 
          }
        }
      }
    }
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  saveAs(blob, `filled-${file.name}`);
  console.log("PDF processing complete. Download initiated.");
}; 