import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; 

function Navbar({ title, showBackButton = true }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      {showBackButton && (
        <button className="back-button" onClick={() => navigate(-1)}>
          &larr; 
        </button>
      )}
      <h1 className="navbar-title">{title}</h1>
    </nav>
  );
}

export default Navbar;
