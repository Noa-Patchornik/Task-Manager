import React, { useState } from "react";
import { updateTask, deleteTask } from "../services/tasksServices";
import AlertConfirm from "./AlertConfirm";
import EditTaskModal from "./EditTaskModal";

function TaskItem({ task, onTaskUpdated, onTaskDeleted }) {
  const [isDone, setIsDone] = useState(task.done);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const openEditModal = () => setShowEdit(true);

  const handleToggleDone = async () => {
    const updatedTask = { ...task, done: !isDone };
    setIsDone(!isDone);
    try {
      await updateTask(task._id, { done: !isDone });
      onTaskUpdated && onTaskUpdated(updatedTask);
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task._id);
      onTaskDeleted && onTaskDeleted(task._id);
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const bgColor = isDone ? "#d9fdd3" : "#ffe3e3";
  const borderColor = isDone ? "#7cd67c" : "#f28b82";

  return (
    <>
      {showConfirm && (
        <AlertConfirm
          message={`האם למחוק את המשימה "${task.title}"?`}
          onConfirm={() => {
            handleDelete();
            setShowConfirm(false);
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {showEdit && (
        <EditTaskModal
          task={task}
          onClose={() => setShowEdit(false)}
          onTaskUpdated={onTaskUpdated}
        />
      )}

      <div
        style={{
          backgroundColor: bgColor,
          border: `1px solid ${borderColor}`,
          borderRadius: "14px",
          padding: "14px 18px",
          marginBottom: "12px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          transition: "all 0.2s ease",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        {/* כפתורי עריכה ומחיקה */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
          <span
            role="button"
            onClick={(e) => {
              e.stopPropagation();
              openEditModal();
            }}
            style={{ cursor: "pointer", fontSize: "18px", opacity: 0.8 }}
          >
            ✏️
          </span>
          <span
            role="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirm(true);
            }}
            style={{ cursor: "pointer", fontSize: "18px", opacity: 0.8 }}
          >
            🗑️
          </span>
        </div>

        {/* תוכן המשימה */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            textAlign: "left",
            padding: "0 15px",
          }}
        >
          <strong style={{ fontSize: "16px", color: "#333" }}>{task.title}</strong>

          {task.description && (
            <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>{task.description}</p>
          )}

          {task.deadline && (
            <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>
              📅 <b>דדליין:</b>{" "}
              {new Date(task.deadline).toLocaleDateString("he-IL")}
            </p>
          )}

          {task.notes && task.notes.length > 0 && (
            <div
              style={{
                marginTop: "4px",
                backgroundColor: "rgba(255,255,255,0.6)",
                borderRadius: "8px",
                padding: "6px 10px",
              }}
            >
              <b>הערות:</b>
              <ul style={{ margin: "4px 0 0 18px", padding: 0 }}>
                {task.notes.map((note, i) => (
                  <li key={i} style={{ fontSize: "13px", color: "#555" }}>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Checkbox */}
        <input
          type="checkbox"
          checked={isDone}
          onChange={(e) => {
            e.stopPropagation();
            handleToggleDone();
          }}
          style={{
            width: "20px",
            height: "20px",
            cursor: "pointer",
            accentColor: isDone ? "#34a853" : "#ea4335",
            marginTop: "5px",
          }}
        />
      </div>
    </>
  );
}

export default TaskItem;
