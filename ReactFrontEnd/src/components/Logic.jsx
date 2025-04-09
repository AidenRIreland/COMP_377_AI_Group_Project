import { useState } from "react";
import "../App.css";

export default function ChickenInput() {
  const [input, setInput] = useState("");

    const handleChange = (e) => {
        const val = e.target.value;
        if (!isNaN(val)) setInput(val); //! Only allow numbers
        
        if (/^\d*\.?\d{0,2}$/.test(val)) { //? Only allow numbers and at most one decimal point
        setInput(val);
      }
    };

  return (
    <div className="input-container">
      <input
        className="input-box"
        placeholder="Enter current price of egg's"
        value={input}
        onChange={handleChange}
      />
      <div className="output-box">output: {input}</div>
    </div>
  );
}