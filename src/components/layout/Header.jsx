import React from "react";

export default function Header() {
  return (
    <header style={s.header}>
      <div style={s.logoContainer}>
        {/* Ícone dos livrinhos coloridos */}
        <div style={s.iconContainer}>
          <span style={{ ...s.bookIcon, backgroundColor: "#6366F1", transform: "rotate(-12deg) translate(-4px, 2px)" }}></span>
          <span style={{ ...s.bookIcon, backgroundColor: "#F59E0B", transform: "rotate(4deg) translate(0px, -2px)" }}></span>
          <span style={{ ...s.bookIcon, backgroundColor: "#10B981", transform: "rotate(-4deg) translate(4px, 1px)" }}></span>
        </div>
        
        <h1 style={s.logoText}>
          <a
            href="/home"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Bookou
          </a>
        </h1>

      </div>
    </header>
  );
}

const s = {
  header: {
    backgroundColor: "#E06237", // Laranja idêntico ao do botão e do banner
    padding: "16px 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    transition: "background-color 0.3s ease"
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  iconContainer: {
    position: "relative",
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bookIcon: {
    position: "absolute",
    width: "12px",
    height: "16px",
    borderRadius: "2px",
    border: "1px solid rgba(255, 255, 255, 0.6)",
  },
  logoText: {
    color: "#FFFFFF", // Letra branca para dar destaque perfeito no laranja
    fontSize: "28px",
    fontWeight: "bold",
    fontFamily: "'Pacifico', 'Playfair Display', cursive, sans-serif",
    margin: 0,
    letterSpacing: "0.5px"
  }
};