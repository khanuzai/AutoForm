import { useState } from 'react'
import ProfileForm from './components/ProfileForm'
import FormUploader from './components/FormUploader'
import FilledFormOutput from './components/FilledFormOutput'
import { fillFormWithGemini } from './logic/fillFormWithGemini'
import './App.css'

function App() {
  const [profile, setProfile] = useState({
    name: '',
    age: '',
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
            <FormUploader formText={formText} setFormText={setFormText} />
            
            {/* Generate Button */}
            <div className="bg-white rounded-lg p-6 shadow-md">
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
              
              {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Output */}
          <div className="lg:col-span-1">
            <FilledFormOutput filledForm={filledForm} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App 