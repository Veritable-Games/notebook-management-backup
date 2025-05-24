/**
 * Obsidian Web Server
 * A lightweight server that serves content directly from an Obsidian vault
 */
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const matter = require('gray-matter'); // For YAML frontmatter parsing
const marked = require('marked');

// Create Express app
const app = express();
const PORT = 8080;

// Configuration
const VAULT_PATH = path.join(__dirname, '../../content-storage/obsidian-vault');
const ATTACHMENTS_DIR = path.join(VAULT_PATH, 'attachments');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ensure vault directory exists
if (!fs.existsSync(VAULT_PATH)) {
  fs.mkdirSync(VAULT_PATH, { recursive: true });
  console.log(`Created vault directory: ${VAULT_PATH}`);
}

// Ensure attachments directory exists
if (!fs.existsSync(ATTACHMENTS_DIR)) {
  fs.mkdirSync(ATTACHMENTS_DIR, { recursive: true });
  console.log(`Created attachments directory: ${ATTACHMENTS_DIR}`);
}

// Root endpoint - serve the web interface
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// API endpoint to get all notes (recursive)
app.get('/api/notes', (req, res) => {
  try {
    // Function to recursively get all markdown files
    const getAllNotes = (dir, baseDir = dir) => {
      let results = [];
      const list = fs.readdirSync(dir);
      
      list.forEach(file => {
        const fullPath = path.join(dir, file);
        const relativePath = path.relative(baseDir, fullPath);
        const stat = fs.statSync(fullPath);
        
        // Skip hidden files and directories (those starting with .)
        if (file.startsWith('.')) {
          return;
        }
        
        if (stat.isDirectory()) {
          // Skip the attachments directory
          if (file === 'attachments') {
            return;
          }
          
          // Add folder with its notes
          const subResults = getAllNotes(fullPath, baseDir);
          if (subResults.length > 0) {
            results.push({
              type: 'folder',
              name: file,
              path: relativePath,
              children: subResults
            });
          }
        } else if (file.endsWith('.md')) {
          // Get note metadata
          const content = fs.readFileSync(fullPath, 'utf8');
          const { data: frontmatter } = matter(content);
          
          results.push({
            type: 'note',
            name: file.replace('.md', ''),
            path: relativePath.replace('.md', ''),
            created: stat.birthtime,
            modified: stat.mtime,
            tags: frontmatter.tags || [],
            size: stat.size
          });
        }
      });
      
      return results;
    };
    
    const notes = getAllNotes(VAULT_PATH);
    
    res.json({ notes });
  } catch (error) {
    console.error('Error reading notes:', error);
    res.status(500).json({ error: 'Failed to read notes' });
  }
});

// API endpoint to get a specific note
app.get('/api/notes/:path(*)', (req, res) => {
  try {
    const notePath = req.params.path;
    const filePath = path.join(VAULT_PATH, `${notePath}.md`);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: markdownContent } = matter(content);
    const stats = fs.statSync(filePath);
    
    // Convert wiki links to HTML links for API consumers
    const processedContent = markdownContent.replace(/\[\[(.*?)\]\]/g, (match, link) => {
      // Handle links with display text: [[link|text]]
      const parts = link.split('|');
      const actualLink = parts[0].trim();
      const displayText = parts.length > 1 ? parts[1].trim() : actualLink;
      
      return `[${displayText}](/${actualLink})`;
    });
    
    // Render to HTML
    const htmlContent = marked.parse(processedContent);
    
    res.json({
      path: notePath,
      title: path.basename(notePath),
      frontmatter,
      content: markdownContent,
      html: htmlContent,
      created: stats.birthtime,
      modified: stats.mtime
    });
  } catch (error) {
    console.error(`Error reading note ${req.params.path}:`, error);
    res.status(500).json({ error: 'Failed to read note' });
  }
});

// API endpoint to create or update a note
app.post('/api/notes/:path(*)', (req, res) => {
  try {
    const notePath = req.params.path;
    const filePath = path.join(VAULT_PATH, `${notePath}.md`);
    
    // Ensure directory exists
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    let content = req.body.content;
    
    // Add frontmatter if provided
    if (req.body.frontmatter) {
      const yaml = matter.stringify('', req.body.frontmatter);
      content = yaml + content;
    }
    
    // Write the file
    fs.writeFileSync(filePath, content);
    
    res.json({ message: 'Note saved successfully' });
  } catch (error) {
    console.error(`Error saving note ${req.params.path}:`, error);
    res.status(500).json({ error: 'Failed to save note' });
  }
});

