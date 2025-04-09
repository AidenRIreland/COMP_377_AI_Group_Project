import { useState } from "react";
import "../App.css";

export default function ChickenInput() {
  const [input, setInput] = useState("");
  const [predicted, setPredicted] = useState(null);

  const handleChange = (e) => {
    const val = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(val)) {
      setInput(val);
    }
  };

  const handlePredict = async () => {
    if (!input) return;

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", { //Change the link depending on where the python back end is running on
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ current_price: [parseFloat(input)] }),
      });

      const data = await response.json();
      if (data.predicted_price !== undefined) {
        setPredicted(`$${data.predicted_price.toFixed(2)} is the predicted price`);
      } else {
        setPredicted("Error: No prediction received");
      }
    } catch (err) {
      setPredicted("Error: Could not connect to the server");
    }
  };

  return (
    <div className="input-container">
      <input
        className="input-box"
        placeholder="Enter current price of eggs"
        value={input}
        onChange={handleChange}
      />
      <button onClick={handlePredict}>Predict</button>
      <div className="output-box">
        {predicted && <p>{predicted}</p>}
      </div>
    </div>
  );
}
