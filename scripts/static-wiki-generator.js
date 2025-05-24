/**
 * Static Wiki Generator
 * 
 * A simple script that converts notebooks into a static HTML wiki site.
 * No server, no database, just plain HTML files that can be opened in any browser.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const NOTEBOOKS_DIR = path.join(__dirname, '../notebooks');
const OUTPUT_DIR = path.join(__dirname, '../static-wiki');
const ASSETS_DIR = path.join(OUTPUT_DIR, 'assets');
const PAGES_DIR = path.join(OUTPUT_DIR, 'pages');

// Ensure directories exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

if (!fs.existsSync(PAGES_DIR)) {
  fs.mkdirSync(PAGES_DIR, { recursive: true });
}

// Global data structures
const allPages = new Map(); // Map of slug -> page data
const allTags = new Map();  // Map of tag -> array of pages
const allCategories = new Map(); // Map of category -> array of pages
const allLinks = new Map(); // Map of page -> array of outbound links

// Helper: Create a slug from a title
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\\n/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/^\\d+/, '');
}

// Helper: Extract title from a file name
function extractTitle(fileName) {
  return fileName
    .replace(/\.txt$|\.md$/, '')  // Remove extension
    .replace(/_/g, ' ');          // Replace underscores with spaces
}

// Helper: Parse wiki links in content
function parseWikiLinks(content) {
  const links = [];
  const wikiLinkRegex = /\[\[(.*?)\]\]/g;
  let match;
  
  while ((match = wikiLinkRegex.exec(content)) !== null) {
    // Extract link text and split if it contains a pipe
    const linkText = match[1];
    const [target, label] = linkText.split('|').map(s => s.trim());
    
    links.push({
      target,
      label: label || target,
      original: match[0]
    });
  }
  
  return links;
}

// Helper: Process content to convert wiki links to HTML links
function processContent(content, currentSlug) {
  // Replace wiki links
  let processedContent = content.replace(/\[\[(.*?)\]\]/g, (match, linkText) => {
    const [target, label] = linkText.split('|').map(s => s.trim());
    const targetSlug = slugify(target);
    const displayText = label || target;
    
    // Store the link relationship
    if (allLinks.has(currentSlug)) {
      allLinks.get(currentSlug).push(targetSlug);
    } else {
      allLinks.set(currentSlug, [targetSlug]);
    }
    
    return `<a href="../pages/${targetSlug}.html" class="wiki-link">${displayText}</a>`;
  });
  
  // Basic markdown processing
  // Headers
  processedContent = processedContent.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
  processedContent = processedContent.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  processedContent = processedContent.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  
  // Bold and italic
  processedContent = processedContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  processedContent = processedContent.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Lists
  processedContent = processedContent.replace(/^- (.*?)$/gm, '<li>$1</li>');
  processedContent = processedContent.replace(/(<li>.*?<\/li>(\n|$))+/g, '<ul>$&</ul>');
  
  // Code blocks
  processedContent = processedContent.replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>');
  
  // Paragraphs (replace groups of lines not starting with HTML tag)
  processedContent = processedContent.replace(/(?<!\n<[^>]+>)([^\n<][^\n]*?)(?=\n<[^>]+>|\n\n|$)/g, '<p>$1</p>');
  
  // Normalize newlines
  processedContent = processedContent.replace(/\n\n+/g, '\n\n');
  
  return processedContent;
}

// Helper: Detect tags from content
function detectTags(content, category) {
  const tags = new Set();
  
  // Add category as a tag
  tags.add(category);
  
  // Extract hashtags
  const hashtagRegex = /#([a-zA-Z0-9_]+)/g;
  let match;
  while ((match = hashtagRegex.exec(content)) !== null) {
    tags.add(match[1]);
  }
  
  // Look for common keywords
  const keywords = {
    "character": "character",
    "dialogue": "dialogue",
    "item": "item",
    "weapon": "weapon",
    "location": "location",
    "story": "story",
    "quest": "quest",
    "feature": "feature",
    "gameplay": "gameplay",
    "mechanic": "mechanic"
  };
  
  const contentLower = content.toLowerCase();
  for (const [keyword, tag] of Object.entries(keywords)) {
    if (contentLower.includes(keyword)) {
      tags.add(tag);
    }
  }
  
  return Array.from(tags);
}

// Helper: Detect category based on path
function detectCategory(filePath) {
  const normalizedPath = filePath.toLowerCase();
  
  if (normalizedPath.includes('autumn')) return 'autumn';
  if (normalizedPath.includes('dodec')) return 'dodec';
  if (normalizedPath.includes('noxii')) return 'noxii';
  if (normalizedPath.includes('command')) return 'on-command';
  if (normalizedPath.includes('reference')) return 'reference';
  if (normalizedPath.includes('game')) return 'game-project';
  
  return 'general';
}

// Process a single notebook file
function processNotebook(filePath) {
  try {
    // Read file content
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract basic information
    const fileName = path.basename(filePath);
    const title = extractTitle(fileName);
    const slug = slugify(title);
    const category = detectCategory(filePath);
    const tags = detectTags(content, category);
    const dateCreated = new Date().toISOString();
    
    // Parse wiki links
    const links = parseWikiLinks(content);
    
    // Store page info
    const pageInfo = {
      title,
      slug,
      content,
      filePath,
      category,
      tags,
      links,
      dateCreated
    };
    
    allPages.set(slug, pageInfo);
    
    // Store in category map
    if (allCategories.has(category)) {
      allCategories.get(category).push(slug);
    } else {
      allCategories.set(category, [slug]);
    }
    
    // Store in tags map
    tags.forEach(tag => {
      if (allTags.has(tag)) {
        allTags.get(tag).push(slug);
      } else {
        allTags.set(tag, [slug]);
      }
    });
    
    console.log(`Processed: ${title}`);
    return slug;
  } catch (error) {
    console.error(`Error processing ${filePath}: ${error.message}`);
    return null;
  }
}

// Generate HTML for a page
function generatePageHtml(pageInfo) {
  // Process content for HTML
  const processedContent = processContent(pageInfo.content, pageInfo.slug);
  
  // Find backlinks
  const backlinks = [];
  allLinks.forEach((targets, source) => {
    if (targets.includes(pageInfo.slug)) {
      backlinks.push(source);
    }
  });
  
  // Create HTML file
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageInfo.title} - Static Wiki</title>
  <link rel="stylesheet" href="../assets/style.css">
</head>
<body>
  <div class="wrapper">
    <header>
      <div class="header-left">
        <a href="../index.html" class="home-link">Wiki Home</a>
        <span class="separator">›</span>
        <a href="../categories/${pageInfo.category}.html" class="category-link">${pageInfo.category}</a>
      </div>
      <div class="header-right">
        <a href="../all-pages.html">All Pages</a>
        <a href="../tags.html">Tags</a>
        <a href="../graph.html">Graph</a>
      </div>
    </header>
    
    <main>
      <article>
        <h1 class="page-title">${pageInfo.title}</h1>
        
        <div class="page-meta">
          <div class="tags">
            ${pageInfo.tags.map(tag => `<a href="../tags/${tag}.html" class="tag">#${tag}</a>`).join(' ')}
          </div>
        </div>
        
        <div class="page-content">
          ${processedContent}
        </div>
      </article>
      
      <aside>
        <h3>Backlinks</h3>
        ${backlinks.length > 0 
          ? `<ul class="backlinks-list">
              ${backlinks.map(slug => `<li><a href="../pages/${slug}.html">${allPages.get(slug).title}</a></li>`).join('\n')}
            </ul>`
          : '<p>No pages link to this page</p>'
        }
      </aside>
    </main>
    
    <footer>
      <p>Generated on ${new Date().toLocaleString()}</p>
    </footer>
  </div>
</body>
</html>`;

  // Write to file
  const outputPath = path.join(PAGES_DIR, `${pageInfo.slug}.html`);
  fs.writeFileSync(outputPath, html);
  
  return outputPath;
}

// Generate category page
function generateCategoryPage(category, pages) {
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${categoryTitle} - Static Wiki</title>
  <link rel="stylesheet" href="../assets/style.css">
</head>
<body>
  <div class="wrapper">
    <header>
      <div class="header-left">
        <a href="../index.html" class="home-link">Wiki Home</a>
        <span class="separator">›</span>
        <span>Category: ${categoryTitle}</span>
      </div>
      <div class="header-right">
        <a href="../all-pages.html">All Pages</a>
        <a href="../tags.html">Tags</a>
        <a href="../graph.html">Graph</a>
      </div>
    </header>
    
    <main>
      <h1>Category: ${categoryTitle}</h1>
      
      <div class="page-list">
        <ul>
          ${pages.map(slug => `<li><a href="../pages/${slug}.html">${allPages.get(slug).title}</a></li>`).join('\n')}
        </ul>
      </div>
    </main>
    
    <footer>
      <p>Generated on ${new Date().toLocaleString()}</p>
    </footer>
  </div>
</body>
</html>`;

  // Ensure category directory exists
  const categoryDir = path.join(OUTPUT_DIR, 'categories');
  if (!fs.existsSync(categoryDir)) {
    fs.mkdirSync(categoryDir);
  }

  // Write to file
  const outputPath = path.join(categoryDir, `${category}.html`);
  fs.writeFileSync(outputPath, html);
  
  return outputPath;
}

// Generate tag page
function generateTagPage(tag, pages) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tag: ${tag} - Static Wiki</title>
  <link rel="stylesheet" href="../assets/style.css">
</head>
<body>
  <div class="wrapper">
    <header>
      <div class="header-left">
        <a href="../index.html" class="home-link">Wiki Home</a>
        <span class="separator">›</span>
        <a href="../tags.html">Tags</a>
        <span class="separator">›</span>
        <span>#${tag}</span>
      </div>
      <div class="header-right">
        <a href="../all-pages.html">All Pages</a>
        <a href="../categories.html">Categories</a>
        <a href="../graph.html">Graph</a>
      </div>
    </header>
    
    <main>
      <h1>Pages tagged #${tag}</h1>
      
      <div class="page-list">
        <ul>
          ${pages.map(slug => `<li><a href="../pages/${slug}.html">${allPages.get(slug).title}</a></li>`).join('\n')}
        </ul>
      </div>
    </main>
    
    <footer>
      <p>Generated on ${new Date().toLocaleString()}</p>
    </footer>
  </div>
</body>
</html>`;

  // Ensure tags directory exists
  const tagsDir = path.join(OUTPUT_DIR, 'tags');
  if (!fs.existsSync(tagsDir)) {
    fs.mkdirSync(tagsDir);
  }

  // Write to file
  const outputPath = path.join(tagsDir, `${tag}.html`);
  fs.writeFileSync(outputPath, html);
  
  return outputPath;
}

// Generate all tags index page
function generateTagsIndexPage() {
  const sortedTags = Array.from(allTags.entries())
    .map(([tag, pages]) => ({ tag, count: pages.length }))
    .sort((a, b) => b.count - a.count);
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>All Tags - Static Wiki</title>
  <link rel="stylesheet" href="./assets/style.css">
</head>
<body>
  <div class="wrapper">
    <header>
      <div class="header-left">
        <a href="./index.html" class="home-link">Wiki Home</a>
        <span class="separator">›</span>
        <span>All Tags</span>
      </div>
      <div class="header-right">
        <a href="./all-pages.html">All Pages</a>
        <a href="./categories.html">Categories</a>
        <a href="./graph.html">Graph</a>
      </div>
    </header>
    
    <main>
      <h1>All Tags</h1>
      
      <div class="tags-cloud">
        ${sortedTags.map(item => 
          `<a href="./tags/${item.tag}.html" class="tag" style="font-size: ${Math.max(100, 100 + item.count * 15)}%">
            #${item.tag} <span class="tag-count">${item.count}</span>
          </a>`
        ).join('\n')}
      </div>
    </main>
    
    <footer>
      <p>Generated on ${new Date().toLocaleString()}</p>
    </footer>
  </div>
</body>
</html>`;

  // Write to file
  const outputPath = path.join(OUTPUT_DIR, 'tags.html');
  fs.writeFileSync(outputPath, html);
  
  return outputPath;
}

// Generate categories index page
function generateCategoriesIndexPage() {
  const sortedCategories = Array.from(allCategories.entries())
    .map(([category, pages]) => ({ category, count: pages.length }))
    .sort((a, b) => b.count - a.count);
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Categories - Static Wiki</title>
  <link rel="stylesheet" href="./assets/style.css">
</head>
<body>
  <div class="wrapper">
    <header>
      <div class="header-left">
        <a href="./index.html" class="home-link">Wiki Home</a>
        <span class="separator">›</span>
        <span>Categories</span>
      </div>
      <div class="header-right">
        <a href="./all-pages.html">All Pages</a>
        <a href="./tags.html">Tags</a>
        <a href="./graph.html">Graph</a>
      </div>
    </header>
    
    <main>
      <h1>Categories</h1>
      
      <div class="categories-list">
        ${sortedCategories.map(item => 
          `<div class="category-item">
            <a href="./categories/${item.category}.html" class="category-link">
              ${item.category.charAt(0).toUpperCase() + item.category.slice(1).replace(/-/g, ' ')}
            </a>
            <span class="category-count">${item.count} pages</span>
          </div>`
        ).join('\n')}
      </div>
    </main>
    
    <footer>
      <p>Generated on ${new Date().toLocaleString()}</p>
    </footer>
  </div>
</body>
</html>`;

  // Write to file
  const outputPath = path.join(OUTPUT_DIR, 'categories.html');
  fs.writeFileSync(outputPath, html);
  
  return outputPath;
}

// Generate all pages index
function generateAllPagesIndex() {
  const sortedPages = Array.from(allPages.values())
    .sort((a, b) => a.title.localeCompare(b.title));
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>All Pages - Static Wiki</title>
  <link rel="stylesheet" href="./assets/style.css">
</head>
<body>
  <div class="wrapper">
    <header>
      <div class="header-left">
        <a href="./index.html" class="home-link">Wiki Home</a>
        <span class="separator">›</span>
        <span>All Pages</span>
      </div>
      <div class="header-right">
        <a href="./categories.html">Categories</a>
        <a href="./tags.html">Tags</a>
        <a href="./graph.html">Graph</a>
      </div>
    </header>
    
    <main>
      <h1>All Pages</h1>
      
      <div class="page-list alphabetical">
        ${
          // Group by first letter
          Array.from(
            sortedPages.reduce((groups, page) => {
              const firstLetter = page.title.charAt(0).toUpperCase();
              if (!groups.has(firstLetter)) {
                groups.set(firstLetter, []);
              }
              groups.get(firstLetter).push(page);
              return groups;
            }, new Map())
          )
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([letter, pages]) => `
            <div class="letter-group">
              <h2 class="letter">${letter}</h2>
              <ul>
                ${pages.map(page => 
                  `<li><a href="./pages/${page.slug}.html">${page.title}</a></li>`
                ).join('\n')}
              </ul>
            </div>
          `).join('\n')
        }
      </div>
    </main>
    
    <footer>
      <p>Generated on ${new Date().toLocaleString()}</p>
    </footer>
  </div>
</body>
</html>`;

  // Write to file
  const outputPath = path.join(OUTPUT_DIR, 'all-pages.html');
  fs.writeFileSync(outputPath, html);
  
  return outputPath;
}

// Generate graph visualization
function generateGraphPage() {
  // Create JSON data for the graph
  const nodes = [];
  const links = [];
  
  // Add nodes
  for (const [slug, pageInfo] of allPages.entries()) {
    nodes.push({
      id: slug,
      name: pageInfo.title,
      category: pageInfo.category,
      group: pageInfo.category
    });
  }
  
  // Add links
  for (const [source, targets] of allLinks.entries()) {
    for (const target of targets) {
      // Only add links to pages that exist
      if (allPages.has(target)) {
        links.push({
          source,
          target
        });
      }
    }
  }
  
  const graphData = {
    nodes,
    links
  };
  
  // Create the graph visualization HTML
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Knowledge Graph - Static Wiki</title>
  <link rel="stylesheet" href="./assets/style.css">
  <script src="https://d3js.org/d3.v7.min.js"></script>
  <script src="https://unpkg.com/force-graph"></script>
  <style>
    #graph-container {
      width: 100%;
      height: 600px;
      border: 1px solid #ddd;
      border-radius: 4px;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <header>
      <div class="header-left">
        <a href="./index.html" class="home-link">Wiki Home</a>
        <span class="separator">›</span>
        <span>Knowledge Graph</span>
      </div>
      <div class="header-right">
        <a href="./all-pages.html">All Pages</a>
        <a href="./categories.html">Categories</a>
        <a href="./tags.html">Tags</a>
      </div>
    </header>
    
    <main>
      <h1>Knowledge Graph</h1>
      
      <div id="graph-container"></div>
      
      <script>
        // Graph data
        const graphData = ${JSON.stringify(graphData)};
        
        // Node colors by category
        const categoryColors = {
          'general': '#3498db',
          'autumn': '#e74c3c',
          'dodec': '#2ecc71',
          'noxii': '#9b59b6',
          'on-command': '#f39c12',
          'reference': '#1abc9c',
          'game-project': '#e67e22'
        };
        
        // Initialize the graph
        const Graph = ForceGraph()
          (document.getElementById('graph-container'))
            .graphData(graphData)
            .nodeId('id')
            .nodeLabel('name')
            .nodeColor(node => categoryColors[node.category] || '#95a5a6')
            .nodeRelSize(6)
            .linkDirectionalArrowLength(3)
            .linkCurvature(0.1)
            .onNodeClick(node => {
              window.location.href = \`./pages/\${node.id}.html\`;
            });
      </script>
    </main>
    
    <footer>
      <p>Generated on ${new Date().toLocaleString()}</p>
    </footer>
  </div>
</body>
</html>`;

  // Write to file
  const outputPath = path.join(OUTPUT_DIR, 'graph.html');
  fs.writeFileSync(outputPath, html);
  
  return outputPath;
}

// Generate home page (index.html)
function generateHomePage() {
  // Get some stats
  const totalPages = allPages.size;
  const totalCategories = allCategories.size;
  const totalTags = allTags.size;
  
  // Recent pages (by filename date if possible)
  const recentPages = Array.from(allPages.values())
    .sort((a, b) => {
      try {
        const dateA = new Date(a.dateCreated);
        const dateB = new Date(b.dateCreated);
        return dateB - dateA; // Newest first
      } catch (e) {
        return 0;
      }
    })
    .slice(0, 10);
  
  // Popular categories (by page count)
  const popularCategories = Array.from(allCategories.entries())
    .map(([category, pages]) => ({ category, count: pages.length }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  
  // Popular tags (by page count)
  const popularTags = Array.from(allTags.entries())
    .map(([tag, pages]) => ({ tag, count: pages.length }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Static Wiki Home</title>
  <link rel="stylesheet" href="./assets/style.css">
</head>
<body>
  <div class="wrapper">
    <header class="home-header">
      <h1 class="site-title">Static Wiki</h1>
      <nav class="main-nav">
        <a href="./all-pages.html">All Pages</a>
        <a href="./categories.html">Categories</a>
        <a href="./tags.html">Tags</a>
        <a href="./graph.html">Graph</a>
      </nav>
    </header>
    
    <main class="home-main">
      <div class="home-stats">
        <div class="stat-item">
          <span class="stat-number">${totalPages}</span>
          <span class="stat-label">Pages</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">${totalCategories}</span>
          <span class="stat-label">Categories</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">${totalTags}</span>
          <span class="stat-label">Tags</span>
        </div>
      </div>
      
      <div class="home-sections">
        <section class="home-section">
          <h2>Recent Pages</h2>
          <ul class="home-list">
            ${recentPages.map(page => 
              `<li><a href="./pages/${page.slug}.html">${page.title}</a></li>`
            ).join('\n')}
          </ul>
          <a href="./all-pages.html" class="see-all">See all pages →</a>
        </section>
        
        <section class="home-section">
          <h2>Categories</h2>
          <div class="home-categories">
            ${popularCategories.map(item => 
              `<a href="./categories/${item.category}.html" class="home-category">
                <span class="category-name">${item.category.charAt(0).toUpperCase() + item.category.slice(1).replace(/-/g, ' ')}</span>
                <span class="category-count">${item.count}</span>
              </a>`
            ).join('\n')}
          </div>
          <a href="./categories.html" class="see-all">See all categories →</a>
        </section>
        
        <section class="home-section">
          <h2>Popular Tags</h2>
          <div class="home-tags">
            ${popularTags.map(item => 
              `<a href="./tags/${item.tag}.html" class="tag">#${item.tag} <span class="tag-count">${item.count}</span></a>`
            ).join('\n')}
          </div>
          <a href="./tags.html" class="see-all">See all tags →</a>
        </section>
      </div>
    </main>
    
    <footer>
      <p>Generated on ${new Date().toLocaleString()}</p>
    </footer>
  </div>
</body>
</html>`;

  // Write to file
  const outputPath = path.join(OUTPUT_DIR, 'index.html');
  fs.writeFileSync(outputPath, html);
  
  return outputPath;
}

// Create CSS styles
function generateStyles() {
  const css = `/* Static Wiki Styles */

