import { useState, useRef } from 'react'
import { saveAs } from 'file-saver'
import { detectPDFFields, fillPDFWithData, createSamplePDF } from '../logic/pdfFieldDetector'

const PDFUploader = ({ profile, onFilledPDF }) => {
  const [pdfFile, setPdfFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [detectedFields, setDetectedFields] = useState([])
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file')
      return
    }

    setPdfFile(file)
    setError('')
    setDetectedFields([])
    
    // Process the PDF to detect fields
    await processPDFFields(file)
  }

  const processPDFFields = async (file) => {
    setIsProcessing(true)
    try {
      const fields = await detectPDFFields(file)
      setDetectedFields(fields)
      
      if (fields.length === 0) {
        setError('No form fields detected. Make sure your PDF contains text fields or labels.')
      }
    } catch (err) {
      setError('Error processing PDF: ' + err.message)
    } finally {
      setIsProcessing(false)
    }
  }

  const fillPDF = async () => {
    if (!pdfFile || detectedFields.length === 0) {
      setError('Please upload a PDF and ensure fields are detected')
      return
    }

    setIsProcessing(true)
    setError('')

    try {
      const { pdfDoc, filledFields } = await fillPDFWithData(pdfFile, profile)
      
      // Save the filled PDF
      const filledPdfBytes = await pdfDoc.save()
      const blob = new Blob([filledPdfBytes], { type: 'application/pdf' })
      
      // Generate filename
      const originalName = pdfFile.name.replace('.pdf', '')
      const filledName = `${originalName}_filled.pdf`
      
      // Save the file
      saveAs(blob, filledName)
      
      // Notify parent component
      if (onFilledPDF) {
        onFilledPDF(blob, filledName)
      }
      
      // Show success message
      setError('')
      
    } catch (err) {
      setError('Error filling PDF: ' + err.message)
    } finally {
      setIsProcessing(false)
    }
  }

  const generateSamplePDF = async () => {
    setIsProcessing(true)
    setError('')
    
    try {
      const pdfBytes = await createSamplePDF()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, 'sample_application_form.pdf')
      
      setError('')
    } catch (err) {
      setError('Error generating sample PDF: ' + err.message)
    } finally {
      setIsProcessing(false)
    }
  }

  const clearFile = () => {
    setPdfFile(null)
    setDetectedFields([])
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        📄 PDF Form Filler
      </h3>
      
      {/* Sample PDF Button */}
      <div className="mb-4">
        <button
          onClick={generateSamplePDF}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm"
        >
          📋 Generate Sample PDF Form
        </button>
      </div>
      
      {/* File Upload */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload PDF Form
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {/* File Info */}
      {pdfFile && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">
                📎 {pdfFile.name}
              </p>
              <p className="text-xs text-green-600">
                Size: {(pdfFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <button
              onClick={clearFile}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Detected Fields */}
      {detectedFields.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Detected Fields ({detectedFields.length})
          </h4>
          <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
            {detectedFields.map((field, index) => (
              <div key={index} className="text-xs bg-gray-100 p-2 rounded">
                <div className="font-medium">{field.field}</div>
                <div className="text-gray-500">Page {field.page}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fill PDF Button */}
      {pdfFile && detectedFields.length > 0 && (
        <button
          onClick={fillPDF}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing PDF...
            </>
          ) : (
            '🖊️ Fill PDF Form'
          )}
        </button>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-4 text-xs text-gray-600">
        <p className="mb-2"><strong>How it works:</strong></p>
        <ul className="list-disc list-inside space-y-1">
          <li>Generate a sample PDF form to test the feature</li>
          <li>Upload a PDF form with text fields or labels</li>
          <li>AI detects form fields automatically</li>
          <li>Uses your profile data to fill the form</li>
          <li>Downloads the filled PDF</li>
        </ul>
        <p className="mt-2 text-xs text-gray-500">
          <strong>Supported:</strong> PDF forms with text fields, labels like "Name:", "Email:", etc.
        </p>
      </div>
    </div>
  )
}

export default PDFUploader 