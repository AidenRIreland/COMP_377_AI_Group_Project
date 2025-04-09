import { useState } from 'react'
import eggLogo from '../assets/EGG LOGO.png';
const Header = () => {
  return (
    <header data-aos="fade-down">
      <h5>COMP 337 Group 6 W25</h5>
      <img
        src={eggLogo}
        alt="Canadian Egg Price Predictor"
        style={{
          width: "80%",
          maxWidth: "500px",
          height: "auto",
          marginTop: "1rem"
        }}
      />
      <br />
    </header>
  );
};

export default Header;