# Repository Organization Plan

## Overview
This repository is a knowledge management system with web interfaces for visualizing and exploring interconnected content. The current organization needs refinement to ensure all components work together seamlessly.

## Current Status

The repository consists of:

1. **Content Sources (Notebooks/)**
   - Multiple wiki-style project directories containing .txt files
   - Three remaining files:
     - `noxii-wiki-pages/Enemy_Design.txt`
     - `on-command-wiki-pages/Game_Design.txt`
     - `reference-wiki-pages/narrative-structure.txt`
   - Git staged but deleted files for multiple projects

2. **Visualization Layer (WebProjects/)**
   - Constellation Viewer: Primary notebook browser (port 8090)
   - 3D Visualization: Interactive relationship explorer (port 8081)
   - Content Management: Backend API (port 3001)
   - WordPress Projects: Forum and plugin development

3. **Infrastructure (scripts/, tools/, interface-enhancements/)**
   - Scripts for running services
   - Tools for content management
   - Interface improvements for the visualization layer

## Organization Issues

1. **Content Organization**
   - Notebooks content is fragmented and incomplete
   - Git status shows deleted files still staged
   - Missing project documentation
   - Inconsistent format across files

2. **Integration Points**
   - Unclear connections between notebooks and web interfaces
   - Documentation gaps between components
   - Incomplete implementation of relationship visualization

## Recommended Organization

### 1. Content Structure
```
Repository/
├── Notebooks/
│   ├── game-projects/
│   │   ├── noxii/
│   │   │   ├── README.md (Project overview)
│   │   │   ├── enemy-design.md
│   │   │   └── ... (other noxii docs)
│   │   └── on-command/
│   │       ├── README.md (Project overview)
│   │       ├── game-design.md
│   │       └── ... (other on-command docs)
│   ├── reference/
│   │   ├── narrative-structure.md
│   │   └── ... (other reference materials)
│   └── archives/
│       └── ... (non-active project materials)
```

### 2. Implementation Plan

**Phase 1: Content Organization**
1. Convert .txt files to .md format for better visualization
2. Create README.md files for each project with status and overview
3. Resolve git staging issues with deleted files

**Phase 2: Integration Enhancement**
1. Update configuration to point visualization tools to reorganized content
2. Document relationship between content and visualization tools
3. Create relationship maps between different projects

**Phase 3: Documentation Updates**
1. Update INDEX.md with complete file reference
2. Enhance README.md with clear project descriptions
3. Create visualization guides for exploring project relationships

## Next Steps

1. Resolve git staging issues (unstage deleted files)
2. Convert existing .txt files to .md format
3. Create project overview files
4. Update visualization tools to use new content structure

## Previous Model Notes

The repository was designed as an integrated knowledge management system with:
- Text-based content storage
- Relationship-driven visualization
- Multiple interface options
- A unified data model

The primary objective is to maintain this vision while improving organization and documentation.