/**
 * Notebook to Wiki Importer
 * 
 * This script automatically imports notebooks from the notebook directory
 * into the Constellation Viewer wiki, with automatic tagging and relationship creation.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

// Configuration
const NOTEBOOKS_DIR = '/home/user/Repository/notebooks';
const WIKI_DATA_DIR = '/home/user/Repository/data/wiki';  // Centralized data directory
const WIKI_SERVER = 'http://localhost:8081';
const RELATIONSHIP_API = 'http://localhost:4000';

// Ensure directories exist
if (!fs.existsSync(NOTEBOOKS_DIR)) {
  fs.mkdirSync(NOTEBOOKS_DIR, { recursive: true });
  console.log(`Created notebooks directory: ${NOTEBOOKS_DIR}`);
}

if (!fs.existsSync('/home/user/Repository/projects/constellation-viewer/data')) {
  fs.mkdirSync('/home/user/Repository/projects/constellation-viewer/data', { recursive: true });
  console.log(`Created constellation viewer data directory`);
}

// Ensure wiki data directory exists
if (!fs.existsSync(WIKI_DATA_DIR)) {
  fs.mkdirSync(WIKI_DATA_DIR, { recursive: true });
}

// Helper function to make API requests
async function makeApiRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(url, options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(responseData));
          } catch (e) {
            resolve(responseData);
          }
        } else {
          reject(new Error(`API request failed with status ${res.statusCode}: ${responseData}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Function to create a wiki page from a notebook file
async function createWikiPage(notebookPath, content, projectType) {
  // Extract info from path
  const relativePath = path.relative(NOTEBOOKS_DIR, notebookPath);
  const pathParts = relativePath.split(path.sep);
  const fileName = path.basename(notebookPath);
  const dirName = pathParts[0];
  
  // Replace file extension
  const title = fileName.replace(/\.(md|txt)$/, '');
  const safeTitle = title.replace(/[^a-zA-Z0-9_-]/g, '_');
  
  // Generate automatic tags
  const tags = [];
  
  // Add project type tag
  tags.push(projectType);
  
  // Add parent directory as a tag
  tags.push(dirName.replace(/[^a-zA-Z0-9_-]/g, '_'));
  
  // Look for common keywords in content
  const keywordMap = {
    "character": "character-design",
    "dialogue": "dialogue",
    "item": "item",
    "weapon": "weapon",
    "location": "location",
    "story": "story",
    "quest": "quest",
    "feature": "feature",
    "gameplay": "gameplay",
    "mechanic": "mechanic",
    "bug": "bug",
    "fix": "fix"
  };
  
  // Check content for keywords and add relevant tags
  const contentLower = content.toLowerCase();
  for (const [keyword, tag] of Object.entries(keywordMap)) {
    if (contentLower.includes(keyword)) {
      tags.push(tag);
    }
  }
  
  // Prepare page data
  const timestamp = new Date().toISOString();
  const pageData = {
    title: safeTitle,
    content: `# ${title}\n\n${content}\n\n## Metadata\n- **Source**: ${relativePath}\n- **Type**: ${projectType}\n- **Tags**: ${tags.join(', ')}\n- **Imported**: ${timestamp}`,
    source: {
      type: 'notebook',
      path: relativePath,
      importedAt: timestamp
    },
    created: timestamp,
    modified: timestamp,
    tags: tags
  };
  
  // Write to wiki data directory
  const pageFilePath = path.join(WIKI_DATA_DIR, `${safeTitle}.json`);
  fs.writeFileSync(pageFilePath, JSON.stringify(pageData, null, 2));
  
  console.log(`Created wiki page: ${safeTitle} from ${relativePath}`);
  
  // Create node in relationship API
  try {
    const nodeData = {
      id: safeTitle,
      title: safeTitle,
      type: "wiki_page",
      category: projectType,
      tags: tags,
      size: 1.2
    };
    
    await makeApiRequest(`${RELATIONSHIP_API}/api/v1/relationships/node`, 'POST', nodeData);
    console.log(`Created relationship node for: ${safeTitle}`);
    
    return {
      title: safeTitle,
      tags: tags,
      projectType: projectType
    };
  } catch (error) {
    console.error(`Failed to create relationship node: ${error.message}`);
  }
}

// Function to create relationships between pages
async function createRelationships(pages) {
  // Create relationships based on shared tags
  const tagMap = {};
  
  // Build map of tags to pages
  pages.forEach(page => {
    page.tags.forEach(tag => {
      if (!tagMap[tag]) {
        tagMap[tag] = [];
      }
      tagMap[tag].push(page.title);
    });
  });
  
  // Create relationships for pages with shared tags
  const relationships = [];
  const processedRelationships = new Set(); // Track already processed relationships
  
  // Limit the number of relationships per tag to prevent excessive connections
  const MAX_RELATIONSHIPS_PER_TAG = 5; // Reduced from 10 to 5 to limit overall relationships
  
  for (const [tag, pageTitles] of Object.entries(tagMap)) {
    // Only create relationships if multiple pages share the tag
    // And limit to certain high-value tags to reduce noise
    if (pageTitles.length > 1 && pageTitles.length < 20) { // Skip extremely common tags
      // Sort titles for consistent relationship creation and to prioritize shorter names
      const sortedTitles = [...pageTitles].sort((a, b) => a.length - b.length);
      
      // For large tag groups, only connect a limited subset
      const MAX_TITLES_TO_PROCESS = 10; // Only process the first 10 titles
      const titlesToProcess = sortedTitles.slice(0, MAX_TITLES_TO_PROCESS);
      
      // Each page will connect to at most 2 other pages
      const maxConnectionsPerPage = 2;
      let relationshipsForTag = 0;
      
      for (let i = 0; i < titlesToProcess.length && relationshipsForTag < MAX_RELATIONSHIPS_PER_TAG; i++) {
        // Connect to the next few pages only
        const connectTo = [];
        for (let j = 1; j <= maxConnectionsPerPage && i + j < titlesToProcess.length; j++) {
          connectTo.push(titlesToProcess[i + j]);
        }
        
        for (const targetTitle of connectTo) {
          if (relationshipsForTag >= MAX_RELATIONSHIPS_PER_TAG) break;
          
          // Create a unique identifier for this relationship pair
          const relPair = [titlesToProcess[i], targetTitle].sort().join('::');
          
          // Skip if we've already processed this relationship
          if (processedRelationships.has(relPair)) {
            continue;
          }
          
          // Add to processed set immediately to prevent duplicates
          processedRelationships.add(relPair);
          
          try {
            const relationship = {
              sourceId: titlesToProcess[i],
              targetId: targetTitle,
              type: "related_by",
              strength: 0.5
            };
            
            try {
              await makeApiRequest(`${RELATIONSHIP_API}/api/v1/relationships/link`, 'POST', relationship);
              console.log(`Created relationship: ${titlesToProcess[i]} <-> ${targetTitle} (related_by: ${tag})`);
              relationships.push(relationship);
              relationshipsForTag++;
            } catch (error) {
              // Silently continue if it's a duplicate relationship
              if (!error.message.includes("already exists") && !error.message.includes("409")) {
                console.error(`Failed to create relationship: ${error.message}`);
              }
            }
          } catch (error) {
            // Only log serious errors
            if (!error.message.includes("already exists") && !error.message.includes("409")) {
              console.error(`Error creating relationship: ${error.message}`);
            }
          }
        }
      }
    }
  }
  
  // Create relationships based on project types
  const projectMap = {};
  
  // Build map of project types to pages
  pages.forEach(page => {
    if (!projectMap[page.projectType]) {
      projectMap[page.projectType] = [];
    }
    projectMap[page.projectType].push(page.title);
  });
  
  // Create project relationships
  for (const [projectType, pageTitles] of Object.entries(projectMap)) {
    if (pageTitles.length > 1) {
      // Find first page to serve as the project root - prefer shorter names
      const projectRoot = [...pageTitles].sort((a, b) => a.length - b.length)[0];
      
      // Create a project node if it doesn't exist already
      const projectNodeId = `project_${projectType}`;
      try {
        const projectNode = {
          id: projectNodeId,
          title: `${projectType.charAt(0).toUpperCase() + projectType.slice(1)} Project`,
          type: "category",
          category: "project",
          tags: [projectType],
          size: 2.0
        };
        
        try {
          await makeApiRequest(`${RELATIONSHIP_API}/api/v1/relationships/node`, 'POST', projectNode);
          console.log(`Created project node: ${projectNodeId}`);
        } catch (error) {
          // Ignore if node already exists
          if (!error.message.includes("already exist")) {
            console.error(`Failed to create project node: ${error.message}`);
          }
        }
        
        // Limit the number of connections to prevent excessive relationships
        const MAX_PROJECT_CONNECTIONS = 10; // Reduced from 20
        const limitedTitles = pageTitles.length > MAX_PROJECT_CONNECTIONS 
          ? pageTitles.slice(0, MAX_PROJECT_CONNECTIONS) 
          : pageTitles;
        
        // Connect project node to pages
        for (let i = 0; i < limitedTitles.length; i++) {
          // Create unique ID for this relationship
          const relPair = [projectNodeId, limitedTitles[i]].sort().join('::');
          
          // Skip if already processed
          if (processedRelationships.has(relPair)) {
            continue;
          }
          
          // Add to processed set immediately
          processedRelationships.add(relPair);
          
          const relationship = {
            sourceId: projectNodeId,
            targetId: limitedTitles[i],
            type: "contains",
            strength: 0.8
          };
          
          try {
            await makeApiRequest(`${RELATIONSHIP_API}/api/v1/relationships/link`, 'POST', relationship);
            console.log(`Created relationship: ${projectNodeId} -> ${limitedTitles[i]} (contains)`);
            relationships.push(relationship);
          } catch (error) {
            // Silently continue if it's a duplicate relationship
            if (!error.message.includes("already exists") && !error.message.includes("409")) {
              console.error(`Failed to create relationship: ${error.message}`);
            }
          }
        }
      } catch (error) {
        console.error(`Error creating project relationships: ${error.message}`);
      }
    }
  }
  
  return relationships;
}

// Function to detect project type from directory name
function detectProjectType(dirName) {
  const dirLower = dirName.toLowerCase();
  
  if (dirLower.includes('wiki')) {
    return 'wiki';
  } else if (dirLower.includes('game')) {
    return 'game';
  } else if (dirLower.includes('command')) {
    return 'command';
  } else if (dirLower.includes('reference')) {
    return 'reference';
  } else if (dirLower.includes('confusion')) {
    return 'notes';
  } else {
    return 'document';
  }
}

// Main function to process all notebook directories
async function importNotebooks() {
  console.log('Starting notebook import...');
  
  // Get all directories in notebooks
  const notebookDirs = fs.readdirSync(NOTEBOOKS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  const pagePromises = [];
  
  // Process each directory
  for (const dir of notebookDirs) {
    const projectType = detectProjectType(dir);
    console.log(`Processing ${dir} (type: ${projectType})...`);
    
    const dirPath = path.join(NOTEBOOKS_DIR, dir);
    
    // Get all files recursively
    const processDirectory = async (currentPath, parentDir) => {
      const files = fs.readdirSync(currentPath, { withFileTypes: true });
      const folderPromises = [];
      
      for (const file of files) {
        const fullPath = path.join(currentPath, file.name);
        
        if (file.isDirectory()) {
          // Process subdirectory
          folderPromises.push(processDirectory(fullPath, path.join(parentDir, file.name)));
        } else if (file.isFile() && (file.name.endsWith('.md') || file.name.endsWith('.txt'))) {
          // Process file
          try {
            const content = fs.readFileSync(fullPath, 'utf8');
            const pagePromise = createWikiPage(fullPath, content, projectType);
            folderPromises.push(pagePromise);
          } catch (error) {
            console.error(`Error processing ${fullPath}: ${error.message}`);
          }
        }
      }
      
      // Wait for all files in this directory to be processed
      return Promise.all(folderPromises);
    };
    
    // Add this directory's processing promise to the main list
    pagePromises.push(processDirectory(dirPath, dir));
  }
  
  try {
    // Wait for all directories to be processed
    const results = await Promise.all(pagePromises);
    
    // Flatten results and filter out undefined values
    const allPages = results.flat().filter(page => page);
    
    console.log(`All pages created. Creating relationships for ${allPages.length} pages...`);
    
    // Create relationships between pages
    const relationships = await createRelationships(allPages);
    
    console.log(`Import complete! Created ${allPages.length} wiki pages and ${relationships.length} relationships.`);
  } catch (error) {
    console.error(`Error during import: ${error.message}`);
  }
}

// Run the importer
importNotebooks().catch(error => {
  console.error(`Fatal error during notebook import: ${error.message}`);
});