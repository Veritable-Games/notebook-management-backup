/**
 * Relationship API Client
 * Provides integration with the backend-api service for content relationships
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  apiHost: process.env.BACKEND_API_HOST || 'localhost',
  apiPort: process.env.BACKEND_API_PORT || 4000,
  apiPath: process.env.BACKEND_API_PATH || '/api',
  useHttps: process.env.BACKEND_API_HTTPS === 'true',
  timeout: parseInt(process.env.BACKEND_API_TIMEOUT || '5000', 10),
  // Log connection errors for debugging
  logErrors: process.env.LOG_RELATIONSHIP_ERRORS !== 'false'
};

/**
 * Make a request to the backend API
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Data to send (for POST/PUT requests)
 * @returns {Promise<Object>} - Response data
 */
async function makeRequest(method, endpoint, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: config.apiHost,
      port: config.apiPort,
      path: `${config.apiPath}${endpoint}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: config.timeout
    };

    const client = config.useHttps ? https : http;
    
    const req = client.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const parsedData = JSON.parse(responseData);
            resolve(parsedData);
          } catch (error) {
            resolve(responseData);
          }
        } else {
          reject(new Error(`API request failed with status: ${res.statusCode}, message: ${responseData}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(new Error(`API request error: ${error.message}`));
    });
    
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`API request timed out after ${config.timeout}ms`));
    });
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

/**
 * Get relationships for a specific node
 * @param {string} nodeId - Node identifier
 * @returns {Promise<Object>} - Relationship data
 */
async function getRelationships(nodeId) {
  try {
    return await makeRequest('GET', `/relationships/${nodeId}`);
  } catch (error) {
    if (config.logErrors) {
      console.error(`Failed to get relationships for node ${nodeId}:`, error);
    }
    return { nodes: [], edges: [] };
  }
}

/**
 * Create a relationship between two nodes
 * @param {string} sourceId - Source node identifier
 * @param {string} targetId - Target node identifier
 * @param {string} relationshipType - Type of relationship
 * @returns {Promise<Object>} - Created relationship
 */
async function createRelationship(sourceId, targetId, relationshipType) {
  try {
    // Use the API endpoint structure the backend API actually expects
    return await makeRequest('POST', '/relationships/link', {
      sourceId,
      targetId,
      type: relationshipType,
      strength: 0.5 // Default strength
    });
  } catch (error) {
    if (config.logErrors) {
      console.error(`Failed to create relationship between ${sourceId} and ${targetId}:`, error);
    }
    throw error;
  }
}

/**
 * Get all node types
 * @returns {Promise<Array>} - Array of node types
 */
async function getNodeTypes() {
  try {
    // Updated to v1 endpoint structure
    return await makeRequest('GET', '/v1/relationships/types');
  } catch (error) {
    if (config.logErrors) {
      console.error('Failed to get node types:', error);
    }
    return [];
  }
}

/**
 * Create a node
 * @param {string} type - Node type
 * @param {Object} properties - Node properties
 * @param {string} id - Node identifier (optional)
 * @returns {Promise<Object>} - Created node
 */
async function createNode(type, properties, id = null) {
  try {
    // Format node data according to what the backend API expects
    const data = {
      id: id || properties.id || Date.now().toString(),
      title: properties.title || id || "Untitled",
      type: type,
      category: properties.category || "general",
      tags: properties.tags || [],
      size: properties.size || 1.0
    };
    
    // Use the correct endpoint path
    return await makeRequest('POST', '/relationships/node', data);
  } catch (error) {
    if (config.logErrors) {
      console.error(`Failed to create node of type ${type}:`, error);
    }
    throw error;
  }
}

/**
 * Update node properties
 * @param {string} nodeId - Node identifier
 * @param {Object} properties - Updated properties
 * @returns {Promise<Object>} - Updated node
 */
async function updateNode(nodeId, properties) {
  try {
    // Use the correct endpoint structure
    return await makeRequest('PUT', `/relationships/node/${nodeId}`, properties);
  } catch (error) {
    if (config.logErrors) {
      console.error(`Failed to update node ${nodeId}:`, error);
    }
    throw error;
  }
}

/**
 * Delete a node
 * @param {string} nodeId - Node identifier
 * @returns {Promise<Object>} - Response
 */
async function deleteNode(nodeId) {
  try {
    // Use the correct endpoint structure
    return await makeRequest('DELETE', `/relationships/node/${nodeId}`);
  } catch (error) {
    if (config.logErrors) {
      console.error(`Failed to delete node ${nodeId}:`, error);
    }
    throw error;
  }
}

/**
 * Check if backend API is available
 * @returns {Promise<boolean>} - True if API is available
 */
async function isApiAvailable() {
  try {
    // Try both health endpoints
    try {
      await makeRequest('GET', '/health');
      return true;
    } catch (healthError) {
      // Try the alternative endpoint
      await makeRequest('GET', '/api/health');
      return true;
    }
  } catch (error) {
    if (config.logErrors) {
      console.error('Backend API is not available:', error);
    }
    return false;
  }
}

module.exports = {
  getRelationships,
  createRelationship,
  getNodeTypes,
  createNode,
  updateNode,
  deleteNode,
  isApiAvailable
};