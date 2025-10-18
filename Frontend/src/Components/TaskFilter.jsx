import React from "react";

function TaskFilter({ filter, setFilter }) {
  const filters = [
    { label: "הכול", value: "all" },
    { label: "בוצעו ✅", value: "done" },
    { label: "לא בוצעו 🕓", value: "not_done" },
    { label: "דד-ליין היום 📅", value: "today" },
    { label: "דד-ליין בשבוע הקרוב 📆", value: "week" },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        marginBottom: "20px",
        flexWrap: "wrap",
      }}
    >
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => setFilter(f.value)}
          style={{
            backgroundColor: filter === f.value ? "#34a853" : "#e5e7eb",
            color: filter === f.value ? "#fff" : "#333",
            border: "none",
            borderRadius: "10px",
            padding: "8px 14px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "all 0.2s ease",
          }}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;
