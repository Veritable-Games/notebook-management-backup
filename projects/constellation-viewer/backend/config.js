/**
 * Consolidated Configuration for Knowledge Constellation
 */
const path = require('path');

module.exports = {
  // Core paths
  paths: {
    notebooks: '/home/user/Notebooks',
    wikiData: path.join(__dirname, 'wikiEntries.json'),
    relationships: path.join(__dirname, 'relationships.json')
  },
  
  // Integration settings
  integration: {
    enableRelationships: true,
    enableNotebookImport: true
  },
  
  // UI settings
  ui: {
    defaultTheme: 'dark',
    showSidebar: true
  },
  
  // Feature flags
  features: {
    enableDelete: true,
    enableHistory: true,
    enableTags: true
  }
};
