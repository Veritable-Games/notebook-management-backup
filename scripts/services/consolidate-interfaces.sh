#!/bin/bash

# Consolidate Interfaces Script
# This script simplifies our architecture by eliminating redundant interfaces
# and ensuring that core functionality is properly integrated.

echo "================================================"
echo "CONSOLIDATING KNOWLEDGE CONSTELLATION INTERFACES"
echo "================================================"

# 1. Stop redundant services
echo "Stopping redundant services..."
kill $(cat /home/user/Repository/WebProjects/unified-interface/server.pid 2>/dev/null) 2>/dev/null && echo "Stopped unified interface on port 9001" || echo "Unified interface already stopped"
kill $(cat /home/user/Repository/data/api.pid 2>/dev/null) 2>/dev/null && echo "Stopped relationship API on port 4000" || echo "Relationship API already stopped"

# 2. Create a consolidated configuration
echo "Creating consolidated configuration..."
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

# 3. Copy relationship model and data
echo "Copying relationship model to Constellation Viewer..."
mkdir -p /home/user/Repository/WebProjects/Constellation-Viewer/backend/lib
cp /home/user/Repository/data/lib/relationship-api.js /home/user/Repository/WebProjects/Constellation-Viewer/backend/lib/
cp /home/user/Repository/data/relationships/initial-graph.json /home/user/Repository/WebProjects/Constellation-Viewer/backend/relationships.json

# 4. Integrate the relationship API into the Constellation Viewer
echo "Integrating relationship API into Constellation Viewer backend..."

# 5. Update the server.js file to use the config and handle relationships
cat > /home/user/Repository/WebProjects/Constellation-Viewer/backend/server-integration.js << 'EOL'
// Import the existing server from constellation viewer
const path = require('path');
const fs = require('fs');

// Load configuration
const config = require('./config');

// Import relationship API
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
  
  // Integrate with existing wiki API to create relationships
  const originalPostHandler = app.stack.filter(layer => 
    layer.route && layer.route.path === '/pages' && layer.route.methods.post
  )[0];
  
  if (originalPostHandler) {
    const originalHandler = originalPostHandler.route.stack[0].handle;
    
    // Override the original handler to also create relationship nodes
    originalPostHandler.route.stack[0].handle = (req, res) => {
      // Call the original handler first
      originalHandler(req, res);
      
      // Then create a relationship node if it doesn't exist
      const { title, content, tags } = req.body;
      
      // Create a node ID from the title
      const nodeId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      // Check if node exists
      if (!relationships.getNode(nodeId)) {
        // Create the node
        relationships.addNode({
          id: nodeId,
          title: title,
          type: 'document',
          category: (tags && tags.length > 0) ? tags[0] : 'general',
          size: 1.0
        });
        
        console.log(`Created relationship node for ${title}`);
      }
    };
  }
  
  console.log('Relationship API integration complete');
}

module.exports = {
  integrateRelationshipAPI
};
EOL

# 6. Add relationship visualization to frontend
echo "Adding relationship visualization to frontend..."
mkdir -p /home/user/Repository/WebProjects/Constellation-Viewer/frontend/visualizations

# Copy visualization files
cp /home/user/Repository/data/public/index.html /home/user/Repository/WebProjects/Constellation-Viewer/frontend/visualizations/relationships.html

