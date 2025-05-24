# Running Applications

The following applications are now running and configured:

## 1. Constellation Viewer (Wiki Interface)
- **URL**: http://localhost:8081/
- **Description**: Browse and edit wiki pages, view notebooks
- **Features**:
  - Create and edit wiki pages with Markdown
  - View and convert notebooks to wiki pages
  - Link pages with wiki-style links [[PageName]]

## 2. Relationship Visualization
- **URL**: http://localhost:8081/relationships
- **Description**: Visualize relationships between content
- **Features**:
  - Interactive graph visualization
  - Select a page to see its relationships
  - Navigate through connected nodes

## 3. Backend API
- **URL**: http://localhost:4000/
- **Description**: Provides backend services for the applications
- **Features**:
  - Relationship management
  - Data storage for wiki pages
  - Graph visualization calculation

## Current Data
- Wiki pages: "Welcome" and "Projects"
- Notebooks: README.md in All\ directory
- Relationship: "Welcome" references "Projects"

## How to Use the Relationship Visualization
1. Go to http://localhost:8081/relationships
2. Select "Welcome" or "Projects" from the dropdown
3. Click "Load Relationships" to see the visualization
4. Explore the graph by clicking on nodes and using the mouse to navigate
