import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

export const fillFormWithGemini = async (profile, formText) => {
  try {
    // Check if API key is available
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      throw new Error('Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env file.')
    }

    // Create a formatted profile string
    const profileString = Object.entries(profile)
      .filter(([_, value]) => value.trim() !== '')
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n')

    // Create the prompt for Gemini
    const prompt = `You are an AI assistant that helps fill out forms intelligently based on user profile information.

User Profile:
${profileString}

Form to fill:
${formText}

Instructions:
1. Use the user's profile information to fill in the form fields marked with underscores (___) or similar placeholders
2. Be natural and conversational in your responses
3. Match the tone and style of the form
4. If a field asks for information not in the profile, make a reasonable inference based on the available data
5. Keep responses concise but informative
6. Return the complete filled form with all placeholders replaced

Please fill out the form using the profile information provided:`;

    // Get the Gemini Pro model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' })

    // Generate content
    const result = await model.generateContent(prompt)
    const response = await result.response
    const filledForm = response.text()

    // Clean up the response (remove any markdown formatting if present)
    return filledForm.trim()

  } catch (error) {
    console.error('Error calling Gemini API:', error)
    
    if (error.message.includes('API key')) {
      throw new Error('Gemini API key not configured. Please add your API key to the .env file.')
    } else if (error.message.includes('quota') || error.message.includes('rate limit')) {
      throw new Error('API rate limit exceeded. Please try again later.')
    } else {
      throw new Error('Failed to generate filled form. Please check your internet connection and try again.')
    }
  }
} 