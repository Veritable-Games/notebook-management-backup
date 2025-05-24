// Import the relationship API
const path = require('path');
const fs = require('fs');
const relationships = require('./lib/relationship-api');

// Function to integrate the relationship API with the Constellation Viewer backend
function integrateRelationshipAPI(app) {
  console.log('Integrating relationship API...');
  
  // API version
  const API_VERSION = 'v1';
  const API_BASE = `/api/${API_VERSION}`;
  
  // API Documentation endpoint
  app.get('/api-docs', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/api-docs.html'));
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
  
  console.log('Relationship API integration complete');
}

module.exports = {
  integrateRelationshipAPI
};
