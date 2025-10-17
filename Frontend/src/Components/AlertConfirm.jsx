import React from "react";

function AlertConfirm({ message, onConfirm, onCancel }) {
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
          padding: "24px 30px",
          minWidth: "300px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          textAlign: "center",
          animation: "fadeIn 0.3s ease",
        }}
      >
        <p style={{ fontSize: "16px", marginBottom: "20px" }}>{message}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "10px",
          }}
        >
          <button
            onClick={onConfirm}
            style={{
              backgroundColor: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            כן
          </button>
          <button
            onClick={onCancel}
            style={{
              backgroundColor: "#e5e7eb",
              color: "#111",
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

export default AlertConfirm;