:root {
  --primary: #3498db;
  --primary-dark: #2980b9;
  --accent: #e74c3c;
  --text: #333333;
  --text-light: #666666;
  --background: #ffffff;
  --background-alt: #f8f9fa;
  --border: #dddddd;
  --shadow: rgba(0, 0, 0, 0.1);
  --link: #3498db;
  --link-hover: #2980b9;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: var(--text);
  background-color: var(--background);
  line-height: 1.6;
}

.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid var(--border);
  margin-bottom: 30px;
}

.header-left, .header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.home-link {
  font-weight: 600;
  color: var(--primary);
}

.separator {
  color: var(--text-light);
}

a {
  color: var(--link);
  text-decoration: none;
}

a:hover {
  color: var(--link-hover);
  text-decoration: underline;
}

/* Main content */
main {
  padding-bottom: 40px;
}

h1, h2, h3, h4, h5, h6 {
  color: var(--text);
  margin-bottom: 0.5em;
  font-weight: 600;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1em;
}

h2 {
  font-size: 1.5rem;
  margin-top: 1.5em;
}

h3 {
  font-size: 1.25rem;
}

p {
  margin-bottom: 1em;
}

ul, ol {
  margin-bottom: 1em;
  padding-left: 1.5em;
}

pre {
  background-color: var(--background-alt);
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  margin-bottom: 1em;
}

