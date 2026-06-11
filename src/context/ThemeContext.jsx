import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState(() => {
    return localStorage.getItem("tema") || "Claro";
  });

  useEffect(() => {
    localStorage.setItem("tema", tema);
    document.body.style.backgroundColor = tema === "Escuro" ? "#1A202C" : "#FAFAFA";
    document.body.style.color = tema === "Escuro" ? "#F7FAFC" : "#1A202C";
  }, [tema]);

  return (
    <ThemeContext.Provider value={{ tema, setTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}