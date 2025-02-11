import React, { useState } from "react";
import quizQuestions from "../../constants";
import "./Quiz_App.css";
import Score from "../Score/Score";

const Quiz_App = () => {
  const [curr_num, setCurr_Num] = useState(0);
  const [score, setScore] = useState(0);
  const [showScoreCard, setShowScoreCard] = useState(false);
  
  // ✅ ADDED: Track selected option to prevent multiple clicks
  const [selectedOption, setSelectedOption] = useState(null);

  const handleNext = () => {
    if (curr_num < quizQuestions.length - 1) {
      setCurr_Num((prev) => prev + 1);
      setSelectedOption(null); // ✅ ADDED: Reset selected option when moving to the next question
    }
  };

  const handleScore = (option) => {
    if (!selectedOption) { // ✅ PREVENT MULTIPLE CLICKS
      setSelectedOption(option);
      if (option === quizQuestions[curr_num].answer) {
        setScore((prev) => prev + 1);
      }
    }
  };

  const showResults = () => {
    setShowScoreCard(true);
  };

  return (
    <>
      {!showScoreCard ? (
        <div className="mainContainer">
          <div className="innerContainer">
            <p className="questionText">
              {curr_num + 1}) {quizQuestions[curr_num].question}
            </p>
            <div className="optionsContainer">
              {quizQuestions[curr_num].options.map((option, index) => (
                <p
                  key={index}
                  onClick={() => handleScore(option)}
                  className={`option ${selectedOption ? (
                    option === quizQuestions[curr_num].answer ? "correct" : 
                    selectedOption === option ? "incorrect" : ""
                  ) : ""}`} // ✅ ADDED: Dynamic class for correct/incorrect answers
                >
                  {option}
                </p>
              ))}
            </div>
          </div>
          <div className="buttonContainer">
            <button
              className="navButton"
              disabled={curr_num === 0}
              onClick={() => setCurr_Num((prev) => prev - 1)}
            >
              Prev
            </button>
            <button
              className="navButton"
              onClick={handleNext}
              disabled={curr_num === quizQuestions.length - 1}
            >
              Next
            </button>
            {curr_num === quizQuestions.length - 1 && (
              <button className="submitButton" onClick={showResults}>
                Submit
              </button>
            )}
          </div>
        </div>
      ) : (
        <Score 
          score={score} 
          length={quizQuestions.length} 
          setShowScoreCard={() => setShowScoreCard(false)} // ✅ FIXED: Passed as function reference
        />
      )}
    </>
  );
};

export default Quiz_App;
