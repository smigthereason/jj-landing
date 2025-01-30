import "../styles/Button.css";
// import { handleClick } from "./eventHandlers.jsx";

const Button = () => {
  const url = "https://store.steampowered.com/app/3205090/Jumping_Jack/";
  
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <button className="steam-button">
        <img 
          className="board-image w-48 md:w-64 h-auto"
          src="/Images/board-fotor.webp"
          alt="Steam Board"
        />
      </button>
    </a>
  );
};

export default Button;