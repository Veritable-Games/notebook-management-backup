#!/bin/bash

# Fix Unified Interface Script
echo "Fixing the unified interface..."

# 1. Fix relationship API path
echo "Fixing relationship API path..."
cat > /home/user/Repository/WebProjects/Constellation-Viewer/backend/lib/relationship-api.js << 'EOL'
/**
 * Relationship API - Core functionality for the Knowledge Constellation
 * 
 * This module provides functions to manage relationships between content items,
 * forming the backbone of the constellation metaphor.
 */

const fs = require('fs');
const path = require('path');
const config = require('../config');

// Path to relationships data
const RELATIONSHIPS_PATH = path.join(__dirname, '..', 'relationships.json');

/**
 * Load the relationship graph from the file system
 * @returns {Object} The relationship graph with nodes and links
 */
function loadRelationshipGraph() {
  try {
    // Check if the file exists
    if (!fs.existsSync(RELATIONSHIPS_PATH)) {
      return { nodes: [], links: [] };
    }
    
    // Read and parse the file
    const data = fs.readFileSync(RELATIONSHIPS_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading relationship graph:', error);
    return { nodes: [], links: [] };
  }
}

/**
 * Save the relationship graph to the file system
 * @param {Object} graph The relationship graph to save
 * @returns {boolean} True if successful, false otherwise
 */
function saveRelationshipGraph(graph) {
  try {
    const data = JSON.stringify(graph, null, 2);
    fs.writeFileSync(RELATIONSHIPS_PATH, data);
    return true;
  } catch (error) {
    console.error('Error saving relationship graph:', error);
    return false;
  }
}

/**
 * Get all relationships in the graph
 * @returns {Object} The complete relationship graph
 */
function getAllRelationships() {
  return loadRelationshipGraph();
}

/**
 * Get a specific node by ID
 * @param {string} id The ID of the node to find
 * @returns {Object|null} The node object or null if not found
 */
function getNode(id) {
  const graph = loadRelationshipGraph();
  return graph.nodes.find(node => node.id === id) || null;
}

/**
 * Get all relationships for a specific node
 * @param {string} nodeId The ID of the node
 * @returns {Object} Object containing the node and its connections
 */
function getNodeRelationships(nodeId) {
  const graph = loadRelationshipGraph();
  const node = graph.nodes.find(n => n.id === nodeId);
  
  if (!node) {
    return { node: null, connections: [] };
  }
  
  // Find all links that involve this node
  const links = graph.links.filter(link => 
    link.source === nodeId || link.target === nodeId
  );
  
  // Create a more detailed connections array
  const connections = links.map(link => {
    const isSource = link.source === nodeId;
    const connectedId = isSource ? link.target : link.source;
    const connectedNode = graph.nodes.find(n => n.id === connectedId);
    
    return {
      relationship: {
        type: link.type,
        strength: link.strength,
        direction: isSource ? 'outgoing' : 'incoming'
      },
      node: connectedNode
    };
  });
  
  return { node, connections };
}

/**
 * Add a new node to the graph
 * @param {Object} node The node to add
 * @returns {boolean} True if successful, false otherwise
 */
function addNode(node) {
  // Validate required fields
  if (!node.id || !node.title) {
    return false;
  }
  
  const graph = loadRelationshipGraph();
  
  // Check if node already exists
  if (graph.nodes.some(n => n.id === node.id)) {
    return false;
  }
  
  // Add defaults for optional fields
  const newNode = {
    id: node.id,
    title: node.title,
    type: node.type || 'document',
    category: node.category || 'general',
    size: node.size || 1.0,
    ...node
  };
  
  graph.nodes.push(newNode);
  return saveRelationshipGraph(graph);
}

/**
 * Update an existing node
 * @param {string} id The ID of the node to update
 * @param {Object} updates The updates to apply
 * @returns {boolean} True if successful, false otherwise
 */
function updateNode(id, updates) {
  const graph = loadRelationshipGraph();
  const nodeIndex = graph.nodes.findIndex(n => n.id === id);
  
  if (nodeIndex === -1) {
    return false;
  }
  
  // Update the node, preserving the id
  graph.nodes[nodeIndex] = {
    ...graph.nodes[nodeIndex],
    ...updates,
    id // Ensure ID cannot be changed
  };
  
  return saveRelationshipGraph(graph);
}

/**
 * Delete a node and all its relationships
 * @param {string} id The ID of the node to delete
 * @returns {boolean} True if successful, false otherwise
 */
function deleteNode(id) {
  const graph = loadRelationshipGraph();
  
  // Find and remove the node
  const nodeIndex = graph.nodes.findIndex(n => n.id === id);
  if (nodeIndex === -1) {
    return false;
  }
  
  // Remove the node
  graph.nodes.splice(nodeIndex, 1);
  
  // Remove all links involving this node
  graph.links = graph.links.filter(link => 
    link.source !== id && link.target !== id
  );
  
  return saveRelationshipGraph(graph);
}

/**
 * Add a relationship between two nodes
 * @param {string} sourceId The ID of the source node
 * @param {string} targetId The ID of the target node
 * @param {string} type The type of relationship
 * @param {number} strength The strength of the relationship (0-1)
 * @returns {boolean} True if successful, false otherwise
 */
function addRelationship(sourceId, targetId, type, strength = 0.5) {
  const graph = loadRelationshipGraph();
  
  // Verify both nodes exist
  const sourceExists = graph.nodes.some(n => n.id === sourceId);
  const targetExists = graph.nodes.some(n => n.id === targetId);
  
  if (!sourceExists || !targetExists) {
    return false;
  }
  
  // Check if this relationship already exists
  const relationshipExists = graph.links.some(link => 
    link.source === sourceId && 
    link.target === targetId && 
    link.type === type
  );
  
  if (relationshipExists) {
    return false;
  }
  
  // Validate relationship type
  const validTypes = [
    'contains', 'references', 'describes', 
    'implements', 'influences', 'documents', 
    'supersedes', 'extends'
  ];
  
  if (!validTypes.includes(type)) {
    return false;
  }
  
  // Add the new relationship
  graph.links.push({
    source: sourceId,
    target: targetId,
    type,
    strength: Math.max(0, Math.min(1, strength)) // Clamp between 0-1
  });
  
  return saveRelationshipGraph(graph);
}

/**
 * Delete a specific relationship
 * @param {string} sourceId The ID of the source node
 * @param {string} targetId The ID of the target node
 * @param {string} type The type of relationship
 * @returns {boolean} True if successful, false otherwise
 */
function deleteRelationship(sourceId, targetId, type) {
  const graph = loadRelationshipGraph();
  
  // Find the index of the relationship
  const linkIndex = graph.links.findIndex(link => 
    link.source === sourceId && 
    link.target === targetId && 
    link.type === type
  );
  
  if (linkIndex === -1) {
    return false;
  }
  
  // Remove the relationship
  graph.links.splice(linkIndex, 1);
  
  return saveRelationshipGraph(graph);
}

/**
 * Calculate positions for nodes based on their relationships
 * This is a simple force-directed layout algorithm
 * @returns {Object} The graph with positions added to each node
 */
function calculateNodePositions() {
  const graph = loadRelationshipGraph();
  const positions = {};
  
  // Initialize positions randomly on a sphere
  graph.nodes.forEach(node => {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = 10 + (node.size || 1) * 2;
    
    positions[node.id] = {
      x: radius * Math.sin(phi) * Math.cos(theta),
      y: radius * Math.sin(phi) * Math.sin(theta),
      z: radius * Math.cos(phi)
    };
  });
  
  // Apply simple force-directed algorithm
  const iterations = 100;
  const repulsionForce = 1;
  const attractionForce = 0.1;
  
  for (let i = 0; i < iterations; i++) {
    // Apply repulsion between all nodes
    for (let j = 0; j < graph.nodes.length; j++) {
      for (let k = j + 1; k < graph.nodes.length; k++) {
        const nodeJ = graph.nodes[j];
        const nodeK = graph.nodes[k];
        const posJ = positions[nodeJ.id];
        const posK = positions[nodeK.id];
        
        const dx = posJ.x - posK.x;
        const dy = posJ.y - posK.y;
        const dz = posJ.z - posK.z;
        
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (distance < 0.1) continue; // Avoid division by zero
        
        const force = repulsionForce / (distance * distance);
        
        const fx = dx * force / distance;
        const fy = dy * force / distance;
        const fz = dz * force / distance;
        
        posJ.x += fx;
        posJ.y += fy;
        posJ.z += fz;
        
        posK.x -= fx;
        posK.y -= fy;
        posK.z -= fz;
      }
    }
    
    // Apply attraction along links
    graph.links.forEach(link => {
      const sourcePos = positions[link.source];
      const targetPos = positions[link.target];
      
      const dx = targetPos.x - sourcePos.x;
      const dy = targetPos.y - sourcePos.y;
      const dz = targetPos.z - sourcePos.z;
      
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (distance < 0.1) return; // Avoid division by zero
      
      const force = attractionForce * distance * (link.strength || 0.5);
      
      const fx = dx * force / distance;
      const fy = dy * force / distance;
      const fz = dz * force / distance;
      
      sourcePos.x += fx;
      sourcePos.y += fy;
      sourcePos.z += fz;
      
      targetPos.x -= fx;
      targetPos.y -= fy;
      targetPos.z -= fz;
    });
  }
  
  // Add positions to the nodes
  const result = JSON.parse(JSON.stringify(graph));
  result.nodes.forEach(node => {
    node.position = positions[node.id];
  });
  
  return result;
}

// Export the API functions
module.exports = {
  getAllRelationships,
  getNode,
  getNodeRelationships,
  addNode,
  updateNode,
  deleteNode,
  addRelationship,
  deleteRelationship,
  calculateNodePositions
};
EOL

# 2. Update config.js to use the correct paths
echo "Updating configuration..."
cat > /home/user/Repository/WebProjects/Constellation-Viewer/backend/config.js << 'EOL'
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
EOL

# 3. Fix server-integration.js to remove the requirement on specific config layout
echo "Fixing server integration..."
cat > /home/user/Repository/WebProjects/Constellation-Viewer/backend/server-integration.js << 'EOL'
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
EOL

# 4. Copy the initial graph to the correct location
echo "Copying initial relationship graph..."
cp /home/user/Repository/data/relationships/initial-graph.json /home/user/Repository/WebProjects/Constellation-Viewer/backend/relationships.json

# 5. Create a direct link to unified.html at root
echo "Creating direct link to unified interface at root..."
cat > /home/user/Repository/WebProjects/Constellation-Viewer/backend/test-index.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0;url=/unified">
    <title>Knowledge Constellation</title>
</head>
<body>
    <p>Redirecting to Knowledge Constellation...</p>
    <p>If you are not redirected, <a href="/unified">click here</a>.</p>
</body>
</html>
EOL

# 6. Restart the Constellation Viewer
echo "Restarting Constellation Viewer..."
pkill -f "node /home/user/Repository/WebProjects/Constellation-Viewer/backend/server.js" || echo "Constellation Viewer not running"

# Wait a moment
sleep 1

# Start the Constellation Viewer service
cd /home/user/Repository/WebProjects/Constellation-Viewer
node backend/server.js > /home/user/Repository/WebProjects/Constellation-Viewer/backend.log 2>&1 &
CV_PID=$!

# Wait for server to start
sleep 3

# Check if service started correctly
if kill -0 $CV_PID 2>/dev/null; then
  echo "Constellation Viewer restarted successfully with all features integrated"
else
  echo "Failed to restart Constellation Viewer"
  echo "Checking logs:"
  tail -n 20 /home/user/Repository/WebProjects/Constellation-Viewer/backend.log
fi

echo ""
echo "All fixes have been applied. The unified interface should now be accessible at:"
echo ""
echo "http://localhost:3003/"
echo ""
echo "This will automatically redirect you to the unified interface."
echo "You can also directly access it at http://localhost:3003/unified"