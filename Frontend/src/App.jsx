
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import AddTaskModal from "./Components/AddTaskModal";

function App() {
  // ✅ מוסיפים state לניהול פתיחה וסגירה של המודל
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ פונקציה לפתיחת המודל
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // ✅ פונקציה לסגירת המודל
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // ✅ כשמשימה חדשה מתווספת
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
    <Footer>
      <p>&copy; {new Date().getFullYear()} Noa's TO-DO List</p>
    </Footer>
    </>
  );
}

export default App;

