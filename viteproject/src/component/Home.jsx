import React from "react";
import { useNavigate } from "react-router-dom";
import "./../assets/Styles/Home.css"; // For custom styling

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-overlay"></div> {/* Add the overlay */}
      <header className="home-header">
        <h1 className="home-title">Welcome to Typing Challenge</h1>
        <p className="home-subtitle">Test your typing skills and challenge yourself!</p>
      </header>
      <div className="home-content">
        <button
          className="start-button"
          onClick={() => navigate("/level1")}
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default Home;