code {
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.9em;
}

/* Page styles */
.page-title {
  font-size: 2.5rem;
  margin-bottom: 0.5em;
  color: var(--primary);
}

.page-meta {
  margin-bottom: 20px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}

.tag {
  background-color: var(--primary);
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  white-space: nowrap;
}

.tag:hover {
  text-decoration: none;
  opacity: 0.9;
}

.tag-count {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 5px;
  font-size: 0.7rem;
}

.page-content {
  max-width: 800px;
  margin-bottom: 40px;
}

.wiki-link {
  color: var(--primary);
  border-bottom: 1px dashed var(--primary);
}

.wiki-link:hover {
  background-color: rgba(52, 152, 219, 0.1);
  text-decoration: none;
}

/* Aside */
aside {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}

.backlinks-list {
  padding-left: 1.5em;
}

/* Footer */
footer {
  text-align: center;
  padding: 20px 0;
  border-top: 1px solid var(--border);
  color: var(--text-light);
  font-size: 0.9rem;
}

/* Lists */
.page-list ul {
  list-style-type: none;
  padding-left: 0;
}

.page-list li {
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 4px;
}

.page-list li:hover {
  background-color: var(--background-alt);
}

/* Tags cloud */
.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

/* Categories */
.categories-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.category-item {
  padding: 15px;
  border-radius: 4px;
  background-color: var(--background-alt);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-count {
  background-color: var(--primary);
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.8rem;
}

/* Alphabetical page list */
.alphabetical {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 30px;
}

.letter-group {
  margin-bottom: 30px;
}

.letter {
  font-size: 1.5rem;
  color: var(--primary);
  border-bottom: 2px solid var(--primary);
  padding-bottom: 5px;
  margin-bottom: 10px;
}

/* Home page */
.home-header {
  text-align: center;
  padding: 40px 0;
  border-bottom: 1px solid var(--border);
  margin-bottom: 40px;
}

.site-title {
  font-size: 3rem;
  margin-bottom: 20px;
  color: var(--primary);
}

.main-nav {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.main-nav a {
  font-size: 1.1rem;
}

.home-stats {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 40px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary);
  display: block;
}

.stat-label {
  font-size: 1rem;
  color: var(--text-light);
}

.home-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.home-section {
  margin-bottom: 30px;
}

.home-section h2 {
  margin-top: 0;
  border-bottom: 2px solid var(--primary);
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.home-list {
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 15px;
}

.home-list li {
  margin-bottom: 5px;
  padding: 5px 0;
}

.see-all {
  display: inline-block;
  margin-top: 10px;
  font-size: 0.9rem;
}

.home-categories {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}

.home-category {
  padding: 10px;
  border-radius: 4px;
  background-color: var(--background-alt);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.home-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
}

/* Responsive */
@media (max-width: 768px) {
  .wrapper {
    padding: 0 15px;
  }
  
  .home-stats {
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
  
  .home-sections {
    grid-template-columns: 1fr;
  }
  
  .alphabetical {
    grid-template-columns: 1fr;
  }
  
  header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .header-right {
    width: 100%;
    justify-content: space-between;
  }
}`;

  // Write to file
  const outputPath = path.join(ASSETS_DIR, 'style.css');
  fs.writeFileSync(outputPath, css);
  
  return outputPath;
}

// Recursively process a directory
function processDirectory(dirPath) {
  const slugs = [];
  
  // Get all files in directory
  try {
    const files = fs.readdirSync(dirPath).filter(file => {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      return stat.isFile() && (file.endsWith('.txt') || file.endsWith('.md'));
    });
    
    // Process each file
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const slug = processNotebook(filePath);
      if (slug) {
        slugs.push(slug);
      }
    }
    
    // Process subdirectories
    const subdirs = fs.readdirSync(dirPath).filter(file => {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      return stat.isDirectory();
    });
    
    for (const subdir of subdirs) {
      const subdirPath = path.join(dirPath, subdir);
      const subSlugs = processDirectory(subdirPath);
      slugs.push(...subSlugs);
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}: ${error.message}`);
  }
  
  return slugs;
}

