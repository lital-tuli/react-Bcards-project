import React, { createContext, useCallback, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('app-theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('app-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleDarkMode = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  const theme = {
    navbarBg: isDark ? 'navbar-dark bg-dark' : 'navbar-light bg-light',
    bgColor: isDark ? 'bg-dark text-light' : 'bg-light text-dark',
    textColor: isDark ? 'text-light' : 'text-dark',
    btnOutline: isDark ? 'btn-outline-light' : 'btn-outline-dark',
    borderColor: isDark ? 'border-light' : 'border-dark'
  };

  const value = {
    isDark,
    toggleDarkMode,
    theme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a Provider");
  }
  return context;
};

export default ThemeProvider;