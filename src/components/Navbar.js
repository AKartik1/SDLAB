import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Ensure this CSS file contains the necessary styles

function Navbar({ title, showBackButton = true }) {
  const navigate = useNavigate(); // Hook to navigate programmatically

  return (
    <nav className="navbar">
      {/* Only show back button if showBackButton is true */}
      {showBackButton && (
        <button 
          className="back-button" 
          onClick={() => navigate(-1)} // Navigate to the previous page
        >
          &larr; {/* Left arrow symbol */}
        </button>
      )}
      <h1 className="navbar-title">{title}</h1>
    </nav>
  );
}

export default Navbar;
