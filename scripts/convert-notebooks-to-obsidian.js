/**
 * Notebook to Obsidian Converter
 * 
 * This script converts all notebooks from the notebooks directory
 * into properly formatted markdown files in the Obsidian vault structure.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const NOTEBOOKS_DIR = path.join(__dirname, '../notebooks');
const OBSIDIAN_VAULT = path.join(__dirname, '../projects/content-storage/obsidian-vault');

// Ensure vault directory exists
if (!fs.existsSync(OBSIDIAN_VAULT)) {
  fs.mkdirSync(OBSIDIAN_VAULT, { recursive: true });
  console.log(`Created vault directory: ${OBSIDIAN_VAULT}`);
}

// Ensure attachments directory exists
const ATTACHMENTS_DIR = path.join(OBSIDIAN_VAULT, 'attachments');
if (!fs.existsSync(ATTACHMENTS_DIR)) {
  fs.mkdirSync(ATTACHMENTS_DIR, { recursive: true });
  console.log(`Created attachments directory: ${ATTACHMENTS_DIR}`);
}

/**
 * Detect project type from directory name
 * @param {string} dirName Directory name
 * @returns {string} Project type
 */
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

/**
 * Extract tags from content using simple patterns
 * @param {string} content The markdown content
 * @param {string} projectType The project type (auto-added as a tag)
 * @returns {string[]} Array of extracted tags
 */
function extractTags(content, projectType) {
  const tags = new Set();
  
  // Add project type as a tag
  tags.add(projectType);
  
  // Check for common keywords in content
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
  
  // Look for keywords in content
  const contentLower = content.toLowerCase();
  for (const [keyword, tag] of Object.entries(keywordMap)) {
    if (contentLower.includes(keyword)) {
      tags.add(tag);
    }
  }
  
  // Extract hashtags already in the file
  const hashtagRegex = /#([a-zA-Z0-9_]+)/g;
  let match;
  while ((match = hashtagRegex.exec(content)) !== null) {
    tags.add(match[1]);
  }
  
  return Array.from(tags);
}

/**
 * Convert a file to a proper Obsidian markdown file
 * @param {string} filePath Path to the file
 * @param {string} projectType Project type
 * @returns {Object} Information about the conversion
 */
function convertFile(filePath, projectType) {
  try {
    // Read file content
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract title from filename
    const fileName = path.basename(filePath);
    const title = fileName.replace(/\.txt$|\.md$/, '');
    
    // Extract tags from content
    const tags = extractTags(content, projectType);
    
    // Create frontmatter
    const frontmatter = `---
title: ${title}
tags: [${tags.join(', ')}]
created: ${new Date().toISOString()}
modified: ${new Date().toISOString()}
---\n\n`;
    
    // Add title if not present
    let newContent = content.trim();
    if (!newContent.startsWith('# ')) {
      newContent = `# ${title}\n\n${newContent}`;
    }
    
    // Ensure proper line endings
    newContent = newContent.replace(/\r\n/g, '\n');
    
    // Add the frontmatter
    newContent = frontmatter + newContent;
    
    // Replace any paths or references as needed
    newContent = newContent
      // Convert any unusual link formats to wiki links
      .replace(/\[(.*?)\]\((.*?)\)/g, '[[' + '$1' + ']]');
    
    return {
      content: newContent,
      title,
      tags
    };
  } catch (error) {
    console.error(`Error converting file ${filePath}: ${error.message}`);
    return null;
  }
}

/**
 * Process a notebook directory
 * @param {string} dirPath Path to the notebook directory
 * @param {string} projectType Project type
 * @param {string} targetDir Target directory in the vault
 */
function processDirectory(dirPath, projectType, targetDir) {
  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  // Get all files in the directory
  const files = fs.readdirSync(dirPath);
  
  // Process each file
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      // Process subdirectory
      const subDirName = file.replace(/[^a-zA-Z0-9_-]/g, '_');
      const subTargetDir = path.join(targetDir, subDirName);
      processDirectory(filePath, projectType, subTargetDir);
    } else if (stats.isFile() && (file.endsWith('.txt') || file.endsWith('.md'))) {
      // Convert file
      const result = convertFile(filePath, projectType);
      
      if (result) {
        // Create valid filename
        const safeName = file
          .replace(/\.txt$|\.md$/, '')            // Remove extension
          .replace(/[^a-zA-Z0-9_-]/g, '_')        // Replace special chars
          + '.md';                                 // Add .md extension
        
        // Write to target directory
        const targetPath = path.join(targetDir, safeName);
        fs.writeFileSync(targetPath, result.content);
        
        console.log(`Converted ${filePath} to ${targetPath}`);
      }
    }
  }
}

/**
 * Main function to process all notebooks
 */
function convertAllNotebooks() {
  console.log('Starting notebook conversion to Obsidian format...');
  
  // Get all directories in notebooks
  const notebookDirs = fs.readdirSync(NOTEBOOKS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  for (const dir of notebookDirs) {
    const projectType = detectProjectType(dir);
    console.log(`Processing ${dir} (type: ${projectType})...`);
    
    const dirPath = path.join(NOTEBOOKS_DIR, dir);
    const targetDir = path.join(OBSIDIAN_VAULT, dir.replace(/[^a-zA-Z0-9_-]/g, '_'));
    
    processDirectory(dirPath, projectType, targetDir);
  }
  
  console.log('Conversion complete!');
  console.log(`Obsidian vault is ready at: ${OBSIDIAN_VAULT}`);
  
  // Create Home.md if it doesn't exist
  const homePath = path.join(OBSIDIAN_VAULT, 'Home.md');
  if (!fs.existsSync(homePath)) {
    const homeContent = `---
title: Home
tags: [home, index]
created: ${new Date().toISOString()}
modified: ${new Date().toISOString()}
---

# Welcome to the Obsidian Vault

This vault contains all your converted notebooks.

## Projects

${notebookDirs.map(dir => `- [[${dir.replace(/[^a-zA-Z0-9_-]/g, '_')}/README|${dir}]]`).join('\n')}

## Tags

- #wiki
- #game
- #document
- #reference
- #notes
`;
    
    fs.writeFileSync(homePath, homeContent);
    console.log(`Created Home.md in vault.`);
  }
}

// Run the converter
convertAllNotebooks();