# 7. Update the main index.html to incorporate relationship visualization
cat > /home/user/Repository/WebProjects/Constellation-Viewer/frontend/unified.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Knowledge Constellation</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #121212;
            color: #e0e0e0;
        }
        
        header {
            background-color: #1e1e1e;
            padding: 1rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        header h1 {
            font-size: 1.8rem;
            margin: 0;
        }
        
        .container {
            display: flex;
            height: calc(100vh - 60px);
        }
        
        .sidebar {
            width: 250px;
            background-color: #1e1e1e;
            padding: 1rem;
            overflow-y: auto;
        }
        
        .sidebar h2 {
            font-size: 1.2rem;
            margin-top: 0;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #333;
        }
        
        .sidebar-menu {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .sidebar-menu a {
            display: block;
            padding: 0.75rem 1rem;
            color: #e0e0e0;
            text-decoration: none;
            border-radius: 4px;
            margin-bottom: 0.5rem;
            transition: background-color 0.2s;
        }
        
        .sidebar-menu a:hover {
            background-color: #2c2c2c;
        }
        
        .sidebar-menu a.active {
            background-color: #2a3749;
            color: #90caf9;
        }
        
        .main-content {
            flex: 1;
            padding: 0;
            overflow: hidden;
        }
        
        .frame-container {
            width: 100%;
            height: 100%;
            border: none;
        }
    </style>
</head>
<body>
    <header>
        <h1>Knowledge Constellation</h1>
        <div class="user-info">
            Unified Knowledge Management
        </div>
    </header>
    
    <div class="container">
        <div class="sidebar">
            <h2>Navigation</h2>
            <ul class="sidebar-menu">
                <li><a href="#wiki" class="nav-link active" data-target="enhanced">Enhanced Wiki</a></li>
                <li><a href="#notebooks" class="nav-link" data-target="simple">Notebook Browser</a></li>
                <li><a href="#visualization" class="nav-link" data-target="relationships">Knowledge Visualization</a></li>
            </ul>
            
            <h2>Quick Actions</h2>
            <ul class="sidebar-menu">
                <li><a href="#new-page" class="action-link" data-action="new-page">Create New Page</a></li>
                <li><a href="#search" class="action-link" data-action="search">Advanced Search</a></li>
                <li><a href="#import" class="action-link" data-action="import">Import Notebook</a></li>
            </ul>
            
            <h2>Recent Pages</h2>
            <div id="recent-pages-list">
                <ul class="sidebar-menu" id="recent-pages">
                    <!-- Populated dynamically -->
                    <li><a href="#loading">Loading...</a></li>
                </ul>
            </div>
        </div>
        
        <div class="main-content">
            <iframe id="content-frame" class="frame-container" src="/enhanced"></iframe>
        </div>
    </div>
    
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const contentFrame = document.getElementById('content-frame');
            const navLinks = document.querySelectorAll('.nav-link');
            const actionLinks = document.querySelectorAll('.action-link');
            
            // Handle navigation
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    
                    // Load the appropriate content
                    const target = link.getAttribute('data-target');
                    contentFrame.src = `/${target}`;
                });
            });
            
            // Handle actions
            actionLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    const action = link.getAttribute('data-action');
                    switch(action) {
                        case 'new-page':
                            contentFrame.src = '/enhanced#new-page';
                            break;
                        case 'search':
                            contentFrame.src = '/enhanced#search';
                            break;
                        case 'import':
                            contentFrame.src = '/simple#import';
                            break;
                    }
                });
            });
            
            // Load recent pages
            fetchRecentPages();
            
            // Function to fetch recent pages
            async function fetchRecentPages() {
                try {
                    const response = await fetch('/pages/recent?limit=5');
                    const data = await response.json();
                    
                    const recentPagesList = document.getElementById('recent-pages');
                    recentPagesList.innerHTML = '';
                    
                    if (data.recentPages && data.recentPages.length > 0) {
                        data.recentPages.forEach(page => {
                            const li = document.createElement('li');
                            const a = document.createElement('a');
                            a.href = `#${page.title}`;
                            a.textContent = page.title;
                            a.addEventListener('click', (e) => {
                                e.preventDefault();
                                contentFrame.src = `/enhanced#${page.title}`;
                            });
                            
                            li.appendChild(a);
                            recentPagesList.appendChild(li);
                        });
                    } else {
                        recentPagesList.innerHTML = '<li><a href="#none">No recent pages</a></li>';
                    }
                } catch (error) {
                    console.error('Error fetching recent pages:', error);
                    const recentPagesList = document.getElementById('recent-pages');
                    recentPagesList.innerHTML = '<li><a href="#error">Error loading pages</a></li>';
                }
            }
        });
    </script>
</body>
</html>
EOL

# 8. Update the main server.js file to integrate with relationship API
cat > /home/user/update-server.js << 'EOL'
const fs = require('fs');
const path = require('path');

// Path to server.js file
const serverPath = '/home/user/Repository/WebProjects/Constellation-Viewer/backend/server.js';

// Read the original file
console.log(`Reading ${serverPath}...`);
const originalContent = fs.readFileSync(serverPath, 'utf8');

// Add imports for relationship integration
const importStatement = "const { integrateRelationshipAPI } = require('./server-integration');";

// Add a line to serve unified.html
const serveStaticLine = "// Add unified interface\napp.get('/unified', (req, res) => {\n  res.sendFile(path.join(__dirname, '../frontend/unified.html'));\n});";

