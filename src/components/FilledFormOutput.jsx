import React, { useState } from 'react'

const FilledFormOutput = ({ filledForm, isLoading }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(filledForm)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md h-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          ✨ AI-Filled Form
        </h2>
        
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">AI is filling your form...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
          </div>
        </div>
      </div>
    )
  }

  if (!filledForm) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md h-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          ✨ AI-Filled Form
        </h2>
        
        <div className="flex items-center justify-center h-64">
          <div className="text-center text-gray-500">
            <div className="text-6xl mb-4">📄</div>
            <p className="text-lg font-medium mb-2">Ready to generate!</p>
            <p className="text-sm">Fill in your profile and paste a form, then click "Generate Filled Form"</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          ✨ AI-Filled Form
        </h2>
        
        <button
          onClick={handleCopy}
          className="flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
        >
          {copied ? (
            <>
              <span className="mr-2">✓</span>
              Copied!
            </>
          ) : (
            <>
              <span className="mr-2">📋</span>
              Copy
            </>
          )}
        </button>
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
        <div className="whitespace-pre-wrap font-mono text-sm text-gray-800 leading-relaxed">
          {filledForm}
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
        <h3 className="text-sm font-medium text-green-800 mb-2">✅ Success!</h3>
        <p className="text-sm text-green-700">
          Your form has been intelligently filled using your profile data. You can copy the result above and use it directly!
        </p>
      </div>
    </div>
  )
}

export default FilledFormOutput 