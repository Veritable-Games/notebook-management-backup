# Backend API

RESTful API server for content management and relationship visualization.

## Features

- Content storage and retrieval
- Relationship management between content items
- Integration with frontend visualization tools
- API documentation endpoints

## Directory Structure

```
backend-api/
├── config.js             # Server configuration
├── lib/                  # API libraries
│   └── relationship-api.js # Relationship management
├── public/               # Static assets
│   ├── api-docs.html     # API documentation
│   └── index.html        # Landing page
├── relationships/        # Relationship data
│   └── initial-graph.json # Initial relationship graph
├── content/              # Content storage
├── logs/                 # Server logs
└── server.js             # Main server entry point
```

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   node server.js
   ```

3. Access the API at http://localhost:3001/api
4. Access API documentation at http://localhost:3001/api-docs

## API Endpoints

- `GET /api/content`: Retrieve content listing
- `GET /api/content/:id`: Retrieve specific content
- `POST /api/content`: Create new content
- `GET /api/relationships`: Get relationship graph
- `POST /api/relationships`: Create relationship between items

## Integration with Other Projects

This API server integrates with:

- Constellation Viewer for visualizing relationships
- Content Management for organizing content
- Visualization Tools for enhancing the user interface