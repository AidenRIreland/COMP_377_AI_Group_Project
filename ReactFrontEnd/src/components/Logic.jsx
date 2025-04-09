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
    const response = await fetch("http://localhost:5002/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `$${input}`,
      }),
    });

    const result = await response.json();
    if (result.reply) {
      setPredicted(result.reply);
    } else {
      setPredicted("Error: No reply received from server");
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