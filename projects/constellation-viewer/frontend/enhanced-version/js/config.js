/**
 * Configuration settings for the Notebook Explorer application
 */

const NotebookConfig = {
  // API configuration
  api: {
    baseUrl: '/api',
    timeout: 5000,
    mockEnabled: true // Use mock data instead of real API
  },
  
  // UI configuration
  ui: {
    theme: 'light', // Default theme: 'light' or 'dark'
    sidebarOpen: true, // Default sidebar state
    defaultViewMode: 'normal', // 'compact', 'normal', or 'reading'
    itemsPerPage: 20 // Number of items to show per page
  },
  
  // Appearance configuration
  appearance: {
    animationsEnabled: true,
    fontScale: 1.0 // Font size multiplier
  },
  
  // Features toggles
  features: {
    historyEnabled: true,
    tagsEnabled: true,
    searchEnabled: true,
    fileOperationsEnabled: true
  }
};

// Expose configuration globally
window.NotebookConfig = NotebookConfig;