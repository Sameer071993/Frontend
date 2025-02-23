import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../component/Keyword.css";
import words from "../component/level!";

const Keyword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const level2 = location.state?.level2 || false;
  const levelWords = level2 ? words.slice(10, 25) : words.slice(0, 10);
  const [targetWord, setTargetWord] = useState(levelWords[0]);
  const [userInput, setUserInput] = useState("");
  const [timer, setTimer] = useState(7);
  const [fallingWordKey, setFallingWordKey] = useState(0);
  const [score, setScore] = useState(0);
  const [isMatched, setIsMatched] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getNextWord = () => {
    if (currentIndex + 1 >= levelWords.length) {
      setTimeout(() => {
        navigate("/gameover", { state: { score, level2 } });
      }, 0);
      return;
    }

    setCurrentIndex((prevIndex) => prevIndex + 1);
    setTargetWord(levelWords[currentIndex + 1]);
    setUserInput("");
    setTimer(7);
    setFallingWordKey((prevKey) => prevKey + 1);
  };

  const handleInputChange = (event) => {
    const input = event.target.value;
    setUserInput(input);

    if (input === targetWord) {
      setIsMatched(true);
      setScore((prevScore) => prevScore + 1);
      setTimeout(() => getNextWord(), 1000);
    }
  };

  const handleVirtualKey = (key) => {
    let newInput = userInput;

    if (key === "BACKSPACE") {
      newInput = newInput.slice(0, -1);
    } else if (key === "SPACE") {
      newInput += " ";
    } else {
      newInput += key;
    }

    setUserInput(newInput);

    if (newInput === targetWord) {
      setIsMatched(true);
      setScore((prevScore) => prevScore + 1);
      setTimeout(() => getNextWord(), 1000);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          getNextWord();
          return 7;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderHighlightedWord = () => {
    const wordLength = targetWord.length;
    const size = Math.max(100, wordLength * 15);

    if (targetWord.startsWith(userInput)) {
      const matchedPart = targetWord.slice(0, userInput.length);
      const remainingPart = targetWord.slice(userInput.length);

      return (
        <div
          style={{
            height: `${size}px`,
            width: `${size}px`,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: `${Math.min(size / 3, 24)}px`,
            fontWeight: "bold",
          }}
        >
          <span style={{ color: "#013220" }}>{matchedPart}</span>
          <span style={{ color: "white" }}>{remainingPart}</span>
        </div>
      );
    }

    return (
      <div
        style={{
          height: `${size}px`,
          width: `${size}px`,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: `${Math.min(size / 3, 24)}px`,
          fontWeight: "bold",
        }}
      >
        {targetWord}
      </div>
    );
  };

  const qwertyKeys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
    ["SPACE", "BACKSPACE"]
  ];

  return (
    <div style={{ color: "#fff", backgroundColor: "#282c34", padding: "5px", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "10px", fontSize: "32px" }}>
        {level2 ? "Level 2: Typing Challenge" : "Level 1: Typing Challenge"}
      </h1>
      <div className="falling-container" key={fallingWordKey} style={{ marginBottom: "10px" }}>
        <span className="bouncer" style={{ fontSize: "40px", fontWeight: "bold" }}>
          {renderHighlightedWord()}
        </span>
      </div>
      <div className="akign">
        <div
          className={`score ${isMatched ? "animate" : ""}`}
          onAnimationEnd={() => setIsMatched(false)}
        >
          Score: {score}
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <input
          type="text"
          value={userInput}
          autoFocus
          onChange={handleInputChange}
          onPaste={(e) => {
            e.preventDefault();
            alert("Pasting is disabled for this input field.");
          }}
          style={{
            fontSize: "18px",
            padding: "10px",
            borderRadius: "5px",
            border: "2px solid #ccc",
            outline: "none",
            width: "80%",
            maxWidth: "400px",
            textAlign: "center",
          }}
        />
      </div>

      {/* QWERTY Virtual Keypad */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {qwertyKeys.map((row, rowIndex) => (
          <div key={rowIndex} style={{ marginBottom: "5px" }}>
            {row.map((key) => (
              <button
                key={key}
                onClick={() => handleVirtualKey(key === "SPACE" ? " " : key)}
                style={{
                  padding: "15px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  backgroundColor: "#61dafb",
                  border: "none",
                  cursor: "pointer",
                  margin: "2px",
                }}
              >
                {key === "SPACE" ? "␣" : key === "BACKSPACE" ? "⌫" : key}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keyword;
