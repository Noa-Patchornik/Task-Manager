import React, { useState } from "react";
import { updateTask } from "../services/tasksServices";

function EditTaskModal({ task, onClose, onTaskUpdated }) {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const updated = await updateTask(task._id, formData);
      onTaskUpdated(updated);
      onClose();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "30px",
          width: "400px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>עריכת משימה</h2>

        <div style={{ marginBottom: "15px" }}>
          <label>כותרת</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginTop: "4px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>תיאור</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginTop: "4px",
              resize: "none",
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={handleSave}
            style={{
              backgroundColor: "#34a853",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            שמירה
          </button>
          <button
            onClick={onClose}
            style={{
              backgroundColor: "#e5e7eb",
              border: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ביטול
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTaskModal;
