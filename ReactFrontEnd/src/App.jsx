import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import Header from './components/Header';
import ChickenCanvas from "./components/ChickenCanvas";
import Footer from './components/Footer';

function App() {
  return (
    <div className="container">
      <Header/>
      <ChickenCanvas />
      <input className="input-box" placeholder="Type here..." />
      <Footer/>
    </div>
  );
}

export default App;