// Main function to build the wiki
function buildWiki() {
  console.log('Starting Static Wiki Generator...');
  console.log(`Notebooks: ${NOTEBOOKS_DIR}`);
  console.log(`Output: ${OUTPUT_DIR}`);
  
  // First pass: Process all notebook files and gather metadata
  console.log('\n1. Processing notebooks...');
  const notebookDirs = fs.readdirSync(NOTEBOOKS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  for (const dir of notebookDirs) {
    const dirPath = path.join(NOTEBOOKS_DIR, dir);
    console.log(`Processing directory: ${dir}`);
    processDirectory(dirPath);
  }
  
  console.log(`Processed ${allPages.size} pages`);
  console.log(`Found ${allTags.size} unique tags`);
  console.log(`Found ${allCategories.size} categories`);
  
  // Second pass: Generate HTML files
  console.log('\n2. Generating HTML files...');
  
  // Generate page HTML files
  for (const [slug, pageInfo] of allPages.entries()) {
    generatePageHtml(pageInfo);
  }
  console.log(`Generated ${allPages.size} HTML pages`);
  
  // Generate category pages
  for (const [category, pages] of allCategories.entries()) {
    generateCategoryPage(category, pages);
  }
  console.log(`Generated ${allCategories.size} category pages`);
  
  // Generate tag pages
  for (const [tag, pages] of allTags.entries()) {
    generateTagPage(tag, pages);
  }
  console.log(`Generated ${allTags.size} tag pages`);
  
  // Generate index pages
  console.log('\n3. Generating index pages...');
  generateStyles();
  generateHomePage();
  generateAllPagesIndex();
  generateTagsIndexPage();
  generateCategoriesIndexPage();
  generateGraphPage();
  
  console.log('\nStatic Wiki generation complete!');
  console.log(`Open ${path.join(OUTPUT_DIR, 'index.html')} in your browser to view the wiki.`);
}

// Run the wiki generator
buildWiki();