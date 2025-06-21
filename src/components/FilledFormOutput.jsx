import React from 'react'

const FilledFormOutput = ({ filledForm, isLoading }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(filledForm)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="glass-card rounded-3xl p-8 hover-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-xl">✨</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Filled Form</h3>
            <p className="text-gray-600 text-sm">AI-generated content ready to use</p>
          </div>
        </div>
        
        {filledForm && (
          <button onClick={handleCopy} className="modern-button bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 text-sm font-medium inverted-hover">
            📋 Copy
          </button>
        )}
      </div>

      <div className="relative">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded shimmer" style={{ width: `${80 - i * 2}%` }}></div>
            ))}
          </div>
        ) : filledForm ? (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✅</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Successfully Generated</p>
                  <p className="text-xs text-gray-600">AI has filled all placeholders with your profile data</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-purple-100">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-medium leading-relaxed">
                  {filledForm}
                </pre>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">💡</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Ready to Use</p>
                  <p className="text-sm text-gray-600">Copy the filled form and paste it wherever you need. All placeholders have been intelligently replaced with your profile information.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-2xl">✨</span>
            </div>
            <p className="text-gray-500 text-lg mb-2">No filled form yet</p>
            <p className="text-gray-400 text-sm">Fill in your profile and paste a form to generate the filled version</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FilledFormOutput 