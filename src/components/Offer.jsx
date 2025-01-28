// import { Link } from 'react-router-dom';
import '../styles/Offer.css';

const Offers = () => {
  return (
    <div className="offers-container">
      <div className="black-box" />
      <img
        className="background-image"
        src="/Images/top-bouncer.jpg"
        alt="hero1"
      />
      <div className="overlay" />

      <a href="/" className="offer-content">
        <h1 className="offer-heading">NEW RELEASES</h1>
        <span className="offer-discount">25% OFF</span>
        <div className="offer-details">
          <p className="offer-description">
            For a limited time only, enjoy 25% OFF on selected items in our exclusive collection. <br />There's something for everyone.
          </p>
        </div>
      </a>
    </div>
  );
};

export default Offers;
