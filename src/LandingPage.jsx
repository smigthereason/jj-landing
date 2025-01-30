import { useState, useEffect } from "react";
import "./LandingPage.css";
import Button from "./components/Button";
import Offer from "./components/Offer";


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


      <header className="bg-[#2D0A31] px-2 md:px-6 py-3  flex justify-between items-center gap-2">
      {/* Logo Section */}
      <div className="flex flex-col leading-none">
      <h1 className="gradient-text rotate-text text-lg  md:text-4xl font-bold tracking-wide origin-bottom-left">Jumping</h1>
      <h2 className="gradient-text rotate-text text-lg md:text-4xl font-extrabold tracking-wider origin-bottom-left">JACK</h2>
      </div>

      {/* Promo Text */}
      <div className="text-white text-sm md:text-2xl font-bold ml-1">🔥Jump High, Earn $100</div>

      {/* Timer */}
      <div className="flex items-baseline timer">
        <span className="text-[#FFE135] text-xs md:text-4xl  font-bold md:tracking-wider">
        {formatTime(timeLeft)}
        </span>
        <span className="text-[#FFE135] text-xs ml-1 font-medium">SEC</span>
      </div>
    </header>



      <div className="main-content">
        <img
          className="title-image"
          src="./Images/title-fotor.webp"
          alt="Game Title"
        />
        <div>
          <img
            className="jack-image"
            src="./Images/jack3-fotor.webp"
            alt="Jumping Jack Character"
          />
        </div>

<div className="video-frame">
  <div
    className="max-w-4xl mx-auto"
  >
    <div className="border-8 border-[#B8860B] rounded-lg overflow-hidden">
      <img
        className="w-full h-auto object-cover"
        src="/Images/jumping-jack-video.webp"
        alt="Jumping Jack Animation"
      />
    </div>
  </div>
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