// Add a line to serve visualization
const serveVisualizationLine = "// Add relationship visualization\napp.get('/relationships', (req, res) => {\n  res.sendFile(path.join(__dirname, '../frontend/visualizations/relationships.html'));\n});";

// Add the integration call before the app.listen line
const integrationCall = "// Integrate relationship API\nintegrateRelationshipAPI(app);";

// Modify the server.js file
const modifiedContent = originalContent
  .replace('const express = require(\'express\');', 'const express = require(\'express\');\n' + importStatement)
  .replace('// Add enhanced wiki endpoint', serveStaticLine + '\n\n// Add relationship visualization\n' + serveVisualizationLine + '\n\n// Add enhanced wiki endpoint')
  .replace('app.listen(port, () => {', integrationCall + '\n\napp.listen(port, () => {');

// Backup the original file
fs.writeFileSync(serverPath + '.bak', originalContent);

// Write the modified file
fs.writeFileSync(serverPath, modifiedContent);

console.log(`Successfully updated ${serverPath}`);
console.log(`Original file backed up to ${serverPath}.bak`);
EOL

# Execute the update script
echo "Updating server.js to integrate all components..."
node /home/user/update-server.js

# 9. Create API documentation
echo "Creating API documentation..."
cat > /home/user/Repository/WebProjects/Constellation-Viewer/frontend/api-docs.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Knowledge Constellation API</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #121212;
            color: #e0e0e0;
        }
        
        h1, h2, h3 {
            color: #90caf9;
        }
        
        pre {
            background-color: #1e1e1e;
            padding: 15px;
            border-radius: 4px;
            overflow-x: auto;
        }
        
        code {
            font-family: 'Consolas', 'Monaco', monospace;
        }
        
        .endpoint {
            margin-bottom: 30px;
            border-left: 3px solid #4285f4;
            padding-left: 15px;
        }
        
        .method {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 3px;
            color: white;
            font-weight: bold;
        }
        
        .get { background-color: #4285f4; }
        .post { background-color: #34a853; }
        .put { background-color: #fbbc05; }
        .delete { background-color: #ea4335; }
    </style>
</head>
<body>
    <h1>Knowledge Constellation API</h1>
    
    <section>
        <h2>Introduction</h2>
        <p>
            This API provides access to the Knowledge Constellation system,
            including wiki content, notebooks, and relationships between content items.
        </p>
    </section>
    
    <section>
        <h2>Content API</h2>
        
        <div class="endpoint">
            <h3><span class="method get">GET</span> /pages</h3>
            <p>Get all wiki pages</p>
            <pre><code>{
  "entries": [
    {
      "title": "Home",
      "content": "# Home Page\n\nWelcome to the wiki.",
      "metadata": {
        "created": "2023-04-15T12:00:00Z",
        "modified": "2023-04-17T14:30:00Z",
        "tags": ["home", "wiki"],
        "author": "system"
      }
    },
    // More entries...
  ]
}</code></pre>
        </div>
        
        <div class="endpoint">
            <h3><span class="method get">GET</span> /pages/:title</h3>
            <p>Get a specific wiki page by title</p>
            <pre><code>// With ?detailed=true
{
  "title": "Home",
  "content": "# Home Page\n\nWelcome to the wiki.",
  "metadata": {
    "created": "2023-04-15T12:00:00Z",
    "modified": "2023-04-17T14:30:00Z",
    "tags": ["home", "wiki"],
    "author": "system"
  },
  "history": [
    // Revision history
  ]
}

// Without detailed flag
"# Home Page\n\nWelcome to the wiki."</code></pre>
        </div>
        
        <div class="endpoint">
            <h3><span class="method post">POST</span> /pages</h3>
            <p>Create or update a wiki page</p>
            <pre><code>// Request
{
  "title": "New Page",
  "content": "# New Page\n\nThis is a new page.",
  "notes": "Initial creation",
  "tags": ["new", "documentation"]
}

// Response
"Page saved"</code></pre>
        </div>
        
        <div class="endpoint">
            <h3><span class="method delete">DELETE</span> /pages/:title</h3>
            <p>Delete a wiki page</p>
            <pre><code>// Response
"Page deleted"</code></pre>
        </div>
    </section>
    
    <section>
        <h2>Notebook API</h2>
        
        <div class="endpoint">
            <h3><span class="method get">GET</span> /notebooks</h3>
            <p>Get a list of notebook directories</p>
            <pre><code>{
  "directories": [
    "on-command-wiki-pages",
    "noxii-wiki-pages",
    "reference-wiki-pages"
  ]
}</code></pre>
        </div>
        
        <div class="endpoint">
            <h3><span class="method get">GET</span> /notebooks/:directory</h3>
            <p>Get a list of files in a notebook directory</p>
            <pre><code>{
  "files": [
    "Game_Design.txt",
    "Character_Design.txt"
  ]
}</code></pre>
        </div>
        
        <div class="endpoint">
            <h3><span class="method get">GET</span> /notebooks/:directory/:file</h3>
            <p>Get the content of a notebook file</p>
            <pre><code>// Plain text content of the file
"# Game Design Document\n\n## Core Gameplay Loop\n\n1. Receive mission briefing..."</code></pre>
        </div>
    </section>
    
    <section>
        <h2>Relationship API</h2>
        
        <div class="endpoint">
            <h3><span class="method get">GET</span> /api/v1/relationships</h3>
            <p>Get the entire relationship graph</p>
            <pre><code>{
  "nodes": [
    {
      "id": "home",
      "title": "Home",
      "type": "document",
      "category": "navigation",
      "size": 1.2
    },
    // More nodes...
  ],
  "links": [
    {
      "source": "home",
      "target": "about",
      "type": "references",
      "strength": 0.7
    },
    // More links...
  ]
}</code></pre>
        </div>
        
        <div class="endpoint">
            <h3><span class="method get">GET</span> /api/v1/relationships/node/:id</h3>
            <p>Get a specific node and its connections</p>
            <pre><code>{
  "node": {
    "id": "home",
    "title": "Home",
    "type": "document",
    "category": "navigation",
    "size": 1.2
  },
  "connections": [
    {
      "relationship": {
        "type": "references",
        "strength": 0.7,
        "direction": "outgoing"
      },
      "node": {
        "id": "about",
        "title": "About",
        "type": "document",
        "category": "information",
        "size": 0.9
      }
    },
    // More connections...
  ]
}</code></pre>
        </div>
        
        <div class="endpoint">
            <h3><span class="method post">POST</span> /api/v1/relationships/node</h3>
            <p>Create a new node</p>
            <pre><code>// Request
{
  "id": "new-node",
  "title": "New Node",
  "type": "document",
  "category": "technical",
  "size": 1.0
}

// Response
{
  "message": "Node created successfully",
  "node": {
    "id": "new-node",
    "title": "New Node",
    "type": "document",
    "category": "technical",
    "size": 1.0
  }
}</code></pre>
        </div>
        
        <div class="endpoint">
            <h3><span class="method post">POST</span> /api/v1/relationships/link</h3>
            <p>Create a relationship between nodes</p>
            <pre><code>// Request
{
  "sourceId": "home",
  "targetId": "new-node",
  "type": "contains",
  "strength": 0.8
}

// Response
{
  "message": "Relationship created successfully",
  "relationship": {
    "sourceId": "home",
    "targetId": "new-node",
    "type": "contains",
    "strength": 0.8
  }
}</code></pre>
        </div>
    </section>
</body>
</html>
EOL

# 10. Restart the Constellation Viewer with all integrated features
echo "Restarting Constellation Viewer with integrated features..."
pkill -f "node /home/user/Repository/WebProjects/Constellation-Viewer/backend/server.js" || echo "Constellation Viewer not running"

# Wait a moment
sleep 1

# Start the Constellation Viewer service
cd /home/user/Repository/WebProjects/Constellation-Viewer
node backend/server.js > /home/user/Repository/WebProjects/Constellation-Viewer/backend.log 2>&1 &
CV_PID=$!

# Check if service started correctly
if kill -0 $CV_PID 2>/dev/null; then
  echo "Constellation Viewer restarted successfully with all features integrated"
else
  echo "Failed to restart Constellation Viewer"
fi

# Inform the user
echo "================================================"
echo "CONSOLIDATION COMPLETE"
echo "================================================"
echo "Access the consolidated interface at:"
echo "http://localhost:3003/unified"
echo ""
echo "All features are now accessible from a single interface:"
echo "- Enhanced Wiki"
echo "- Notebook Browser"
echo "- Relationship Visualization"
echo ""
echo "Removed redundant services:"
echo "- Unified Interface (port 9001)"
echo "- Separate Relationship API (port 4000)"
echo "================================================"