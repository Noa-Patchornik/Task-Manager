
import React from "react";

function TaskList() {
  const tasks = [
    { id: 1, title: "Buy milk", done: false },
    { id: 2, title: "Study React", done: true },
  ];

  return (
    <div>
      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            backgroundColor: task.done ? "#d4edda" : "#f8d7da",
            padding: "12px 20px",
            margin: "10px 0",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>{task.title}</span>
          <span>{task.done ? "✅" : "❌"}</span>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
