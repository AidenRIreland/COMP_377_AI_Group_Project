// flaskPrediction.js
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const flaskBaseUrl = process.env.FLASK_API_URL || 'http://localhost:5000';

export const getPredictedPriceFromFlask = async (currentPrice) => {
  try {
    const response = await axios.post(`${flaskBaseUrl}/predict`, {
      current_price: [currentPrice]
    });

    console.log("Flask raw response:", response.data);

    // Make sure response contains the key
    if (!response.data || response.data.predicted_price === undefined) {
      throw new Error("Invalid response from Flask API");
    }

    return response.data.predicted_price;
  } catch (error) {
    console.error("Error fetching from Flask:", error.message);
    throw new Error("Failed to get prediction from Flask API.");
  }
};



