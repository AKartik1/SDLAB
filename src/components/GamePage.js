import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

function GamePage() {
  const { topicName } = useParams();

  // Define questions for each topic
  const questions = {
    Groups: [
      // Easy
      {
        question: "What is the identity element of addition in integers?",
        options: ["A) 1", "B) 0", "C) -1", "D) 2"],
        correctAnswer: "B) 0",
        difficulty: "easy",
        type: "multipleChoice",
      },
      {
        question: "Is the set of integers under addition a group?",
        options: ["A) Yes", "B) No", "C) Only under certain conditions", "D) Not Sure"],
        correctAnswer: "A) Yes",
        difficulty: "easy",
        type: "multipleChoice",
      },
      {
        question: "Does the set of natural numbers under multiplication form a group?",
        options: ["A) Yes", "B) No", "C) Only if 1 is included", "D) Depends on the operation"],
        correctAnswer: "B) No",
        difficulty: "easy",
        type: "multipleChoice",
      },
      // Medium
      {
        question: "Which of these sets forms a cyclic group under addition modulo 5?",
        options: ["A) {1, 2, 3, 4, 5}", "B) {0, 1, 2, 3, 4}", "C) {1, 3, 5, 7, 9}", "D) {0, 2, 4, 6, 8}"],
        correctAnswer: "B) {0, 1, 2, 3, 4}",
        difficulty: "medium",
        type: "multipleChoice",
      },
      {
        question: "Which of the following is NOT a group?",
        options: [
          "A) Integers under addition",
          "B) Rational numbers under addition",
          "C) Non-zero real numbers under multiplication",
          "D) Natural numbers under addition",
        ],
        correctAnswer: "D) Natural numbers under addition",
        difficulty: "medium",
        type: "multipleChoice",
      },
      // Hard
      {
        question: "Which property ensures (a ⋅ b)⁻¹ = b⁻¹ ⋅ a⁻¹ in a group?",
        options: ["A) Closure", "B) Associativity", "C) Identity", "D) Inverses"],
        correctAnswer: "D) Inverses",
        difficulty: "hard",
        type: "multipleChoice",
      },
      {
        question: "Which of these is an example of a non-abelian group?",
        options: [
          "A) Integers under addition",
          "B) Symmetric group S3",
          "C) Real numbers under multiplication",
          "D) Cyclic group of order 4",
        ],
        correctAnswer: "B) Symmetric group S3",
        difficulty: "hard",
        type: "multipleChoice",
      },
    ],
    Semigroups: [
      // Easy
      {
        question: "Which operation forms a semigroup in natural numbers?",
        options: ["A) Addition", "B) Subtraction", "C) Division", "D) Exponentiation"],
        correctAnswer: "A) Addition",
        difficulty: "easy",
        type: "multipleChoice",
      },
      {
        question: "Is string concatenation a semigroup?",
        options: ["A) Yes", "B) No", "C) Sometimes", "D) Not Sure"],
        correctAnswer: "A) Yes",
        difficulty: "easy",
        type: "multipleChoice",
      },
      // Medium
      {
        question: "Which property is necessary for a semigroup?",
        options: ["A) Identity", "B) Associativity", "C) Inverses", "D) Commutativity"],
        correctAnswer: "B) Associativity",
        difficulty: "medium",
        type: "multipleChoice",
      },
      {
        question: "Which of these sets forms a semigroup under multiplication?",
        options: ["A) Natural Numbers", "B) Integers", "C) Matrices", "D) Strings"],
        correctAnswer: "C) Matrices",
        difficulty: "medium",
        type: "multipleChoice",
      },
      // Hard
      {
        question: "Which of these is a semigroup but NOT a monoid?",
        options: [
          "A) Strings under concatenation",
          "B) Natural numbers under addition",
          "C) Natural numbers under subtraction",
          "D) Even integers under addition",
        ],
        correctAnswer: "C) Natural numbers under subtraction",
        difficulty: "hard",
        type: "multipleChoice",
      },
      {
        question: "Which property differentiates a semigroup from a group?",
        options: ["A) Closure", "B) Associativity", "C) Identity", "D) Inverse"],
        correctAnswer: "C) Identity",
        difficulty: "hard",
        type: "multipleChoice",
      },
    ],
  };

  // Game states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState("playing");
  const [timer, setTimer] = useState(30); // Timer for each question
  const [intervalId, setIntervalId] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]); // Store user answers for later feedback
  const [level, setLevel] = useState(1); // Level system
  const [badges, setBadges] = useState([]); // Badges system
  const [rewardMessage, setRewardMessage] = useState(""); // Reward message

  // Fetch current questions based on topic
  const currentQuestions = questions[topicName] || [];

  // Start timer
  useEffect(() => {
    if (gameState === "playing" && timer > 0) {
      const id = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      setIntervalId(id);
      return () => clearInterval(id); // Cleanup interval on unmount
    }
    if (timer === 0) {
      handleAnswer(null); // Time's up, move to next question
    }
  }, [gameState, timer]);

  // Handle answer selection
  const handleAnswer = (answer) => {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;

    // Save user answer (for later feedback)
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      { question: currentQuestion.question, isCorrect, answer },
    ]);

    // Update score if the answer is correct
    if (isCorrect) {
      setScore(score + 1);
    }

    // Check for level up
    if (score % 5 === 0 && score > 0) {
      const newLevel = Math.floor(score / 5) + 1;
      if (newLevel > level) {
        setLevel(newLevel);
        setRewardMessage(`Congratulations! You've leveled up to Level ${newLevel}!`);
      }
    }

    // Check for badges
    if (score === currentQuestions.length) {
      setBadges((prevBadges) => [...prevBadges, "Perfect Score Badge"]);
      setRewardMessage("Congrats on earning the Perfect Score Badge!");
    }

    // Move to next question or end game
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimer(30); // Reset timer
      }, 1000); // Delay before showing next question
    } else {
      setGameState("ended"); // End game after last question
    }
  };

  // Reset the game
  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimer(30);
    setGameState("playing");
    setUserAnswers([]); // Clear previous answers
    setLevel(1); // Reset level
    setBadges([]); // Clear badges
    setRewardMessage(""); // Reset reward message
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
            <p>{currentQuestions[currentQuestionIndex]?.question}</p>
            <div>
              {currentQuestions[currentQuestionIndex]?.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className="game-button"
                >
                  {option}
                </button>
              ))}
            </div>
            <p>Time Left: {timer}s</p>
          </div>
        )}
        {gameState === "ended" && (
          <div>
            <p>Game Over! Your score: {score}/{currentQuestions.length}</p>
            <p>Level: {level}</p>
            {rewardMessage && <p>{rewardMessage}</p>}
            <h3>Badges:</h3>
            <ul>
              {badges.map((badge, index) => (
                <li key={index}>{badge}</li>
              ))}
            </ul>
            <div>
              <h3>Feedback:</h3>
              <ul className="instructions-list">
                {userAnswers.map((answer, index) => (
                  <li key={index}>
                    <strong>{answer.question}</strong>
                    <br />
                    Your answer: {answer.answer}
                    <br />
                    {answer.isCorrect ? "Correct!" : "Incorrect"}
                  </li>
                ))}
              </ul>
            </div>
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
