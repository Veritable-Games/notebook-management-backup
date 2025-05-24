const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8081; // Using port 8081 as specified in our scripts

// Import relationship client for backend-api integration
const relationshipClient = require('./relationship-client');

// Central logging setup
const logDirectory = path.join(__dirname, '../../../projects/logs');
const logFile = path.join(logDirectory, 'constellation-viewer.log');

// Ensure log directory exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

// Logging function
function logMessage(level, message, data = null) {
  const timestamp = new Date().toISOString();
  const formattedMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  
  // Log to console
  console.log(formattedMessage);
  
  // Log to file
  try {
    const logEntry = data 
      ? `${formattedMessage}\n${JSON.stringify(data, null, 2)}\n` 
      : `${formattedMessage}\n`;
    
    fs.appendFileSync(logFile, logEntry);
  } catch (error) {
    console.error(`Failed to write to log file: ${error.message}`);
  }
}

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const originalEnd = res.end;
  
  // Capture response for logging
  res.end = function(chunk, encoding) {
    const responseTime = Date.now() - start;
    const status = res.statusCode;
    
    logMessage('info', `${req.method} ${req.originalUrl || req.url} ${status} ${responseTime}ms`);
    
    return originalEnd.apply(res, arguments);
  };
  
  next();
});

// CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Path to the wiki data directory
// Use centralized data structure
const wikiDataPath = path.join(__dirname, '../../../data/wiki');
const notebooksPath = path.join(__dirname, '../../../../Notebooks');

// Ensure wiki data directory exists
if (!fs.existsSync(wikiDataPath)) {
  fs.mkdirSync(wikiDataPath, { recursive: true });
}

// Root endpoint - redirect to wiki
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/wiki.html'));
});

// Legacy endpoints for backward compatibility (redirect to new interface)
app.get('/basic', (req, res) => {
  res.redirect('/');
});

app.get('/unified', (req, res) => {
  res.redirect('/');
});

// For visualization page, keep it available
app.get('/relationships', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/visualizations/relationships.html'));
});

// API endpoint to get all wiki pages
app.get('/api/pages', (req, res) => {
  try {
    if (!fs.existsSync(wikiDataPath)) {
      return res.json({ pages: [] });
    }
    
    const files = fs.readdirSync(wikiDataPath)
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''));
    
    res.json({ pages: files });
  } catch (error) {
    console.error('Error reading wiki pages:', error);
    res.status(500).json({ error: 'Failed to read wiki pages' });
  }
});

// API endpoint to get a specific wiki page
app.get('/api/pages/:title', (req, res) => {
  try {
    const title = req.params.title;
    const filePath = path.join(wikiDataPath, `${title}.json`);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Page not found' });
    }
    
    const pageData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.json(pageData);
  } catch (error) {
    console.error(`Error reading wiki page ${req.params.title}:`, error);
    res.status(500).json({ error: 'Failed to read wiki page' });
  }
});

// API endpoint to create or update a wiki page
app.post('/api/pages/:title', (req, res) => {
  try {
    const title = req.params.title;
    const filePath = path.join(wikiDataPath, `${title}.json`);
    
    // Get the current time
    const timestamp = new Date().toISOString();
    
    // Create page data with timestamps
    let pageData = {
      title: title,
      content: req.body.content || '',
      created: timestamp,
      modified: timestamp
    };
    
    // If page exists, update it but keep creation date
    if (fs.existsSync(filePath)) {
      const existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      pageData.created = existingData.created;
      pageData.modified = timestamp;
    }
    
    // Write the page data to a file
    fs.writeFileSync(filePath, JSON.stringify(pageData, null, 2));
    
    res.json({ message: 'Page saved successfully' });
  } catch (error) {
    console.error(`Error saving wiki page ${req.params.title}:`, error);
    res.status(500).json({ error: 'Failed to save wiki page' });
  }
});

