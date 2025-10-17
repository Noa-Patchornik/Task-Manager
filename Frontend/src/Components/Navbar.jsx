import React from "react";
import { Link } from "react-router-dom";

function Navbar({ onAddTaskClick }) {
  return (
    <nav
      style={{
        backgroundColor: "#4164c3ff",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 30px",
      }}
    >
      <h2 style={{ margin: 0 }}>Task Manager</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        <button style={btnStyle} onClick={onAddTaskClick}>
          Add Task
        </button>
        <Link to="/about" style={linkStyle}>
          About
        </Link>
      </div>
    </nav>
  );
}

const btnStyle = {
  background: "transparent",
  border: "1px solid white",
  borderRadius: "8px",
  color: "white",
  padding: "6px 12px",
  cursor: "pointer",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  border: "1px solid white",
  borderRadius: "8px",
  padding: "6px 12px",
};

export default Navbar;
