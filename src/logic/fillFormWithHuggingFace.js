// Lightweight Hugging Face API integration
const HF_API_URL = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium'

export const fillFormWithHuggingFace = async (profile, formText) => {
  try {
    const prompt = `Fill this form using the profile data:
Profile: ${profile.name}, ${profile.age}, ${profile.email}, ${profile.experience}, ${profile.skills}
Form: ${formText}
Replace ___ with profile data:`

    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_HF_TOKEN || 'hf_demo'}`
      },
      body: JSON.stringify({ inputs: prompt, max_length: 500 })
    })

    if (!response.ok) {
      // Fallback: simple text replacement
      return formText
        .replace(/___/g, profile.name || 'N/A')
        .replace(/\[name\]/gi, profile.name || 'N/A')
        .replace(/\[email\]/gi, profile.email || 'N/A')
        .replace(/\[experience\]/gi, profile.experience || 'N/A')
        .replace(/\[skills\]/gi, profile.skills || 'N/A')
    }

    const data = await response.json()
    return data[0]?.generated_text || formText
  } catch (error) {
    // Fallback to simple replacement
    return formText
      .replace(/___/g, profile.name || 'N/A')
      .replace(/\[name\]/gi, profile.name || 'N/A')
      .replace(/\[email\]/gi, profile.email || 'N/A')
      .replace(/\[experience\]/gi, profile.experience || 'N/A')
      .replace(/\[skills\]/gi, profile.skills || 'N/A')
  }
} 