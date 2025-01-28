import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

function GamePage() {
  const { topicName } = useParams();

  // Define questions for each topic
  const questions = {
    Groups: [
      {
        question: "What is the identity element of addition in integers?",
        options: ["1", "0", "-1", "2"],
        correctAnswer: "0",
        difficulty: "easy",
        type: "multipleChoice",
      },
    ],
    Semigroups: [
      {
        question: "Which operation forms a semigroup in natural numbers?",
        options: ["Addition", "Subtraction", "Division", "Exponentiation"],
        correctAnswer: "Addition",
        difficulty: "easy",
        type: "multipleChoice",
      },
    ],
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState("playing");
  const [timer, setTimer] = useState(30);
  const [userAnswers, setUserAnswers] = useState([]);

  const currentQuestions = questions[topicName] || [];

  useEffect(() => {
    if (gameState === "playing" && timer > 0) {
      const id = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(id);
    }
    if (timer === 0) {
      handleNext();
    }
  }, [gameState, timer]);

  const handleAnswer = (answer) => {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;

    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      { question: currentQuestion.question, isCorrect, answer },
    ]);

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(30);
    } else {
      setGameState("ended");
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setTimer(30);
    }
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimer(30);
    setGameState("playing");
    setUserAnswers([]);
  };

  return (
    <div>
      <Navbar title={`Game: ${topicName}`} />
      <div className="container">
        <h2>{topicName} Game</h2>
        {gameState === "playing" && (
          <div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
              ></div>
            </div>
            <div className="question-container">
              <div className="question">
                <p>
                  Question {currentQuestionIndex + 1} of {currentQuestions.length}
                </p>
                <p>{currentQuestions[currentQuestionIndex]?.question}</p>
                <div className="difficulty-level">
                  Difficulty: {currentQuestions[currentQuestionIndex]?.difficulty}
                </div>
              </div>
              <div>
                {currentQuestions[currentQuestionIndex]?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="game-button"
                  >
                    {String.fromCharCode(97 + index)}) {option}
                  </button>
                ))}
              </div>
            </div>
            <p>Time Left: {timer}s</p>
            <div className="navigation-buttons">
              <button onClick={handlePrevious} disabled={currentQuestionIndex === 0} className="game-button">
                Previous
              </button>
              <button onClick={handleNext} disabled={currentQuestionIndex === currentQuestions.length - 1} className="game-button">
                Next
              </button>
            </div>
          </div>
        )}
        {gameState === "ended" && (
          <div>
            <p>Game Over! Your score: {score}/{currentQuestions.length}</p>
            <button onClick={resetGame} className="game-button">
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GamePage;
