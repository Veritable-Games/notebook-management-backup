/**
 * Unified API Server for Knowledge Constellation
 * 
 * This server implements the central API that connects all components of the
 * Knowledge Constellation system. It provides endpoints for:
 * 
 * - Relationships between content items
 * - Content management
 * - Visualization data
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const relationships = require('./lib/relationship-api');
const config = require('./config');

// Create Express app
const app = express();
const PORT = 4000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files from public directory
app.use(express.static('public'));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// API version
const API_VERSION = 'v1';
const API_BASE = `/api/${API_VERSION}`;

// Root endpoint - serve visualization or API docs
app.get('/', (req, res) => {
  // If accept header includes html, serve the visualization
  const acceptsHtml = req.headers.accept && req.headers.accept.includes('text/html');
  
  if (acceptsHtml) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  } else {
    // Otherwise serve API info as JSON
    res.json({
      name: 'Knowledge Constellation Unified API',
      version: API_VERSION,
      endpoints: {
        relationships: `${API_BASE}/relationships`,
        content: `${API_BASE}/content`,
        visualization: `${API_BASE}/visualization`
      },
      documentation: '/api-docs.html'
    });
  }
});

// API Documentation endpoint
app.get('/api-docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/api-docs.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'up',
    timestamp: new Date().toISOString()
  });
});

// ----------------- Relationship Endpoints -----------------

// Get all relationships
app.get(`${API_BASE}/relationships`, (req, res) => {
  const graph = relationships.getAllRelationships();
  res.json(graph);
});

// Get relationships for a specific node
app.get(`${API_BASE}/relationships/node/:id`, (req, res) => {
  const nodeId = req.params.id;
  const nodeRelationships = relationships.getNodeRelationships(nodeId);
  
  if (!nodeRelationships.node) {
    return res.status(404).json({ 
      error: 'Node not found',
      nodeId
    });
  }
  
  res.json(nodeRelationships);
});

// Get a specific node
app.get(`${API_BASE}/relationships/node/:id/info`, (req, res) => {
  const nodeId = req.params.id;
  const node = relationships.getNode(nodeId);
  
  if (!node) {
    return res.status(404).json({ 
      error: 'Node not found',
      nodeId
    });
  }
  
  res.json(node);
});

// Add a new node
app.post(`${API_BASE}/relationships/node`, (req, res) => {
  const node = req.body;
  
  // Validate required fields
  if (!node || !node.id || !node.title) {
    return res.status(400).json({
      error: 'Missing required fields',
      required: ['id', 'title']
    });
  }
  
  const success = relationships.addNode(node);
  
  if (!success) {
    return res.status(409).json({
      error: 'Failed to add node, it may already exist',
      nodeId: node.id
    });
  }
  
  res.status(201).json({
    message: 'Node created successfully',
    node
  });
});

// Update a node
app.put(`${API_BASE}/relationships/node/:id`, (req, res) => {
  const nodeId = req.params.id;
  const updates = req.body;
  
  if (!updates) {
    return res.status(400).json({
      error: 'No updates provided'
    });
  }
  
  const success = relationships.updateNode(nodeId, updates);
  
  if (!success) {
    return res.status(404).json({
      error: 'Node not found',
      nodeId
    });
  }
  
  res.json({
    message: 'Node updated successfully',
    nodeId
  });
});

// Delete a node
app.delete(`${API_BASE}/relationships/node/:id`, (req, res) => {
  const nodeId = req.params.id;
  const success = relationships.deleteNode(nodeId);
  
  if (!success) {
    return res.status(404).json({
      error: 'Node not found',
      nodeId
    });
  }
  
  res.json({
    message: 'Node deleted successfully',
    nodeId
  });
});

// Add a relationship
app.post(`${API_BASE}/relationships/link`, (req, res) => {
  const { sourceId, targetId, type, strength } = req.body;
  
  // Validate required fields
  if (!sourceId || !targetId || !type) {
    return res.status(400).json({
      error: 'Missing required fields',
      required: ['sourceId', 'targetId', 'type']
    });
  }
  
  const success = relationships.addRelationship(sourceId, targetId, type, strength);
  
  if (!success) {
    return res.status(409).json({
      error: 'Failed to add relationship, nodes may not exist or relationship already exists',
      relationship: { sourceId, targetId, type }
    });
  }
  
  res.status(201).json({
    message: 'Relationship created successfully',
    relationship: { sourceId, targetId, type, strength }
  });
});

// Delete a relationship
app.delete(`${API_BASE}/relationships/link`, (req, res) => {
  const { sourceId, targetId, type } = req.body;
  
  // Validate required fields
  if (!sourceId || !targetId || !type) {
    return res.status(400).json({
      error: 'Missing required fields',
      required: ['sourceId', 'targetId', 'type']
    });
  }
  
  const success = relationships.deleteRelationship(sourceId, targetId, type);
  
  if (!success) {
    return res.status(404).json({
      error: 'Relationship not found',
      relationship: { sourceId, targetId, type }
    });
  }
  
  res.json({
    message: 'Relationship deleted successfully',
    relationship: { sourceId, targetId, type }
  });
});

// Get positioned graph for visualization
app.get(`${API_BASE}/visualization/graph`, (req, res) => {
  const positionedGraph = relationships.calculateNodePositions();
  res.json(positionedGraph);
});

// ----------------- Search Endpoints -----------------

// Universal search across all content
app.get(`${API_BASE}/search`, (req, res) => {
  const { q, type = 'all' } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    const results = [];
    const notebooksPath = '/home/user/Notebooks';
    
    // Search in notebooks
    if (fs.existsSync(notebooksPath)) {
      const directories = fs.readdirSync(notebooksPath)
        .filter(dir => fs.statSync(path.join(notebooksPath, dir)).isDirectory());
      
      for (const dir of directories) {
        const dirPath = path.join(notebooksPath, dir);
        const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.txt'));
        
        for (const file of files) {
          try {
            const filePath = path.join(dirPath, file);
            const content = fs.readFileSync(filePath, 'utf8');
            const fileName = path.basename(file, '.txt');
            
            // Check if query matches content or filename
            if (
              content.toLowerCase().includes(q.toLowerCase()) ||
              fileName.toLowerCase().includes(q.toLowerCase())
            ) {
              const stats = fs.statSync(filePath);
              
              // Create excerpt with context
              let excerpt = '';
              const contentLower = content.toLowerCase();
              const queryLower = q.toLowerCase();
              const queryIndex = contentLower.indexOf(queryLower);
              
              if (queryIndex !== -1) {
                const startIndex = Math.max(0, queryIndex - 60);
                const endIndex = Math.min(content.length, queryIndex + q.length + 60);
                excerpt = content.substring(startIndex, endIndex);
                if (startIndex > 0) excerpt = '...' + excerpt;
                if (endIndex < content.length) excerpt = excerpt + '...';
              } else {
                excerpt = content.substring(0, 120) + '...';
              }
              
              results.push({
                id: fileName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                title: fileName,
                type: 'notebook',
                category: dir,
                excerpt,
                lastModified: stats.mtime.toISOString(),
                path: filePath
              });
            }
          } catch (err) {
            console.error(`Error reading file ${file}:`, err);
          }
        }
      }
    }
    
    // Sort by relevance and recency
    results.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
    
    res.json({
      query: q,
      count: results.length,
      results: results.slice(0, 50) // Limit to 50 results
    });
    
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Search failed' });
  }
});

// ----------------- Content Proxy Endpoints -----------------

// These endpoints will proxy to the existing content API for now
// We'll replace them with direct implementation in the future

// Start the server
app.listen(PORT, () => {
  console.log(`Knowledge Constellation Unified API running on port ${PORT}`);
  console.log(`Access the API at http://localhost:${PORT}`);
});