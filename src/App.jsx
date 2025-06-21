import { useState } from 'react'
import ProfileForm from './components/ProfileForm'
import FormUploader from './components/FormUploader'
import FilledFormOutput from './components/FilledFormOutput'
import PDFUploader from './components/PDFUploader'
import { fillFormWithGemini } from './logic/fillFormWithGemini'
import './App.css'

function App() {
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    address: '',
    experience: '',
    goals: '',
    skills: '',
    education: '',
    interests: ''
  })
  
  const [formText, setFormText] = useState('')
  const [filledForm, setFilledForm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('text') // 'text' or 'pdf'
  const [filledPDF, setFilledPDF] = useState(null)

  const handleGenerateForm = async () => {
    if (!profile.name || !formText) {
      setError('Please fill in your profile and paste a form to continue.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const result = await fillFormWithGemini(profile, formText)
      setFilledForm(result)
    } catch (err) {
      setError('Error generating filled form: ' + err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilledPDF = (blob, filename) => {
    setFilledPDF({ blob, filename })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🤖 AutoForm
          </h1>
          <p className="text-lg text-gray-600">
            AI-Powered Form Filler using Google Gemini Pro
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input Forms */}
          <div className="space-y-6">
            <ProfileForm profile={profile} setProfile={setProfile} />
            
            {/* Tab Navigation */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex space-x-1 mb-4">
                <button
                  onClick={() => setActiveTab('text')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    activeTab === 'text'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  📝 Text Form
                </button>
                <button
                  onClick={() => setActiveTab('pdf')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    activeTab === 'pdf'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  📄 PDF Form
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'text' ? (
                <div>
                  <FormUploader formText={formText} setFormText={setFormText} />
                  
                  {/* Generate Button */}
                  <div className="mt-4">
                    <button
                      onClick={handleGenerateForm}
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Generating...
                        </>
                      ) : (
                        '🚀 Generate Filled Form'
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <PDFUploader profile={profile} onFilledPDF={handleFilledPDF} />
              )}
              
              {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Output */}
          <div className="lg:col-span-1">
            {activeTab === 'text' ? (
              <FilledFormOutput filledForm={filledForm} isLoading={isLoading} />
            ) : (
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  📄 PDF Output
                </h3>
                {filledPDF ? (
                  <div className="text-center">
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 font-medium">
                        ✅ PDF Successfully Generated!
                      </p>
                      <p className="text-green-600 text-sm">
                        {filledPDF.filename}
                      </p>
                    </div>
                    <p className="text-gray-600 text-sm">
                      The filled PDF has been downloaded to your device.
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <p>Upload a PDF form and fill it to see the result here.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App 