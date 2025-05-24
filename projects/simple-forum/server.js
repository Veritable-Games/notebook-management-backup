const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static('public'));
app.use(express.json());

// Serve main forum page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API to get notebook files for forum topics
app.get('/api/notebooks', (req, res) => {
    const notebooksPath = '/home/user/Repository/notebooks';
    
    function getFilesRecursively(dir, fileList = []) {
        const files = fs.readdirSync(dir);
        
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
                getFilesRecursively(filePath, fileList);
            } else if (file.endsWith('.txt') || file.endsWith('.md')) {
                const relativePath = path.relative(notebooksPath, filePath);
                const content = fs.readFileSync(filePath, 'utf8');
                
                fileList.push({
                    path: relativePath,
                    name: file,
                    preview: content.substring(0, 200) + '...',
                    size: stat.size,
                    modified: stat.mtime
                });
            }
        });
        
        return fileList;
    }
    
    try {
        const files = getFilesRecursively(notebooksPath);
        res.json(files);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API to get specific file content
app.get('/api/file/*', (req, res) => {
    const filePath = path.join('/home/user/Repository/notebooks', req.params[0]);
    
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const stats = fs.statSync(filePath);
        res.json({ 
            content,
            path: req.params[0],
            name: path.basename(filePath),
            size: stats.size,
            modified: stats.mtime,
            directory: path.dirname(req.params[0])
        });
    } catch (err) {
        res.status(404).json({ error: 'File not found' });
    }
});

// Search API integration
app.get('/api/search', async (req, res) => {
    const { q } = req.query;
    
    if (!q) {
        return res.status(400).json({ error: 'Search query required' });
    }
    
    try {
        // Search in backend API if available
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(`http://repository_backend-api_1:4000/api/v1/search?q=${encodeURIComponent(q)}`);
        if (response.ok) {
            const data = await response.json();
            return res.json(data);
        }
    } catch (err) {
        console.log('Backend API search unavailable, using local search');
    }
    
    // Fallback to local search
    const notebooksPath = '/home/user/Repository/notebooks';
    
    function searchFiles(dir, query, results = []) {
        const files = fs.readdirSync(dir);
        
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
                searchFiles(filePath, query, results);
            } else if (file.endsWith('.txt') || file.endsWith('.md')) {
                const content = fs.readFileSync(filePath, 'utf8');
                const fileName = path.basename(file, path.extname(file));
                
                if (content.toLowerCase().includes(query.toLowerCase()) || 
                    fileName.toLowerCase().includes(query.toLowerCase())) {
                    
                    const relativePath = path.relative(notebooksPath, filePath);
                    
                    // Create excerpt
                    let excerpt = '';
                    const contentLower = content.toLowerCase();
                    const queryLower = query.toLowerCase();
                    const queryIndex = contentLower.indexOf(queryLower);
                    
                    if (queryIndex !== -1) {
                        const startIndex = Math.max(0, queryIndex - 60);
                        const endIndex = Math.min(content.length, queryIndex + query.length + 60);
                        excerpt = content.substring(startIndex, endIndex);
                        if (startIndex > 0) excerpt = '...' + excerpt;
                        if (endIndex < content.length) excerpt = excerpt + '...';
                    } else {
                        excerpt = content.substring(0, 120) + '...';
                    }
                    
                    results.push({
                        title: fileName,
                        path: relativePath,
                        excerpt,
                        type: 'notebook',
                        category: path.dirname(relativePath),
                        lastModified: stat.mtime.toISOString()
                    });
                }
            }
        });
        
        return results;
    }
    
    try {
        const results = searchFiles(notebooksPath, q);
        res.json({
            query: q,
            count: results.length,
            results: results.slice(0, 20)
        });
    } catch (err) {
        res.status(500).json({ error: 'Search failed' });
    }
});

// API to get project file relationships
app.get('/api/projects', (req, res) => {
    const projectsPath = '/home/user/Repository/projects';
    
    try {
        const projects = fs.readdirSync(projectsPath)
            .filter(item => {
                const itemPath = path.join(projectsPath, item);
                return fs.statSync(itemPath).isDirectory() && !item.endsWith('.pid');
            })
            .map(project => {
                const projectPath = path.join(projectsPath, project);
                const stats = fs.statSync(projectPath);
                
                // Check for README or documentation
                let description = 'No description available';
                const readmePath = path.join(projectPath, 'README.md');
                if (fs.existsSync(readmePath)) {
                    const readme = fs.readFileSync(readmePath, 'utf8');
                    description = readme.split('\n')[0].replace(/^#\s*/, '') || readme.substring(0, 100) + '...';
                }
                
                return {
                    name: project,
                    path: project,
                    description,
                    modified: stats.mtime,
                    type: 'project'
                };
            });
            
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 8030;
app.listen(PORT, () => {
    console.log(`Simple forum running on http://localhost:${PORT}`);
});