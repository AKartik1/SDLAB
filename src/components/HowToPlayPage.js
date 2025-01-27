import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

function HowToPlayPage() {
  const { topicName } = useParams();

  // Topic-specific instructions
  const instructions = {
    Groups: [
      "Understand the concept of Groups.",
      "Learn the group operation.",
      "Explore examples of group elements.",
      "Test your knowledge by solving group-related problems.",
      "Each correct answer gives you +1 point.",
      "There is no negative marking."
    ],
    Semigroups: [
      "Understand the concept of Semigroups.",
      "Learn about the binary operation.",
      "Study the closure property.",
      "Work on problems related to semigroups.",
      "Each correct answer gives you +1 point.",
      "There is no negative marking."
    ],
  };

  // Default instructions in case the topicName doesn't match any of the above
  const defaultInstructions = [
    "Choose a topic to learn specific instructions.",
    "This section provides learning guides for the Discrete Mathematics game.",
    "Each correct answer gives you +1 point.",
    "There is no negative marking."
  ];

  // Fetch the instructions based on topicName
  const topicInstructions = instructions[topicName] || defaultInstructions;

  return (
    <div>
      <Navbar title={`How to Play: ${topicName}`} /> {/* Show back button */}
      <div className="container">
        <h2>How to Play {topicName}</h2>
        <p>Here are the instructions for playing the {topicName} game:</p>
        <ul className="instructions-list">
          {topicInstructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HowToPlayPage;
