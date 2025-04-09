from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.losses import MeanSquaredError
import pandas as pd

# Initialize Flask app
app = Flask(__name__)
CORS(app) 
# Load the trained TensorFlow model
MODEL_PATH = "egg_price_model.h5"
model = tf.keras.models.load_model(MODEL_PATH, custom_objects={'mse': MeanSquaredError()})

# Load the historical data to fit the scaler
data_path = "egg-price-predictor/18100245.csv"
df = pd.read_csv(data_path)

# Filter rows with egg prices
egg_df = df[df['Products'].str.contains("egg", case=False, na=False)]
egg_df['REF_DATE'] = pd.to_datetime(egg_df['REF_DATE'], errors='coerce')
egg_df = egg_df.dropna(subset=['REF_DATE'])  # Remove rows with invalid dates

# Use only the 'VALUE' column (the egg price column) for scaling
prices = egg_df['VALUE'].values.reshape(-1, 1)

# Initialize and fit the scaler with the historical prices
scaler = MinMaxScaler()
scaler.fit(prices)  # Fit the scaler with the historical prices

# Define prediction function
def predict_price(current_price):
    # Normalize the current price using the same scaler used during training
    current_price = np.array([[current_price]])  # Convert current price to a 2D array
    scaled_price = scaler.transform(current_price)  # Use the fitted scaler for transformation
    
    # Reshape for model input (simple Dense model, not LSTM)
    scaled_price = scaled_price.reshape((1, 1))  # Reshape to (1, 1) for Dense model input
    
    # Predict the next price
    prediction = model.predict(scaled_price)
    
    # Inverse transform the prediction to get the actual price scale
    predicted_price = scaler.inverse_transform(prediction.reshape(-1, 1))

    # Return prediction as a float (ensure it's serializable by JSON)
    return float(predicted_price[0][0])

# Create an endpoint to predict the egg price
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the input data from the request
        data = request.get_json()  # Expecting {"current_price": [price]}
        current_price = data['current_price'][0]  # Extract the price
        
        # Predict the egg price
        predicted_price = predict_price(current_price)

        # Return the prediction as a JSON response
        return jsonify({'predicted_price': predicted_price})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
