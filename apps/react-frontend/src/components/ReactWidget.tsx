import React, { useState } from "react";

interface ReactWidgetProps {
  title?: string;
  initialCount?: number;
}

const ReactWidget: React.FC<ReactWidgetProps> = ({
  title = "React Widget",
  initialCount = 0,
}) => {
  const [count, setCount] = useState(initialCount);

  return (
    <div
      style={{
        border: "2px solid #646cff",
        borderRadius: "8px",
        padding: "20px",
        margin: "10px",
        backgroundColor: "#f9f9f9",
        maxWidth: "300px",
      }}
    >
      <h3 style={{ margin: "0 0 15px 0", color: "#646cff" }}>{title}</h3>
      <p>This is a React component loaded via Module Federation!</p>
      <div style={{ textAlign: "center", margin: "15px 0" }}>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            backgroundColor: "#646cff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "8px 16px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Count: {count}
        </button>
      </div>
      <p style={{ fontSize: "12px", color: "#666", margin: "10px 0 0 0" }}>
        Built with React + Vite + Module Federation
      </p>
    </div>
  );
};

export default ReactWidget;
