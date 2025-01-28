import React from "react";
import "./Button.css";

const Button = () => {
  const handleClick = () => {
    window.location.href = "https://store.steampowered.com/app/3205090/Jumping_Jack/";
  };

  return (
    <button className="steam-button" onClick={handleClick}>
      <img className="board-image" src="./board-fotor.png" alt="board" />
      <h4 className="b-text1">AVAILABLE FOR FREE!!!</h4>
      <h2 className="b-text2">Play now on STEAM®</h2>
    </button>
  );
};

export default Button;
