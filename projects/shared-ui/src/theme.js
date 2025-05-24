/**
 * Theme utility for handling dark/light mode
 */

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

/**
 * Get the current theme from localStorage or system preference
 * @returns {'light' | 'dark'} The current theme
 */
export const getTheme = () => {
  if (!isBrowser) return 'light';
  
  // Check localStorage first
  const savedTheme = localStorage.getItem('vg-theme');
  if (savedTheme) {
    return savedTheme;
  }
  
  // Check system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

/**
 * Apply theme to the document
 * @param {'light' | 'dark'} theme 
 */
export const applyTheme = (theme) => {
  if (!isBrowser) return;
  
  // Save to localStorage
  localStorage.setItem('vg-theme', theme);
  
  // Apply to document
  document.documentElement.setAttribute('data-theme', theme);
  
  // Update meta theme color for mobile browsers
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute(
      'content',
      theme === 'dark' ? '#1a1a1a' : '#ffffff'
    );
  }
};

/**
 * Toggle between light and dark theme
 */
export const toggleTheme = () => {
  const currentTheme = getTheme();
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
  return newTheme;
};

/**
 * Initialize theme based on saved preference or system settings
 */
export const initTheme = () => {
  const theme = getTheme();
  applyTheme(theme);
  return theme;
};

// Auto-initialize if in browser
if (isBrowser) {
  window.addEventListener('DOMContentLoaded', initTheme);
}