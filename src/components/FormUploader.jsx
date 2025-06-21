import React from 'react'

const FormUploader = ({ formText, setFormText }) => {
  const handleLoadExample = () => {
    const exampleForm = `Dear Hiring Manager,

I am writing to express my interest in the Software Developer position at your company.

Name: ___
Email: ___
Phone: ___
Address: ___

Education: ___
Experience: ___
Skills: ___
Goals: ___

I believe my background in software development and passion for creating innovative solutions would make me a valuable addition to your team.

Thank you for considering my application.

Best regards,
[Your Name]`
    
    setFormText(exampleForm)
  }

  return (
    <div className="glass-card rounded-3xl p-8 hover-card">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-white text-xl">📝</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Form Text</h3>
          <p className="text-gray-600 text-sm">Paste your form with placeholders (like ___) to be filled</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-semibold text-gray-700">Form Content</label>
          <button onClick={handleLoadExample} className="modern-button bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-2 px-4 text-sm font-medium hover:from-gray-200 hover:to-gray-300 inverted-hover">
            📋 Load Example
          </button>
        </div>
        
        <textarea
          value={formText}
          onChange={(e) => setFormText(e.target.value)}
          className="w-full modern-input px-4 py-4 text-gray-900 placeholder-gray-500 focus:outline-none resize-none"
          rows="12"
          placeholder="Paste your form here with placeholders like ___ or [field] that you want the AI to fill automatically..."
        />
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs">✨</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 mb-1">Smart Placeholders</p>
            <p className="text-sm text-gray-600">Use <code className="bg-white px-1 py-0.5 rounded text-xs">___</code> or <code className="bg-white px-1 py-0.5 rounded text-xs">[field]</code> as placeholders. The AI will intelligently match them with your profile data.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormUploader 