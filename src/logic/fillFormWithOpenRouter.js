import OpenAI from 'openai'

// Initialize OpenRouter client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  dangerouslyAllowBrowser: true // This is safe for client-side usage with OpenRouter
})

export const fillFormWithOpenRouter = async (profile, formText) => {
  try {
    // Get the model from environment or use default
    const model = import.meta.env.VITE_AI_MODEL || 'gpt-3.5-turbo'
    
    // Create a comprehensive prompt for form filling
    const prompt = `You are an intelligent form filler. Your task is to fill out a form using the provided user profile information.

USER PROFILE:
- Name: ${profile.name}
- Age: ${profile.age}
- Email: ${profile.email}
- Phone: ${profile.phone}
- Address: ${profile.address}
- Education: ${profile.education}
- Experience: ${profile.experience}
- Skills: ${profile.skills}
- Goals: ${profile.goals}
- Interests: ${profile.interests}

FORM TO FILL:
${formText}

INSTRUCTIONS:
1. Replace all placeholders (like ___, [field], or similar) with appropriate information from the user profile
2. Use the most relevant information for each field
3. Maintain the original formatting and structure of the form
4. If a field doesn't have a clear match in the profile, use the most appropriate information or leave it blank if necessary
5. Make the filled form sound natural and professional
6. Do not add any explanations or markdown formatting - just return the filled form text

Please fill the form and return only the completed form text:`

    // Make the API call to OpenRouter
    const completion = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that fills forms intelligently using provided user profile data. Always respond with just the filled form text, no explanations.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.3, // Lower temperature for more consistent results
    })

    // Extract the response
    const filledForm = completion.choices[0]?.message?.content

    if (!filledForm) {
      throw new Error('No response received from AI')
    }

    return filledForm.trim()

  } catch (error) {
    console.error('Error calling OpenRouter API:', error)
    
    // Provide helpful error messages
    if (error.message?.includes('401')) {
      throw new Error('Invalid API key. Please check your OpenRouter API key in the .env file.')
    } else if (error.message?.includes('429')) {
      throw new Error('Rate limit exceeded. Please try again in a moment.')
    } else if (error.message?.includes('network')) {
      throw new Error('Network error. Please check your internet connection.')
    } else {
      throw new Error(`AI service error: ${error.message}`)
    }
  }
}

// Helper function to test the API connection
export const testOpenRouterConnection = async () => {
  try {
    const model = import.meta.env.VITE_AI_MODEL || 'gpt-3.5-turbo'
    
    const completion = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: 'user',
          content: 'Hello! Please respond with "Connection successful" if you can see this message.'
        }
      ],
      max_tokens: 50,
    })

    return completion.choices[0]?.message?.content?.includes('Connection successful')
  } catch (error) {
    console.error('Connection test failed:', error)
    return false
  }
}

// Get available models (for future use)
export const getAvailableModels = () => {
  return [
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: 'Fast and efficient' },
    { id: 'gpt-4', name: 'GPT-4', description: 'Most capable model' },
    { id: 'claude-3-haiku', name: 'Claude 3 Haiku', description: 'Fast and accurate' },
    { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', description: 'Balanced performance' },
    { id: 'claude-3-opus', name: 'Claude 3 Opus', description: 'Most advanced' },
    { id: 'llama-3.1-8b-instruct', name: 'Llama 3.1 8B', description: 'Open source model' },
  ]
} 