// checkGeminiModels.js
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const listModels = async () => {
  try {
    const response = await axios.get(
      'https://generativelanguage.googleapis.com/v1beta1/models',
      {
        params: {
          key: process.env.GEMINI_API_KEY
        }
      }
    )

    console.log("✅ Available Models:\n")
    response.data.models.forEach((model, index) => {
      console.log(`${index + 1}. ${model.name}`)
      if (model.supportedGenerationMethods) {
        console.log(`   → Supported methods: ${model.supportedGenerationMethods.join(', ')}`)
        console.log(`   → Endpoint: https://generativelanguage.googleapis.com/v1beta1/${model.name}:${model.supportedGenerationMethods[0]}\n`)
      }
    })
  } catch (err) {
    console.error("❌ Error listing models:", err.response?.data || err.message)
  }
}

listModels()
