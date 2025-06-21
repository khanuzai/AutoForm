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
    
    // First, try to detect actual PDF form fields
    try {
      const { PDFDocument } = await import('pdf-lib')
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      const form = pdfDoc.getForm()
      const formFields = form.getFields()
      
      console.log('Found PDF form fields:', formFields.length)
      
      formFields.forEach((field, index) => {
        const fieldName = field.getName()
        const fieldType = field.constructor.name
        console.log(`Form field ${index}: ${fieldName} (${fieldType})`)
        
        fields.push({
          field: fieldName.toLowerCase(),
          originalText: fieldName,
          page: 1, // Most forms are single page
          isFormField: true,
          fieldType: fieldType
        })
      })
    } catch (formError) {
      console.log('No interactive form fields found, falling back to text detection')
    }
    
    // If no form fields found, detect text patterns
    if (fields.length === 0) {
      console.log('Detecting text patterns in PDF...')
      
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
                pageHeight: viewport.height,
                isFormField: false
              })
              break
            }
          }
        })
      }
    }
    
    console.log('Total fields detected:', fields.length)
    return fields
  } catch (error) {
    console.error('Error detecting PDF fields:', error)
    throw new Error('Failed to process PDF file')
  }
}

export const fillPDFWithData = async (file, profileData) => {
  try {
    const { PDFDocument, rgb, StandardFonts } = await import('pdf-lib')
    
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
    
    // If no form fields were filled, create a new PDF with data overlaid
    if (filledFields === 0) {
      console.log('No form fields found, creating new PDF with data overlay...')
      
      const pages = pdfDoc.getPages()
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
      
      // Try to overlay data on the first page
      if (pages.length > 0) {
        const page = pages[0]
        const { width, height } = page.getSize()
        
        // Define positions for common fields (you can adjust these)
        const fieldPositions = [
          { key: 'name', x: 150, y: height - 150 },
          { key: 'email', x: 150, y: height - 180 },
          { key: 'phone', x: 150, y: height - 210 },
          { key: 'address', x: 150, y: height - 240 },
          { key: 'age', x: 150, y: height - 270 },
          { key: 'education', x: 150, y: height - 300 },
          { key: 'experience', x: 150, y: height - 330 },
          { key: 'skills', x: 150, y: height - 360 },
          { key: 'goals', x: 150, y: height - 390 },
          { key: 'interests', x: 150, y: height - 420 }
        ]
        
        fieldPositions.forEach(({ key, x, y }) => {
          const value = fieldMapping[key]
          if (value && y > 50) { // Make sure we don't go off the page
            page.drawText(value, {
              x,
              y,
              size: 12,
              font,
              color: rgb(0, 0, 0)
            })
            filledFields++
            console.log(`Overlaid "${key}" with "${value}" at position (${x}, ${y})`)
          }
        })
      }
    }
    
    console.log(`Successfully filled ${filledFields} fields`)
    return { pdfDoc, filledFields }
    
  } catch (error) {
    console.error('Error filling PDF:', error)
    throw new Error('Failed to fill PDF form')
  }
} 