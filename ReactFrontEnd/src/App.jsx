import { useState } from 'react'
import { useEffect } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import Header from './components/Header';
import ChickenCanvas from "./components/ChickenCanvas";
import Logic from "./components/Logic"
import Footer from './components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';


function App() {
  useEffect(() => {
    AOS.init({
      duration: 2000, //duration
      once: true
    });
  }, []);
  return (
    <div className="greydiant">
      <div className="container">
        <Header/>
        <ChickenCanvas />
        <Logic/>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