// API endpoint to delete a wiki page
app.delete('/api/pages/:title', (req, res) => {
  try {
    const title = req.params.title;
    const filePath = path.join(wikiDataPath, `${title}.json`);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Page not found' });
    }
    
    fs.unlinkSync(filePath);
    res.json({ message: 'Page deleted successfully' });
  } catch (error) {
    console.error(`Error deleting wiki page ${req.params.title}:`, error);
    res.status(500).json({ error: 'Failed to delete wiki page' });
  }
});

// API endpoint to search wiki content
app.get('/api/search', (req, res) => {
  try {
    const query = req.query.q;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const results = [];
    
    if (!fs.existsSync(wikiDataPath)) {
      return res.json({ results, query });
    }
    
    // Get all pages
    const files = fs.readdirSync(wikiDataPath)
      .filter(file => file.endsWith('.json'));
    
    // Search in each page
    for (const file of files) {
      const filePath = path.join(wikiDataPath, file);
      const pageData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const title = pageData.title;
      const content = pageData.content;
      
      // Check for query in title or content
      if (title.toLowerCase().includes(query.toLowerCase()) || 
          content.toLowerCase().includes(query.toLowerCase())) {
        
        // Create excerpt
        let excerpt = '';
        const contentLower = content.toLowerCase();
        const index = contentLower.indexOf(query.toLowerCase());
        
        if (index !== -1) {
          const start = Math.max(0, index - 50);
          const end = Math.min(content.length, index + query.length + 50);
          excerpt = content.substring(start, end);
          
          // Add ellipsis if needed
          if (start > 0) excerpt = '...' + excerpt;
          if (end < content.length) excerpt += '...';
        } else {
          excerpt = content.substring(0, 100) + '...';
        }
        
        results.push({
          title,
          excerpt,
          modified: pageData.modified,
          created: pageData.created
        });
      }
    }
    
    res.json({ results, query });
  } catch (error) {
    console.error('Error searching wiki:', error);
    res.status(500).json({ error: 'Failed to search wiki' });
  }
});

// API endpoint to get all notebooks
app.get('/api/notebooks', (req, res) => {
  try {
    if (!fs.existsSync(notebooksPath)) {
      return res.status(404).json({ error: 'Notebooks directory not found' });
    }
    
    const directories = fs.readdirSync(notebooksPath)
      .filter(item => {
        try {
          return fs.statSync(path.join(notebooksPath, item)).isDirectory();
        } catch (err) {
          return false;
        }
      });
    
    res.json({ directories });
  } catch (error) {
    console.error('Error reading notebooks directory:', error);
    res.status(500).json({ error: 'Failed to read notebooks directory' });
  }
});

// API endpoint to get all files in a notebook
app.get('/api/notebooks/:directory', (req, res) => {
  try {
    const dirPath = path.join(notebooksPath, req.params.directory);
    
    if (!fs.existsSync(dirPath)) {
      return res.status(404).json({ error: 'Directory not found' });
    }
    
    const files = fs.readdirSync(dirPath)
      .filter(item => {
        try {
          const itemPath = path.join(dirPath, item);
          return fs.statSync(itemPath).isFile() && 
                (item.endsWith('.txt') || item.endsWith('.md'));
        } catch (err) {
          return false;
        }
      });
    
    res.json({ files });
  } catch (error) {
    console.error('Error reading directory:', error);
    res.status(500).json({ error: 'Failed to read directory' });
  }
});

// API endpoint to get the content of a notebook file
app.get('/api/notebooks/:directory/:file', (req, res) => {
  try {
    const filePath = path.join(notebooksPath, req.params.directory, req.params.file);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    res.send(content);
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).send('Failed to read file');
  }
});

