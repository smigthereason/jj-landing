import React from "react";
import "../styles/Button.css";
import { handleClick } from "./eventHandlers.jsx";

const Button = () => {
  const url = "https://store.steampowered.com/app/3205090/Jumping_Jack/";
  
  return (
    <button 
      className="steam-button" 
      onClick={(e) => handleClick(e, url)}
    >
      <img 
        className="board-image" 
        src="/Images/board-fotor.png" 
        alt="Steam Board"
      />
      <h4 className="b-text1">AVAILABLE FOR FREE!!!</h4>
      <h2 className="b-text2">Play now on STEAM®</h2>
    </button>
  );
};

export default Button;