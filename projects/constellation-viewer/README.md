# Constellation Viewer

Part of Veritable Games platform.

## Features

* Wiki system for documenting and browsing content
* 3D visualization of content relationships
* Notebook integration for connecting raw content to the wiki
* Dark mode support
* Search functionality
* Markdown editing with live preview

## Installation

```bash
npm install
```

## Usage

```bash
# Start the wiki server
./start-wiki.sh

# Stop the wiki server
./stop-wiki.sh
```

The server will be available at:
* Main Wiki Interface: http://localhost:8080/
* API Endpoints: http://localhost:8080/api/

## Wiki Features

* Create and edit wiki pages with markdown support
* Browse and view notebook content
* Search across all wiki content
* Switch between light and dark themes
* Convert notebook files to wiki pages
* Link between wiki pages using [[PageName]] syntax

## Development

```bash
# Install dependencies
npm install

# Run with auto-restart on changes
npm run dev
```

## Documentation

* [Wiki User Guide](docs/WIKI-VIEWER.md) - How to use the wiki interface
* [Wiki API Documentation](docs/WIKI-ENHANCEMENTS.md) - API endpoints and usage

## License

© 2025 Veritable Games. All rights reserved.