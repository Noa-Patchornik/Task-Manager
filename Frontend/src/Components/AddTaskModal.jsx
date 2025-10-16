import React, { useState } from "react";
import axios from "axios";

const AddTaskModal = ({ isOpen, onClose, onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [notes, setNotes] = useState([""]);

  if (!isOpen) return null; 

  const handleNoteChange = (index, value) => {
    const newNotes = [...notes];
    newNotes[index] = value;
    setNotes(newNotes);
  };

  const handleAddNote = () => {
    setNotes([...notes, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    const newTask = {
      title,
      description: description || null,
      deadline: deadline || null,
      notes: notes.filter((n) => n.trim() !== ""),
      done: false,
      created_at: new Date().toISOString().split("T")[0],
    };

    try {
      const response = await axios.post("http://backend:8000/tasks", newTask);
      onTaskAdded(response.data);
      onClose();
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please check console for details.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add a New Task</h2>
        <form onSubmit={handleSubmit}>
          <label>Title*</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          />

          <label>Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <label>Notes</label>
          {notes.map((note, index) => (
            <input
              key={index}
              type="text"
              value={note}
              onChange={(e) => handleNoteChange(index, e.target.value)}
              placeholder={`Note ${index + 1}`}
            />
          ))}
          <button type="button" className="add-note-btn" onClick={handleAddNote}>
            + Add another note
          </button>

          <div className="modal-buttons">
            <button type="submit" className="save-btn">
              Save
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
