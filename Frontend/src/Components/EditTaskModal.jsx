import React, { useState } from "react";
import { updateTask } from "../services/tasksServices";

function EditTaskModal({ task, onClose, onTaskUpdated }) {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description || "",
    deadline: task.deadline ? task.deadline.split("T")[0] : "", // yyyy-mm-dd
    notes: task.notes || [],
  });

  const [newNote, setNewNote] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addNote = () => {
    if (newNote.trim() === "") return;
    setFormData({ ...formData, notes: [...formData.notes, newNote] });
    setNewNote("");
  };

  const removeNote = (index) => {
    const updatedNotes = formData.notes.filter((_, i) => i !== index);
    setFormData({ ...formData, notes: updatedNotes });
  };

  const handleSave = async () => {
    try {
        const cleanData = {
            ...formData,
            deadline: formData.deadline || null, 
        };
       const updated = await updateTask(task._id, cleanData);
       onTaskUpdated(updated);
       onClose(); // סוגר את המודל אחרי שמירה
    } catch (err) {
       console.error("Error updating task:", err);
       alert("אירעה שגיאה בעדכון המשימה. בדקי את ההתחברות לשרת.");
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
          width: "420px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>עריכת משימה</h2>

        {/* כותרת */}
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

        {/* תיאור */}
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
              minHeight: "60px",
            }}
          />
        </div>

        {/* דדליין */}
        <div style={{ marginBottom: "15px" }}>
          <label>דדליין</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
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

        {/* הערות */}
        <div style={{ marginBottom: "15px" }}>
          <label>הערות</label>
          <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="הוספת הערה חדשה"
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={addNote}
              style={{
                backgroundColor: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "8px 12px",
                cursor: "pointer",
              }}
            >
              ➕
            </button>
          </div>

          {formData.notes.length > 0 && (
            <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
              {formData.notes.map((note, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "4px",
                    fontSize: "14px",
                  }}
                >
                  <span>{note}</span>
                  <button
                    onClick={() => removeNote(i)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#ef4444",
                      fontSize: "16px",
                    }}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* כפתורי פעולה */}
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
