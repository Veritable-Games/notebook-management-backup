/**
 * Knowledge Constellation - Central Configuration
 * 
 * This file serves as the single source of truth for paths and configuration 
 * across all Knowledge Constellation components.
 */

module.exports = {
  // Filesystem paths
  paths: {
    // Data storage locations
    data: {
      root: '/home/user/Repository/data',
      content: '/home/user/Repository/data/content',
      relationships: '/home/user/Repository/data/relationships',
      metadata: '/home/user/Repository/data/metadata'
    },
    
    // Input sources
    sources: {
      notebooks: '/home/user/Notebooks',
      wiki: '/home/user/Repository/WebProjects/Constellation-Viewer/backend/wikiEntries.json',
      examples: '/home/user/Repository/WebProjects/Constellation-Viewer/backend/examples'
    },
    
    // Output targets
    output: {
      visualizations: '/home/user/Repository/WebProjects/3D-Visualization/public/data',
      exports: '/home/user/Repository/exports'
    }
  },
  
  // API endpoints
  api: {
    contentManagement: 'http://localhost:3003',
    visualization: 'http://localhost:8081',
    unifiedInterface: 'http://localhost:9001'
  },
  
  // Common metadata fields
  metadata: {
    requiredFields: ['created', 'modified', 'author'],
    optionalFields: ['tags', 'category', 'status', 'priority'],
    defaultAuthor: 'system'
  },
  
  // Relationship types
  relationships: {
    types: [
      'contains',
      'references',
      'describes',
      'implements',
      'influences',
      'documents',
      'supersedes',
      'extends'
    ],
    defaultStrength: 0.5
  },
  
  // Feature flags
  features: {
    enableRelationships: true,
    enableNotebookIntegration: true,
    enableRealFileOperations: true,
    useUnifiedDataStore: false,
    enableEventSystem: false,
    enableRealTimeUpdates: false
  }
};