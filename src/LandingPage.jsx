import React, { useState, useEffect } from "react";
import "./LandingPage.css";
import Button from "./Button";
import Offer from "./Offer";
import { handleClick } from "./eventHandlers";

const LandingPage = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const targetTime = new Date().getTime() + 24 * 60 * 60 * 1000;
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetTime - now;
      if (difference <= 0) {
        clearInterval(timer);
      } else {
        setTimeLeft(difference);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (milliseconds) => {
    const hours = String(
      Math.floor((milliseconds / (1000 * 60 * 60)) % 24)
    ).padStart(2, "0");
    const minutes = String(
      Math.floor((milliseconds / (1000 * 60)) % 60)
    ).padStart(2, "0");
    const seconds = String(Math.floor((milliseconds / 1000) % 60)).padStart(
      2,
      "0"
    );
    return `${hours} : ${minutes} : ${seconds}`;
  };

  return (
    <div className="landing-container" id="1">
      <header className="header">
        <div className="logo">
          <h1>Jumping</h1>
          <h2>JACK</h2>
        </div>
        <div className="promo">🔥Jump High, Earn $100</div>
        <div className="timer">{formatTime(timeLeft)} SEC</div>
      </header>
      <div className="main-content">
        <img
          className="title-image"
          src="./Images/title-fotor.png"
          alt="Game Title"
        />
        <div>
          <img
            className="jack-image"
            src="./Images/jack3-fotor.png"
            alt="Jumping Jack Character"
          />
        </div>
        <div className="video-frame">
          <img
            className="frame-image"
            src="./Images/frame-fotor.png"
            alt="Video Frame"
          />
          <img
            className="place-image"
            src="./Images/placeholder.jpeg"
            alt="Game Preview"
          />
          <button className="play-button" onClick={handleClick}>
            <img
              className="b-image"
              src="./Images/ytbutton.png"
              alt="Play Video"
            />
          </button>

          <video
            className="hover-video"
            src="/Images/jumpingjacklanding.mp4"
            muted
            loop
            playsInline
            autoPlay
            aria-label="Game Trailer"
          />
        </div>
        <div className="cta-section">
          <Button />
        </div>
      </div>
      <Offer />
    </div>
  );
};

export default LandingPage;