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
