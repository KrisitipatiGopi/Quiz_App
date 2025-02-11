import React from 'react';
import "./Score.css";

const Score = ({ score, length, setShowScoreCard }) => {
  // ✅ Dynamic score message
  const getScoreMessage = () => {
    const percentage = (score / length) * 100;
    if (percentage === 100) return "🎉 Perfect Score! Amazing job!";
    if (percentage >= 75) return "🔥 Great Work! Keep it up!";
    if (percentage >= 50) return "😊 Good Effort! Try for a higher score!";
    return "😕 Keep Practicing! You can do better!";
  };

  return (
    <div className="scoreContainer">
      <p className="scoreText">
        Your Score: <strong>{score} / {length}</strong>
      </p>
      <p className="scoreMessage">{getScoreMessage()}</p>
      <button className="backButton" onClick={setShowScoreCard}>Try Again</button>
    </div>
  );
};

export default Score;
