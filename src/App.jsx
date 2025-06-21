import { useState, useEffect, useCallback } from 'react'
import ProfileForm from './components/ProfileForm'
import FormUploader from './components/FormUploader'
import FilledFormOutput from './components/FilledFormOutput'
import PDFUploader from './components/PDFUploader'
import { fillFormWithHuggingFace } from './logic/fillFormWithHuggingFace'
import './App.css'

function App() {
  const [profile, setProfile] = useState({
    name: '', age: '', email: '', phone: '', address: '',
    experience: '', goals: '', skills: '', education: '', interests: ''
  })
  const [formText, setFormText] = useState('')
  const [filledForm, setFilledForm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('text')
  const [filledPDF, setFilledPDF] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => setIsVisible(true), [])

  const handleGenerateForm = async () => {
    if (!profile.name || !formText) {
      setError('Please fill in your profile and paste a form to continue.')
      return
    }
    setIsLoading(true)
    setError('')
    try {
      const result = await fillFormWithHuggingFace(profile, formText)
      setFilledForm(result)
    } catch (err) {
      setError('Error generating filled form: ' + err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilledPDF = useCallback((blob, name) => {
    setFilledPDF({ blob, filename: name });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl mb-6 shadow-2xl float-animation">
            <span className="text-3xl">🤖</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Auto<span className="gradient-text">Form</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            AI-Powered Form Filler with Intelligent PDF Processing
          </p>
          <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Powered by Hugging Face</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>100% Free</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>PDF Support</span>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <ProfileForm profile={profile} setProfile={setProfile} />
            </div>
            
            {/* Tab Navigation */}
            <div className={`glass-card rounded-3xl p-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex space-x-2 mb-6 p-1 bg-gray-100/50 rounded-2xl">
                <button onClick={() => setActiveTab('text')} className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 relative ${activeTab === 'text' ? 'modern-tab active text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  <span className="relative z-10">📝 Text Form</span>
                </button>
                <button onClick={() => setActiveTab('pdf')} className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 relative ${activeTab === 'pdf' ? 'modern-tab active text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  <span className="relative z-10">📄 PDF Form</span>
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'text' ? (
                <div className="space-y-6">
                  <FormUploader formText={formText} setFormText={setFormText} />
                  <button onClick={handleGenerateForm} disabled={isLoading} className="w-full modern-button bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed inverted-hover">
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Generating...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-3">
                        <span>🚀</span>
                        <span>Generate Filled Form</span>
                      </div>
                    )}
                  </button>
                </div>
              ) : (
                <PDFUploader profile={profile} onFilledPDF={handleFilledPDF} />
              )}
              
              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm fade-in-up">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {activeTab === 'text' ? (
                <FilledFormOutput filledForm={filledForm} isLoading={isLoading} />
              ) : (
                <div className="glass-card rounded-3xl p-8 hover-card">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                      <span className="text-white text-lg">📄</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">PDF Output</h3>
                  </div>
                  
                  {filledPDF ? (
                    <div className="text-center success-pulse">
                      <div className="mb-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white text-2xl">✅</span>
                        </div>
                        <p className="text-green-800 font-semibold text-lg mb-2">PDF Successfully Generated!</p>
                        <p className="text-green-600 text-sm">{filledPDF.filename}</p>
                      </div>
                      <p className="text-gray-600">The filled PDF has been downloaded to your device.</p>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-gray-400 text-2xl">📄</span>
                      </div>
                      <p className="text-gray-500 text-lg">Upload a PDF form and fill it to see the result here.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-gray-500 text-sm">Built with ❤️ using React, Hugging Face, and modern web technologies</p>
        </div>
      </div>
    </div>
  )
}

export default App 