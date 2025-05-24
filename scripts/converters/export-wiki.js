/**
 * Simple ZIM Wiki Export Tool
 * 
 * This script exports ZIM wiki content to plain text or markdown files
 * without dependencies on the original wiki structure.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const SOURCE_DIR = '/home/user/Repository/Notebooks';
const OUTPUT_DIR = '/home/user/Repository/ExportedWiki';
const FORMAT = 'markdown'; // 'markdown' or 'plaintext'

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Recursively process all directories
processDirectory(SOURCE_DIR);

/**
 * Process a directory and all its subdirectories
 */
function processDirectory(dirPath) {
  console.log(`Processing directory: ${dirPath}`);
  
  try {
    // Read directory contents
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stats = fs.statSync(itemPath);
      
      if (stats.isDirectory()) {
        // Process subdirectory
        processDirectory(itemPath);
      } else if (stats.isFile() && item.endsWith('.txt')) {
        // Process text file
        processFile(itemPath);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error);
  }
}

/**
 * Process a single file
 */
function processFile(filePath) {
  console.log(`Processing file: ${filePath}`);
  
  try {
    // Read file contents
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it's a ZIM wiki file
    if (content.includes('Content-Type: text/x-zim-wiki')) {
      // Process the content
      const processedContent = cleanWikiContent(content);
      
      // Create output path
      const relativePath = path.relative(SOURCE_DIR, filePath);
      const outputPath = path.join(OUTPUT_DIR, relativePath);
      
      // Create directory if it doesn't exist
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      // Adjust output filename
      let finalOutputPath = outputPath;
      if (FORMAT === 'markdown') {
        finalOutputPath = outputPath.replace(/\.txt$/, '.md');
      }
      
      // Write the processed content
      fs.writeFileSync(finalOutputPath, processedContent);
      console.log(`Exported to: ${finalOutputPath}`);
    } else {
      console.log(`Skipping non-ZIM file: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
  }
}

/**
 * Clean up ZIM wiki content
 */
function cleanWikiContent(content) {
  // Remove ZIM headers
  let cleaned = content
    .replace(/Content-Type: text\/x-zim-wiki\s*/g, '')
    .replace(/Wiki-Format: zim \d\.\d\s*/g, '')
    .replace(/Creation-Date: [^\n]*\s*/g, '')
    .trim();
  
  if (FORMAT === 'markdown') {
    // Convert ZIM wiki formatting to Markdown
    cleaned = cleaned
      // Headers
      .replace(/====== ([^=]+) ======/g, '# $1')
      .replace(/===== ([^=]+) =====/g, '## $1')
      .replace(/==== ([^=]+) ====/g, '### $1')
      .replace(/=== ([^=]+) ===/g, '#### $1')
      .replace(/== ([^=]+) ==/g, '##### $1')
      
      // Bold and italic
      .replace(/\*\*([^*]+)\*\*/g, '**$1**')
      .replace(/\/\/([^/]+)\/\//g, '*$1*')
      
      // Lists
      .replace(/^\* /gm, '- ')
      
      // Link syntax - preserve wiki links for now
      .replace(/\[\[([^\]|:]+)\]\]/g, '[[$1]]')
      .replace(/\[\[([^\]|:]+)\|([^\]]+)\]\]/g, '[[${1}|$2]]');
  }
  
  return cleaned;
}

console.log('Export completed!');