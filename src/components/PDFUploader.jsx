import { useState, useRef } from 'react'
import { saveAs } from 'file-saver'
import { fillPdfForm } from '../logic/pdfFieldDetector'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

const PDFUploader = ({ profile }) => {
  const [file, setFile] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isFilling, setIsFilling] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (!selectedFile) {
      setFile(null)
      setError('')
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }
    if (selectedFile.type !== 'application/pdf') {
      setError('Please upload a PDF file.')
      setFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }
    setFile(selectedFile)
    setError('')
  }

  const handleFillAndDownload = async () => {
    if (!file) {
      setError('Please upload a PDF file first.')
      return
    }
    if (!profile || Object.values(profile).every(v => v === '')) {
      setError('Please fill out at least one field in your profile first.')
      return
    }

    setIsFilling(true)
    setError('')

    try {
      await fillPdfForm(file, profile)
    } catch (err) {
      console.error('Error during PDF filling process:', err)
      setError(err.message || 'An unexpected error occurred during filling.')
    } finally {
      setIsFilling(false)
    }
  }

  const clearFile = () => {
    setFile(null)
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const generateTestPDF = async () => {
    setIsGenerating(true)
    setError('')
    try {
      const pdfDoc = await PDFDocument.create()
      const page = pdfDoc.addPage([600, 800])
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

      // Title
      page.drawText('Sample Application Form', {
        x: 50,
        y: 750,
        size: 24,
        font: boldFont,
        color: rgb(0, 0, 0),
      })

      // Form fields with labels
      const fields = [
        { label: 'Full Name:', y: 650 },
        { label: 'Email Address:', y: 600 },
        { label: 'Phone Number:', y: 550 },
        { label: 'Address:', y: 500 },
        { label: 'Company:', y: 450 },
        { label: 'Position:', y: 400 },
        { label: 'Experience:', y: 350 },
        { label: 'Education:', y: 300 },
        { label: 'Skills:', y: 250 },
        { label: 'Goals:', y: 200 },
      ]

      fields.forEach(({ label, y }) => {
        page.drawText(label, {
          x: 50,
          y: y,
          size: 12,
          font: font,
          color: rgb(0, 0, 0),
        })
        
        page.drawLine({
          start: { x: 200, y: y - 5 },
          end: { x: 500, y: y - 5 },
          thickness: 1,
          color: rgb(0.8, 0.8, 0.8),
        })
      })

      page.drawText('Instructions: Fill out your profile, then upload this form back to test the auto-fill feature!', {
        x: 50,
        y: 100,
        size: 10,
        font: font,
        color: rgb(0.5, 0.5, 0.5),
      })

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, 'sample_application_form.pdf')
      
    } catch (err) {
      console.error('Error generating test PDF:', err)
      setError('Error generating test PDF: ' + err.message)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Test PDF Generator */}
      <div className="glass-card rounded-3xl p-6 hover-card">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-lg">🧪</span>
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900">Test the Feature</h4>
            <p className="text-gray-600 text-sm">Generate a sample PDF to test the auto-fill.</p>
          </div>
        </div>
        
        <button 
          onClick={generateTestPDF} 
          disabled={isGenerating || isFilling} 
          className="w-full modern-button bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 font-semibold disabled:opacity-50 disabled:cursor-not-allowed inverted-hover"
        >
          {isGenerating ? (
            <div className="flex items-center justify-center space-x-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Generating...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-3">
              <span>📄</span>
              <span>Generate Test PDF</span>
            </div>
          )}
        </button>
      </div>

      {/* Main PDF Uploader */}
      <div className="glass-card rounded-3xl p-8 hover-card">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-xl">📤</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">PDF Auto-Filler</h3>
            <p className="text-gray-600 text-sm">Upload a PDF to fill it with your profile data.</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">1. Upload PDF Form</label>
            <input 
              ref={fileInputRef} 
              type="file" 
              accept=".pdf" 
              onChange={handleFileChange} 
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-50 file:to-indigo-50 file:text-blue-700 hover:file:from-blue-100 hover:file:to-indigo-100 transition-all duration-300" 
              disabled={isGenerating || isFilling}
            />
          </div>

          {file && (
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">📎</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-green-800">{file.name}</p>
                    <p className="text-xs text-green-600">Size: {(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <button onClick={clearFile} disabled={isGenerating || isFilling} className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50">✕</button>
              </div>
            </div>
          )}

          <div>
             <label className="block text-sm font-semibold text-gray-700 mb-3">2. Fill & Download</label>
            <button 
              onClick={handleFillAndDownload} 
              disabled={isFilling || isGenerating || !file} 
              className="w-full modern-button bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 font-semibold disabled:opacity-50 disabled:cursor-not-allowed inverted-hover"
            >
              {isFilling ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing PDF...</span>
                </div>
              ) : (
                'Fill & Download PDF'
              )}
            </button>
          </div>
           {error && <p className="text-red-500 text-sm mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default PDFUploader 