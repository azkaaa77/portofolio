import React from "react";
import { M } from "../constants/tokens";

export function SectionLabel({ children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        marginBottom: 48,
      }}
    >
      <span
        style={{
          ...M,
          color: "#60a5fa",
          fontSize: 10,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </span>
      <div
        style={{
          flex: 1,
          height: 1,
          background:
            "linear-gradient(to right, rgba(37,99,235,0.35), transparent)",
        }}
      />
    </div>
  );
}

export function BrowserMockup({ accentColor = "#2563eb" }) {
  return (
    <div
      style={{
        borderRadius: 10,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(0,0,0,0.4)",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "6px 10px",
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#ef4444",
            display: "inline-block",
            opacity: 0.7,
          }}
        />
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#f59e0b",
            display: "inline-block",
            opacity: 0.7,
          }}
        />
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#10b981",
            display: "inline-block",
            opacity: 0.7,
          }}
        />
        <div
          style={{
            flex: 1,
            marginLeft: 6,
            height: 12,
            borderRadius: 999,
            background: "rgba(255,255,255,0.04)",
          }}
        />
        <span
          style={{
            ...M,
            fontSize: 8,
            padding: "2px 6px",
            borderRadius: 4,
            background: "rgba(16,185,129,0.12)",
            border: "1px solid rgba(16,185,129,0.2)",
            color: "#10b981",
          }}
        >
          LIVE
        </span>
      </div>
      {/* Preview body */}
      <div
        style={{
          aspectRatio: "16/9",
          background: "rgba(9,9,11,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage: `linear-gradient(${accentColor} 1px, transparent 1px), linear-gradient(90deg, ${accentColor} 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -20,
            right: -20,
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: accentColor,
            filter: "blur(32px)",
            opacity: 0.2,
          }}
        />
        <span
          style={{
            ...M,
            fontSize: 9,
            color: "#3f3f46",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            position: "relative",
            zIndex: 1,
          }}
        >
          Preview
        </span>
      </div>
    </div>
  );
}

export function Divider() {
  return (
    <div
      style={{
        height: 1,
        background:
          "linear-gradient(to right, transparent, rgba(37,99,235,0.15), transparent)",
        margin: "0 40px",
      }}
    />
  );
}
