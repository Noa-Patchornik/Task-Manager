
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import AddTaskModal from "./Components/AddTaskModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTaskAdded = (task) => {
    console.log("Task added:", task);
    setIsModalOpen(false);
  };

  return (
    <>
    <Router>
      <Navbar onAddTaskClick={handleOpenModal} />

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onTaskAdded={handleTaskAdded}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
      <p style={{ textAlign: "center", color: "#4164c3" }}>
        © 2025 Task Manager App
      </p>
    </>
  );
}

export default App;

