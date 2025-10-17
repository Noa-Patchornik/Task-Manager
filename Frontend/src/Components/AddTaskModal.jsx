import React, { useState } from "react";
import { addTask } from "../services/tasksServices";

function AddTaskModal({ isOpen, onClose, onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [notes, setNotes] = useState([""]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description?.trim() || null,
      deadline: deadline || null,
      notes: notes.filter((n) => n && n.trim() !== ""),
      done: false,
    };

    setLoading(true);
    try {
      const newTask = await addTask(taskData);
      if (onTaskAdded) onTaskAdded(newTask); 
      setTitle("");
      setDescription("");
      setDeadline("");
      setNotes([""]);
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Error adding task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <label>Title*</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

          <label>Deadline</label>
          <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />

          <label>Notes</label>
          {notes.map((note, idx) => (
            <input
              key={idx}
              type="text"
              value={note}
              onChange={(e) => {
                const copy = [...notes];
                copy[idx] = e.target.value;
                setNotes(copy);
              }}
            />
          ))}
          <button type="button" onClick={() => setNotes([...notes, ""])}>
            + Add another note
          </button>

          <div style={{ marginTop: 12 }}>
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Add Task"}
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;
