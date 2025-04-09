import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import ChickenCanvas from "./components/ChickenCanvas";

function App() {
  return (
    <div className="container">
      <h1>Chicken</h1>
      <ChickenCanvas />
      <input className="input-box" placeholder="Type here..." />
    </div>
  );
}

export default App;
