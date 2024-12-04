import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./../assets/Styles/Gameover.css"; // Import CSS for styling

const Gameover = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, level2 } = location.state || { score: 0, level2: false };

  return (
    <div className="gameover-container">
      <div className="gameover-card">
        <h1 className="gameover-title">Game Over</h1>
        <p className="gameover-score">Your Score: <span>{score}</span></p>
        <div className="gameover-buttons">
          {score > 5 && !level2 ? (
            <button
              className="gameover-button gameover-button-next"
              onClick={() => navigate("/level1", { state: { level2: true } })}
            >
              Go to Level 2
            </button>
          ) : (
            <button
              className="gameover-button gameover-button-restart"
              onClick={() => navigate("/level1")}
            >
              Restart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gameover;