// API endpoint to delete a note
app.delete('/api/notes/:path(*)', (req, res) => {
  try {
    const notePath = req.params.path;
    const filePath = path.join(VAULT_PATH, `${notePath}.md`);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    fs.unlinkSync(filePath);
    
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error(`Error deleting note ${req.params.path}:`, error);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

// API endpoint to search notes
app.get('/api/search', (req, res) => {
  try {
    const query = req.query.q;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const results = [];
    
    // Function to search files recursively
    const searchFiles = (dir) => {
      const list = fs.readdirSync(dir);
      
      list.forEach(file => {
        const fullPath = path.join(dir, file);
        const relativePath = path.relative(VAULT_PATH, fullPath);
        const stat = fs.statSync(fullPath);
        
        // Skip hidden files and the attachments directory
        if (file.startsWith('.') || file === 'attachments') {
          return;
        }
        
        if (stat.isDirectory()) {
          searchFiles(fullPath);
        } else if (file.endsWith('.md')) {
          const content = fs.readFileSync(fullPath, 'utf8');
          const { data: frontmatter, content: markdownContent } = matter(content);
          
          const title = file.replace('.md', '');
          
          // Search in title, content, and tags
          if (
            title.toLowerCase().includes(query.toLowerCase()) ||
            markdownContent.toLowerCase().includes(query.toLowerCase()) ||
            (frontmatter.tags && frontmatter.tags.some(tag => 
              tag.toLowerCase().includes(query.toLowerCase())
            ))
          ) {
            // Create excerpt
            let excerpt = '';
            const contentLower = markdownContent.toLowerCase();
            const index = contentLower.indexOf(query.toLowerCase());
            
            if (index !== -1) {
              const start = Math.max(0, index - 50);
              const end = Math.min(markdownContent.length, index + query.length + 50);
              excerpt = markdownContent.substring(start, end);
              
              // Add ellipsis if needed
              if (start > 0) excerpt = '...' + excerpt;
              if (end < markdownContent.length) excerpt += '...';
            } else {
              excerpt = markdownContent.substring(0, 100) + '...';
            }
            
            results.push({
              title,
              path: relativePath.replace('.md', ''),
              excerpt,
              tags: frontmatter.tags || [],
              modified: stat.mtime
            });
          }
        }
      });
    };
    
    searchFiles(VAULT_PATH);
    
    res.json({ results, query });
  } catch (error) {
    console.error('Error searching notes:', error);
    res.status(500).json({ error: 'Failed to search notes' });
  }
});

// API endpoint to get backlinks for a note
app.get('/api/backlinks/:path(*)', (req, res) => {
  try {
    const notePath = req.params.path;
    const backlinks = [];
    
    // Function to find backlinks recursively
    const findBacklinks = (dir) => {
      const list = fs.readdirSync(dir);
      
      list.forEach(file => {
        const fullPath = path.join(dir, file);
        const relativePath = path.relative(VAULT_PATH, fullPath);
        const stat = fs.statSync(fullPath);
        
        // Skip hidden files and the attachments directory
        if (file.startsWith('.') || file === 'attachments') {
          return;
        }
        
        if (stat.isDirectory()) {
          findBacklinks(fullPath);
        } else if (file.endsWith('.md')) {
          // Skip the current note
          if (relativePath === `${notePath}.md`) {
            return;
          }
          
          const content = fs.readFileSync(fullPath, 'utf8');
          const noteName = path.basename(notePath);
          
          // Look for links to this note
          // Pattern matches [[NoteName]] or [[Path/To/NoteName]] or [[NoteName|Display Text]]
          const wikiLinkPattern = new RegExp(`\\[\\[(.*?${noteName}.*?)\\]\\]`, 'g');
          
          let match;
          while ((match = wikiLinkPattern.exec(content)) !== null) {
            const linkText = match[1];
            const linkParts = linkText.split('|');
            const linkPath = linkParts[0].trim();
            
            if (linkPath === noteName || linkPath === notePath) {
              const sourcePath = relativePath.replace('.md', '');
              
              // Find the context around this link
              const contextStart = Math.max(0, match.index - 50);
              const contextEnd = Math.min(content.length, match.index + match[0].length + 50);
              let context = content.substring(contextStart, contextEnd);
              
              // Add ellipsis if needed
              if (contextStart > 0) context = '...' + context;
              if (contextEnd < content.length) context += '...';
              
              backlinks.push({
                source: sourcePath,
                sourceTitle: path.basename(sourcePath),
                context
              });
              
              break; // Only count each source file once
            }
          }
        }
      });
    };
    
    findBacklinks(VAULT_PATH);
    
    res.json({ backlinks });
  } catch (error) {
    console.error(`Error finding backlinks for ${req.params.path}:`, error);
    res.status(500).json({ error: 'Failed to find backlinks' });
  }
});

// API endpoint to get graph data
app.get('/api/graph', (req, res) => {
  try {
    const nodes = [];
    const edges = [];
    const nodeMap = {}; // To keep track of nodes we've already added
    
    // Function to process files recursively
    const processFiles = (dir) => {
      const list = fs.readdirSync(dir);
      
      list.forEach(file => {
        const fullPath = path.join(dir, file);
        const relativePath = path.relative(VAULT_PATH, fullPath);
        const stat = fs.statSync(fullPath);
        
        // Skip hidden files and the attachments directory
        if (file.startsWith('.') || file === 'attachments') {
          return;
        }
        
        if (stat.isDirectory()) {
          processFiles(fullPath);
        } else if (file.endsWith('.md')) {
          const content = fs.readFileSync(fullPath, 'utf8');
          const { data: frontmatter } = matter(content);
          const notePath = relativePath.replace('.md', '');
          
          // Add this note as a node
          if (!nodeMap[notePath]) {
            const node = {
              id: notePath,
              label: path.basename(notePath),
              tags: frontmatter.tags || [],
              group: path.dirname(notePath) === '.' ? 'root' : path.dirname(notePath)
            };
            
            nodes.push(node);
            nodeMap[notePath] = true;
          }
          
          // Find outgoing links
          const wikiLinkPattern = /\[\[(.*?)\]\]/g;
          
          let match;
          while ((match = wikiLinkPattern.exec(content)) !== null) {
            const linkText = match[1];
            const linkParts = linkText.split('|');
            const linkPath = linkParts[0].trim();
            
            // Skip links with hashtags (section links)
            if (linkPath.includes('#')) {
              continue;
            }
            
            // Add target node if it doesn't exist
            if (!nodeMap[linkPath]) {
              const node = {
                id: linkPath,
                label: path.basename(linkPath),
                group: path.dirname(linkPath) === '.' ? 'root' : path.dirname(linkPath)
              };
              
              nodes.push(node);
              nodeMap[linkPath] = true;
            }
            
            // Add edge
            edges.push({
              source: notePath,
              target: linkPath
            });
          }
        }
      });
    };
    
    processFiles(VAULT_PATH);
    
    res.json({ nodes, edges });
  } catch (error) {
    console.error('Error generating graph data:', error);
    res.status(500).json({ error: 'Failed to generate graph data' });
  }
});

// API endpoint to list all tags
app.get('/api/tags', (req, res) => {
  try {
    const tags = {};
    
    // Function to process files recursively
    const processFiles = (dir) => {
      const list = fs.readdirSync(dir);
      
      list.forEach(file => {
        const fullPath = path.join(dir, file);
        const relativePath = path.relative(VAULT_PATH, fullPath);
        const stat = fs.statSync(fullPath);
        
        // Skip hidden files and the attachments directory
        if (file.startsWith('.') || file === 'attachments') {
          return;
        }
        
        if (stat.isDirectory()) {
          processFiles(fullPath);
        } else if (file.endsWith('.md')) {
          const content = fs.readFileSync(fullPath, 'utf8');
          const { data: frontmatter } = matter(content);
          
          if (frontmatter.tags && Array.isArray(frontmatter.tags)) {
            frontmatter.tags.forEach(tag => {
              if (!tags[tag]) {
                tags[tag] = [];
              }
              
              tags[tag].push(relativePath.replace('.md', ''));
            });
          }
        }
      });
    };
    
    processFiles(VAULT_PATH);
    
    // Convert to array format
    const tagArray = Object.keys(tags).map(tag => ({
      name: tag,
      count: tags[tag].length,
      notes: tags[tag]
    }));
    
    res.json({ tags: tagArray });
  } catch (error) {
    console.error('Error getting tags:', error);
    res.status(500).json({ error: 'Failed to get tags' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Obsidian Web server running at http://localhost:${PORT}`);
  console.log(`Vault Path: ${VAULT_PATH}`);
});