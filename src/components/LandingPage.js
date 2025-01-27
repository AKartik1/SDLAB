import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const topics = ["Groups", "Semigroups", ];

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar title="Discrete Mathematics Game" showBackButton={false} /> {/* Hide the back button */}
      <div className="container">
        <h1>Welcome!</h1>
        <p>Select a topic to get started:</p>
        <div className="topic-button">
          {topics.map((topic) => (
            <button key={topic} onClick={() => navigate(`/topic/${topic}`)}>
              {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
