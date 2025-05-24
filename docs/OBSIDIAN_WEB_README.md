# Obsidian Web - New Wiki Implementation

This document explains the new wiki implementation using Obsidian as the foundation.

## Overview

After analyzing the existing wiki implementation, we found several fundamental issues:

1. **Misaligned Data Structure**: The old system used JSON files instead of standard markdown
2. **Overcomplicated Architecture**: Multiple services that don't properly communicate
3. **Poor Navigation Paradigm**: Broken page URLs and wiki link handling

Our new approach uses **Obsidian-compatible markdown files** as the primary data format, with a lightweight web server that directly serves these files. This provides a standard wiki experience while maintaining compatibility with the desktop Obsidian app.

## Key Benefits

- **Standard Format**: Uses industry-standard markdown with YAML frontmatter
- **Simplified Architecture**: Single-service design rather than multiple interconnected services
- **Proper Wiki Links**: Full support for `[[WikiLinks]]` with backlink tracking
- **Graph Visualization**: Interactive graph view of connections between notes
- **Dual Access**: Use both the web interface and desktop Obsidian with the same content

## Implementation Components

### 1. Obsidian Vault

All content is stored as markdown files in the Obsidian vault:
```
/projects/content-storage/obsidian-vault/
```

### 2. Web Server

A lightweight Express server that serves the Obsidian vault content:
```
/projects/obsidian-web/server.js
```

### 3. Web Interface

Clean, modern HTML/CSS/JS interface for browsing and editing:
```
/projects/obsidian-web/public/
```

### 4. Converter Script

Script to transform existing notebooks into Obsidian format:
```
/scripts/convert-notebooks-to-obsidian.js
```

## Getting Started

1. Run the setup script:
   ```bash
   ./scripts/setup-obsidian-web.sh
   ```

2. Access the web interface:
   ```
   http://localhost:8080
   ```

## API Endpoints

The web server provides a clean REST API:

- `GET /api/notes` - List all notes
- `GET /api/notes/:path` - Get a specific note
- `POST /api/notes/:path` - Create or update a note
- `DELETE /api/notes/:path` - Delete a note
- `GET /api/search?q=query` - Search notes
- `GET /api/tags` - List all tags
- `GET /api/backlinks/:path` - Get backlinks for a note
- `GET /api/graph` - Get graph visualization data

## Why This Approach?

1. **Simplicity**: One unified data format and storage system
2. **Standard Compliance**: Uses common markdown and wiki conventions
3. **Portability**: Content can be used with other markdown tools
4. **Maintainability**: Simpler system with fewer moving parts
5. **Extensibility**: Easy to enhance with plugins or additional features

## Future Enhancements

- User authentication system
- Real-time collaborative editing
- Automated backups and versioning
- Plugin architecture for extensions
- Mobile app integration