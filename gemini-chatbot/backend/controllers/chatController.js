import { getPredictedPriceFromFlask } from '../services/flaskPrediction.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const handleChat = async (req, res) => {
  const { message } = req.body;
  console.log("Incoming price input from user:", message);

  try {
    // Extract the price from the message (e.g., "The predicted egg price is $1.50")
    const priceMatch = message.match(/\$(\d*\.?\d+)/);
    if (!priceMatch) {
      return res.json({
        reply: "Please include a price in the format $X.XX (e.g., $1.50)."
      });
    }
    const currentPrice = parseFloat(priceMatch[1]);

    if (isNaN(currentPrice)) {
      return res.json({
        reply: "Please enter a valid number for the current egg price (e.g., 1.50)."
      });
    }

    console.log("Parsed current price:", currentPrice);

    const predictedPrice = await getPredictedPriceFromFlask(currentPrice);
    const roundedPrediction = predictedPrice.toFixed(2);
    console.log("Predicted price from Flask:", roundedPrediction);

    const prompt = `
Our model analyzed the current egg price of $${currentPrice.toFixed(2)} and predicts it will soon be $${roundedPrediction}. 

Write a friendly, natural explanation of this result in 2–3 sentences. Keep it short, informative, and clear. You must include the exact predicted price of $${roundedPrediction}.
`.trim();

    console.log("Prompt sent to Gemini:\n", prompt);

    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ]
    });

    const geminiReply =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      `Based on our model, the predicted price of eggs is $${roundedPrediction}.`;

    console.log("Gemini Final Reply:", geminiReply);

    return res.json({ reply: geminiReply });

  } catch (err) {
    console.error("Error during prediction or Gemini request:", err.message);
    res.status(500).json({ error: err.message });
  }
};