import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";
type ThemeMode = "neon" | "matrix";
interface ThemeContextType {
  theme: Theme;
  mode: ThemeMode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  mode: "neon",
  toggleMode: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() =>
    typeof window !== "undefined" && localStorage.getItem("portfolio-mode") === "matrix"
      ? "matrix"
      : "neon",
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light");
    root.classList.toggle("matrix", mode === "matrix");
    root.classList.add("dark");
    localStorage.setItem("portfolio-mode", mode);
  }, [mode]);

  const toggleMode = () => setMode((current) => current === "neon" ? "matrix" : "neon");

  return (
    <ThemeContext.Provider value={{ theme: "dark", mode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
