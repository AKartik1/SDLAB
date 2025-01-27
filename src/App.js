import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import TopicPage from "./components/TopicPage";
import GamePage from "./components/GamePage";
import HowToPlayPage from "./components/HowToPlayPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/topic/:topicName" element={<TopicPage />} />
          <Route path="/game/:topicName" element={<GamePage />} />
          <Route path="/how-to-play/:topicName" element={<HowToPlayPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
