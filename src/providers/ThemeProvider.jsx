import React, { createContext, useCallback, useContext, useState, useEffect } from "react";

// Create the context
export const ThemeContext = createContext(null);

// Custom Theme Provider component
const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Retrieve theme preference from localStorage on initial load
    const savedTheme = localStorage.getItem('app-theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    // Update Bootstrap's theme attribute and localStorage
    document.documentElement.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('app-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleDarkMode = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  // Theme object with Bootstrap classes
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