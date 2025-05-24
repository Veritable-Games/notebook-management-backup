import React, { createContext, useContext, useEffect, useState } from 'react';
import { getTheme, applyTheme } from './theme';

// Create context for theme
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

/**
 * Hook to use the theme context
 * @returns {Object} Theme context with current theme and toggle function
 */
export const useTheme = () => useContext(ThemeContext);

/**
 * Theme provider component
 * Manages theme state and provides theme context to children
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  // Initialize theme on mount
  useEffect(() => {
    const currentTheme = getTheme();
    setTheme(currentTheme);
    applyTheme(currentTheme);
  }, []);
  
  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    applyTheme(newTheme);
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;