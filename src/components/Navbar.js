import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Ensure the necessary styles are in place

function Navbar({ title, showBackButton = true }) {
  const navigate = useNavigate(); // Using navigate to move between pages

  return (
    <nav className="navbar">
      {/* Show back button if showBackButton is true */}
      {showBackButton && (
        <button 
          className="back-button" 
          onClick={() => navigate(-1)} // Go back to the previous page
        >
          &larr; {/* Left arrow symbol */}
        </button>
      )}
      <h1 className="navbar-title">{title}</h1>
    </nav>
  );
}

export default Navbar;
