import { useState } from "react";
import "../App.css";

export default function ChickenInput() {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    if (!isNaN(val)) setInput(val); // Only allow numbers
  };

  return (
    <div className="input-container">
      <input
        className="input-box"
        placeholder="Current price"
        value={input}
        onChange={handleChange}
      />
      <div className="output-box">output: {input}</div>
    </div>
  );
}