// API endpoint to convert notebook to wiki page
app.post('/api/notebooks/:directory/:file/convert', (req, res) => {
  try {
    const filePath = path.join(notebooksPath, req.params.directory, req.params.file);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Create page title from filename
    const title = req.params.file.replace(/\.(txt|md)$/, '');
    const timestamp = new Date().toISOString();
    
    // Create page data
    const pageData = {
      title: title,
      content: content,
      source: {
        type: 'notebook',
        directory: req.params.directory,
        file: req.params.file,
        importedAt: timestamp
      },
      created: timestamp,
      modified: timestamp
    };
    
    // Write the page
    const pageFilePath = path.join(wikiDataPath, `${title}.json`);
    fs.writeFileSync(pageFilePath, JSON.stringify(pageData, null, 2));
    
    // Add to relationship database
    try {
      relationshipClient.createNode('wiki_page', {
        title: title,
        path: pageFilePath,
        createdAt: timestamp,
        source: 'notebook'
      }, title);
      
      // Create relationship to source notebook
      relationshipClient.createRelationship(
        title,
        `notebook:${req.params.directory}/${req.params.file}`,
        'converted_from'
      );
      
      logMessage('info', `Created relationship for converted wiki page`, {
        pageTitle: title,
        notebookSource: `${req.params.directory}/${req.params.file}`
      });
    } catch (relError) {
      // Non-blocking: log error but don't fail the API call
      logMessage('error', `Failed to create relationship for converted wiki page`, {
        error: relError.message,
        pageTitle: title,
        notebookSource: `${req.params.directory}/${req.params.file}`
      });
    }
    
    res.json({ message: 'Notebook converted to wiki page successfully', title });
  } catch (error) {
    logMessage('error', `Error converting notebook to wiki page`, { error: error.message });
    res.status(500).json({ error: 'Failed to convert notebook to wiki page' });
  }
});

// Relationship API endpoints
app.get('/api/relationships/check', async (req, res) => {
  try {
    // For now, hardcode availability to true while we develop the feature
    // This will allow the frontend to show relationship visualizations
    // const isAvailable = await relationshipClient.isApiAvailable();
    const isAvailable = true;
    res.json({ available: isAvailable });
  } catch (error) {
    logMessage('error', 'Error checking relationship API availability', { error: error.message });
    res.status(500).json({ error: 'Failed to check relationship API availability' });
  }
});

