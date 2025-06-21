import React from 'react'

const FormUploader = ({ formText, setFormText }) => {
  const exampleForm = `Name: ___
Age: ___
Why are you applying for this position? ___
What is your relevant experience? ___
What are your career goals? ___
Tell us about your skills: ___
Why should we hire you? ___`

  const handleExampleClick = () => {
    setFormText(exampleForm)
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        📝 Form to Fill
      </h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Paste your form text here *
        </label>
        <textarea
          value={formText}
          onChange={(e) => setFormText(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
          rows="12"
          placeholder="Paste your form here... Use ___ or similar placeholders for fields to be filled."
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handleExampleClick}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
        >
          📋 Load Example Form
        </button>
        
        <div className="text-sm text-gray-600">
          {formText.length} characters
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <h3 className="text-sm font-medium text-blue-800 mb-2">💡 Tips:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Use underscores (___) or similar placeholders for fields to be filled</li>
          <li>• Include clear labels for each field</li>
          <li>• The AI will use your profile to intelligently fill each field</li>
          <li>• You can paste forms from job applications, surveys, or any text-based form</li>
        </ul>
      </div>
    </div>
  )
}

export default FormUploader 