import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

function TopicPage() {
  const { topicName } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <Navbar title={topicName} /> 
      <div className="container">
        <h2>{topicName}</h2>
        <p>Choose an option below:</p>
        <div className="topic-button">
          <button onClick={() => navigate(`/game/${topicName}`)}>Start Game</button>
          <button onClick={() => navigate(`/how-to-play/${topicName}`)}>How to Play</button>
        </div>
      </div>
    </div>
  );
}

export default TopicPage;
