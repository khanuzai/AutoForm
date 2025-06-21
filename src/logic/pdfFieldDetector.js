import * as pdfjsLib from 'pdfjs-dist'

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

export const detectPDFFields = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    
    const fields = []
    const fieldPatterns = [
      // Common form field patterns
      { pattern: /name/i, field: 'name' },
      { pattern: /email/i, field: 'email' },
      { pattern: /phone/i, field: 'phone' },
      { pattern: /address/i, field: 'address' },
      { pattern: /age/i, field: 'age' },
      { pattern: /experience/i, field: 'experience' },
      { pattern: /education/i, field: 'education' },
      { pattern: /skills/i, field: 'skills' },
      { pattern: /goals/i, field: 'goals' },
      { pattern: /interests/i, field: 'interests' },
      { pattern: /company/i, field: 'company' },
      { pattern: /position/i, field: 'position' },
      { pattern: /title/i, field: 'title' },
      { pattern: /date/i, field: 'date' },
      { pattern: /signature/i, field: 'signature' },
      // Generic patterns
      { pattern: /^[A-Z][a-z]+:$/, field: 'custom' }, // Matches "Field:" patterns
      { pattern: /^[A-Z][a-z]+\s+[A-Z][a-z]+:$/, field: 'custom' }, // Matches "Field Name:" patterns
    ]
    
    // Process each page
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum)
      const textContent = await page.getTextContent()
      
      // Get page dimensions
      const viewport = page.getViewport({ scale: 1.0 })
      
      textContent.items.forEach((item) => {
        const text = item.str.trim()
        if (!text) return
        
        // Check if text matches any field pattern
        for (const { pattern, field } of fieldPatterns) {
          if (pattern.test(text)) {
            const fieldName = text.replace(/[:.]$/, '').toLowerCase()
            fields.push({
              field: field === 'custom' ? fieldName : field,
              originalText: text,
              page: pageNum,
              x: item.transform[4],
              y: item.transform[5],
              width: item.width,
              height: item.height,
              pageWidth: viewport.width,
              pageHeight: viewport.height
            })
            break
          }
        }
      })
    }
    
    return fields
  } catch (error) {
    console.error('Error detecting PDF fields:', error)
    throw new Error('Failed to process PDF file')
  }
}

export const fillPDFWithData = async (file, profileData) => {
  try {
    const { PDFDocument } = await import('pdf-lib')
    
    const arrayBuffer = await file.arrayBuffer()
    const pdfDoc = await PDFDocument.load(arrayBuffer)
    const form = pdfDoc.getForm()
    
    // Get all form fields
    const fields = form.getFields()
    
    // Create a comprehensive mapping of profile data
    const fieldMapping = {
      name: profileData.name,
      email: profileData.email || '',
      phone: profileData.phone || '',
      address: profileData.address || '',
      age: profileData.age || '',
      experience: profileData.experience || '',
      education: profileData.education || '',
      skills: profileData.skills || '',
      goals: profileData.goals || '',
      interests: profileData.interests || '',
      // Add common variations
      fullname: profileData.name,
      firstname: profileData.name.split(' ')[0] || profileData.name,
      lastname: profileData.name.split(' ').slice(1).join(' ') || '',
      contact: profileData.email || profileData.phone || '',
      workexperience: profileData.experience || '',
      educationalbackground: profileData.education || '',
      technicalskills: profileData.skills || '',
      careerobjectives: profileData.goals || '',
      personalinterests: profileData.interests || ''
    }
    
    let filledFields = 0
    
    // Fill each form field
    fields.forEach((field) => {
      const fieldName = field.getName().toLowerCase()
      const fieldType = field.constructor.name
      
      // Try to match field names with profile data
      for (const [key, value] of Object.entries(fieldMapping)) {
        if (value && (
          fieldName.includes(key) || 
          key.includes(fieldName) ||
          fieldName.replace(/[^a-z]/g, '').includes(key) ||
          key.includes(fieldName.replace(/[^a-z]/g, ''))
        )) {
          if (fieldType === 'PDFTextField') {
            try {
              field.setText(value)
              filledFields++
              console.log(`Filled field "${fieldName}" with "${value}"`)
            } catch (error) {
              console.warn(`Could not fill field "${fieldName}":`, error)
            }
          }
          break
        }
      }
    })
    
    console.log(`Successfully filled ${filledFields} fields`)
    return { pdfDoc, filledFields }
    
  } catch (error) {
    console.error('Error filling PDF:', error)
    throw new Error('Failed to fill PDF form')
  }
}

export const createSamplePDF = async () => {
  try {
    const { PDFDocument, rgb, StandardFonts } = await import('pdf-lib')
    
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([612, 792]) // US Letter size
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const fontSize = 12
    
    // Add title
    page.drawText('Sample Application Form', {
      x: 50,
      y: 750,
      size: 18,
      font,
      color: rgb(0, 0, 0)
    })
    
    // Add form fields
    const fields = [
      { label: 'Name:', y: 700 },
      { label: 'Email:', y: 670 },
      { label: 'Phone:', y: 640 },
      { label: 'Address:', y: 610 },
      { label: 'Age:', y: 580 },
      { label: 'Education:', y: 550 },
      { label: 'Experience:', y: 520 },
      { label: 'Skills:', y: 490 },
      { label: 'Goals:', y: 460 },
      { label: 'Interests:', y: 430 }
    ]
    
    fields.forEach(({ label, y }) => {
      page.drawText(label, {
        x: 50,
        y,
        size: fontSize,
        font,
        color: rgb(0, 0, 0)
      })
      
      // Draw underline for input field
      page.drawLine({
        start: { x: 120, y: y - 5 },
        end: { x: 400, y: y - 5 },
        thickness: 1,
        color: rgb(0, 0, 0)
      })
    })
    
    return await pdfDoc.save()
  } catch (error) {
    console.error('Error creating sample PDF:', error)
    throw new Error('Failed to create sample PDF')
  }
} 