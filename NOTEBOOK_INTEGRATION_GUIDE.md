# Notebook Integration Guide

This guide explains how to use the Constellation Viewer's notebook integration features to transform your notebook content into an interconnected wiki with automatic tagging and relationship visualization.

## What Can You Do Now?

The Constellation Viewer now offers these powerful features:

1. **Automatic Notebook Import**: Import all notebook content as wiki pages
2. **Smart Tagging**: Automatically detect and apply tags based on content and folder structure
3. **Relationship Creation**: Automatically create relationships between related content
4. **Visual Exploration**: Navigate your content visually using the relationship visualization
5. **Tag-Based Navigation**: Filter and search content by tags
6. **Improved Performance**: The system now handles large notebook collections efficiently with better duplicate prevention

## Getting Started

### 1. Run the Services

Make sure both the Backend API and Constellation Viewer are running:

```bash
# From the Repository root
cd /home/user/Repository
node ./scripts/service-manager.js start Backend-API
node ./scripts/service-manager.js start CV-Backend
```

### 2. Import Your Notebooks

Run the import script to bring your notebooks into the wiki:

```bash
# From the Repository root
cd /home/user/Repository
./scripts/import-notebooks.sh
```

This will:
- Import all notebooks from the `/home/user/Repository/notebooks` directory
- Create wiki pages with appropriate metadata
- Automatically detect and apply tags
- Create relationships between related content

### 3. Access the Wiki and Visualization

Open your browser to:
- **Wiki**: http://localhost:8081/
- **Relationship Visualization**: http://localhost:8081/relationships

## How the Integration Works

### Automatic Tagging

The system automatically applies tags based on:

1. **Directory Structure**: The parent directory name becomes a tag
2. **Project Type**: Detected from directory names (wiki, game, reference, etc.)
3. **Content Analysis**: Scanning content for keywords like "character", "dialogue", "item", etc.

### Relationship Creation

Relationships are automatically created based on:

1. **Shared Tags**: Pages with the same tags are linked as "related_by"
2. **Project Structure**: Pages from the same project are linked with "contains" relationships
3. **Wiki Links**: When wiki pages link to each other using [[PageName]] syntax

### Visualization Features

The relationship visualization provides:

1. **Color Coding**: Nodes are color-coded by their most significant tag or content type
2. **Filtering**: Select pages to see their specific relationships
3. **Interactive Navigation**: Click on nodes to explore connected content
4. **Hover Information**: See tags and details when hovering over nodes

## Customizing the Integration

You can customize the integration by:

1. **Editing the Import Script**: Modify `/home/user/Repository/scripts/services/import-notebooks-to-wiki.js` to change tagging rules
2. **Adding Custom Tags**: Add tag definitions to both the import script and visualization code
3. **Creating Manual Relationships**: Use the wiki interface to create custom relationships between pages

## Tips for Organizing Your Content

For best results with automatic tagging and relationship creation:

1. **Use Consistent Naming**: Keep file and directory names consistent
2. **Add Keywords**: Include relevant keywords in your content for better tagging
3. **Use Wiki Links**: Link related content with [[PageName]] syntax
4. **Group Related Files**: Keep related files in the same directory for better project grouping

## Troubleshooting

### "Failed to create relationship" errors

If you see "Failed to create relationship" errors during import:

- **This is normal**: The system now automatically detects and skips duplicate relationships
- **No action needed**: These messages are silently handled and won't affect your import
- **Performance improvement**: The new system creates fewer, more meaningful relationships

### "Node already exists" warnings

If you see warnings about nodes already existing:

- **Expected behavior**: The system attempts to update existing nodes rather than creating duplicates
- **No data loss**: Your existing content and relationships are preserved

### Large notebook collections

For very large notebook collections:

- **Selective relationship creation**: The system now limits relationships to prevent overwhelming the visualization
- **Project-based organization**: Content is grouped by project type with central "project nodes"
- **Tag filtering**: Only the most meaningful tag relationships are created

## Further Assistance

If you need help with the notebook integration, check the console logs for any errors, or refer to the code in:

- `/home/user/Repository/scripts/services/import-notebooks-to-wiki.js`
- `/home/user/Repository/projects/constellation-viewer/`

## Recent Improvements

The notebook integration system has been updated with:

1. **Better duplicate prevention**: Avoids creating redundant relationships
2. **Improved async handling**: More reliable processing of large notebook collections
3. **Project-based organization**: Creates central project nodes to better organize content
4. **Selective relationship creation**: Only creates the most meaningful relationships
5. **Error resilience**: Better handling of errors during import