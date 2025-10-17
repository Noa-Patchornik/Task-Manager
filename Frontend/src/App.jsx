import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import AddTaskModal from "./Components/AddTaskModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]); 
  const [loading, setLoading] = useState(true);

  const handleTaskAdded = (newTask) => {
    setTasks((prev) => [...prev, newTask]); 
    setIsModalOpen(false); 
  };

  return (
    <Router>
      <Navbar onAddTaskClick={() => setIsModalOpen(true)} />

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskAdded={handleTaskAdded}
      />

      <Routes>
        <Route
          path="/"
          element={<Home tasks={tasks} setTasks={setTasks} loading={loading} setLoading={setLoading} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
