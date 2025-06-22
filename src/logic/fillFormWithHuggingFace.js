// Lightweight Hugging Face API integration
const HF_API_URL = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2'

export const fillFormWithHuggingFace = async (profile, prompt, isJsonMode = false) => {
  const payload = {
    inputs: prompt,
    parameters: {
      max_new_tokens: 1024,
      return_full_text: false,
    },
  };

  const response = await fetch(HF_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_HUGGING_FACE_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Hugging Face API Error:", errorBody);
    throw new Error(`The AI service failed. Status: ${response.status}. Please check your API key and ensure the model is available.`);
  }

  const data = await response.json();
  const generatedText = data[0]?.generated_text;

  if (!generatedText) {
    throw new Error("The AI service returned an empty response.");
  }

  if (isJsonMode) {
    // Find the first occurrence of '{' and the last '}' to extract the JSON object
    const startIndex = generatedText.indexOf('{');
    const endIndex = generatedText.lastIndexOf('}');
    if (startIndex !== -1 && endIndex !== -1) {
      const jsonString = generatedText.substring(startIndex, endIndex + 1);
      try {
        // Attempt to parse the extracted string as JSON
        JSON.parse(jsonString);
        return jsonString; // Return the valid JSON string
      } catch (error) {
         console.error("Failed to parse extracted JSON:", error);
         throw new Error("The AI returned a malformed JSON object.");
      }
    }
    throw new Error("The AI did not return a valid JSON object in its response.");
  }

  return generatedText;
}; 