// Get relationships for a wiki page
app.get('/api/relationships/page/:title', async (req, res) => {
  try {
    const title = req.params.title;

    // Mock relationship data for development
    // This creates a visualization showing connections between documents
    const mockNodes = [];
    const mockEdges = [];

    // Add the central node
    mockNodes.push({
      id: title,
      label: title,
      type: 'wiki_page',
      tags: ['document']
    });

    // Add related notebook documents
    if (title.includes("GDD") || title.includes("game")) {
      // For game design documents, create related game elements
      const gameElements = [
        { id: `${title}-characters`, label: "Characters", type: "category", tags: ["character-design"] },
        { id: `${title}-mechanics`, label: "Game Mechanics", type: "category", tags: ["mechanic"] },
        { id: `${title}-setting`, label: "Setting", type: "category", tags: ["location"] },
        { id: `${title}-items`, label: "Items", type: "category", tags: ["item"] }
      ];

      mockNodes.push(...gameElements);

      // Connect game elements to the central node
      gameElements.forEach(element => {
        mockEdges.push({
          source: title,
          target: element.id,
          type: "contains"
        });
      });

      // Add some specific documents based on what's in your notebooks
      if (title.includes("On_Command")) {
        // Add On Command related documents
        const relatedDocs = [
          { id: "HSE_Suit", label: "HSE Suit", type: "wiki_page", tags: ["item"] },
          { id: "navigation-terminal", label: "Navigation Terminal", type: "wiki_page", tags: ["mechanic"] },
          { id: "nanites", label: "Nanites", type: "wiki_page", tags: ["item"] },
          { id: "web-of-hierarchical-structures", label: "Hierarchical Structures", type: "notebook", tags: ["story"] }
        ];

        mockNodes.push(...relatedDocs);

        // Connect to appropriate categories
        mockEdges.push(
          { source: `${title}-items`, target: "HSE_Suit", type: "contains" },
          { source: `${title}-mechanics`, target: "navigation-terminal", type: "implements" },
          { source: `${title}-items`, target: "nanites", type: "contains" },
          { source: title, target: "web-of-hierarchical-structures", type: "inspired_by" }
        );
      }

      if (title.includes("Noxii")) {
        // Add Noxii related documents
        const relatedDocs = [
          { id: "cauterizing-suit", label: "Cauterizing Suit", type: "wiki_page", tags: ["item"] },
          { id: "something-random", label: "Consciousness Thoughts", type: "notebook", tags: ["story"] }
        ];

        mockNodes.push(...relatedDocs);

        // Connect to appropriate categories
        mockEdges.push(
          { source: `${title}-items`, target: "cauterizing-suit", type: "contains" },
          { source: title, target: "something-random", type: "inspired_by" }
        );
      }
    } else if (title.includes("bio") || title.includes("random")) {
      // For philosophical documents, create thought connections
      const philosophicalConcepts = [
        { id: "consciousness", label: "Consciousness", type: "category", tags: ["concept"] },
        { id: "boundaries", label: "Boundaries", type: "category", tags: ["concept"] },
        { id: "intelligence", label: "Intelligence", type: "category", tags: ["concept"] }
      ];

      mockNodes.push(...philosophicalConcepts);

      // Connect concepts to the central node
      philosophicalConcepts.forEach(concept => {
        mockEdges.push({
          source: title,
          target: concept.id,
          type: "explores"
        });
      });

      // Add connections to game projects
      const gameProjects = [
        { id: "On_Command_GDD", label: "On Command GDD", type: "wiki_page", tags: ["game"] },
        { id: "Noxii_-_Pitch", label: "Noxii Pitch", type: "wiki_page", tags: ["game"] }
      ];

      mockNodes.push(...gameProjects);

      // Create connections between philosophical docs and games
      gameProjects.forEach(game => {
        mockEdges.push({
          source: game.id,
          target: title,
          type: "inspired_by"
        });
      });
    } else {
      // General case for other documents
      // Add 3-5 random connections to other documents
      const noteTypes = ['document', 'reference', 'notes'];

      for (let i = 0; i < 4; i++) {
        const nodeId = `related-doc-${i}`;
        const nodeType = noteTypes[Math.floor(Math.random() * noteTypes.length)];

        mockNodes.push({
          id: nodeId,
          label: `Related Document ${i+1}`,
          type: 'notebook',
          tags: [nodeType]
        });

        mockEdges.push({
          source: title,
          target: nodeId,
          type: Math.random() > 0.5 ? "references" : "related_to"
        });
      }
    }

    const relationships = {
      nodes: mockNodes,
      edges: mockEdges
    };

    res.json(relationships);
  } catch (error) {
    logMessage('error', `Error getting relationships for page ${req.params.title}`, { error: error.message });
    res.status(500).json({ error: 'Failed to get relationships' });
  }
});

// Create relationship between wiki pages
app.post('/api/relationships', async (req, res) => {
  try {
    const { sourceTitle, targetTitle, relationshipType } = req.body;
    
    if (!sourceTitle || !targetTitle || !relationshipType) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    // Verify both pages exist
    const sourcePath = path.join(wikiDataPath, `${sourceTitle}.json`);
    const targetPath = path.join(wikiDataPath, `${targetTitle}.json`);
    
    if (!fs.existsSync(sourcePath)) {
      return res.status(404).json({ error: `Source page "${sourceTitle}" not found` });
    }
    
    if (!fs.existsSync(targetPath)) {
      return res.status(404).json({ error: `Target page "${targetTitle}" not found` });
    }
    
    // Create relationship
    const relationship = await relationshipClient.createRelationship(
      sourceTitle,
      targetTitle,
      relationshipType
    );
    
    logMessage('info', `Created relationship between wiki pages`, {
      source: sourceTitle,
      target: targetTitle,
      type: relationshipType
    });
    
    res.json(relationship);
  } catch (error) {
    logMessage('error', 'Error creating relationship', { error: error.message });
    res.status(500).json({ error: 'Failed to create relationship' });
  }
});

// Start the server
app.listen(port, () => {
  logMessage('info', `Wiki server running at http://localhost:${port}`);
  logMessage('info', `API available at http://localhost:${port}/api`);
  logMessage('info', `Data directory: ${wikiDataPath}`);
  logMessage('info', `Notebooks directory: ${notebooksPath}`);
  logMessage('info', `Access the wiki interface at http://localhost:${port}/`);
});