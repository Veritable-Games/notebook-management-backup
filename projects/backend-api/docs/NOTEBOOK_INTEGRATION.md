# Notebooks Integration

This document describes the integration of the Notebooks directory into the Repository project structure.

## Overview

The Notebooks directory contains various project documentation, design notes, and reference materials organized by project. These files were previously located outside the Repository but have now been integrated to provide a centralized location for all project-related materials.

## Integration Steps

1. Moved the Notebooks directory from `/home/user/Notebooks` to `/home/user/Repository/Notebooks`
2. Updated Documentation/README.md to include information about the Notebooks directory
3. Created an entry in the Repository structure diagram
4. Added a new section explaining the Notebooks structure and key documents
5. Modified docker-compose.yml to mount the Notebooks directory in the Constellation Viewer containers
6. Updated port number for Constellation Backend from 3002 to 3003 to avoid conflicts
7. Created CLAUDE.md to document the repository structure for Claude Code

## Notebooks Structure

- **All of it Anything Everything At Once/** - Collection of general ideas, drafts, and notes
- **LLM-confusion/** - Notes related to language model development and research
- **autumn-wiki-pages/** - Wiki pages for the Autumn project
- **dodec-wiki-pages/** - Documentation for the Dodec project
- **noxii-wiki-pages/** - Game design documents for the Noxii project
- **on-command-wiki-pages/** - Design notes for the On Command project
- **reference-wiki-pages/** - General reference materials and external resources

## Constellation Viewer Integration

The Notebooks directory has been made available to the Constellation Viewer project by:

1. Mounting the Notebooks directory at `/app/notebooks` in both the backend and frontend containers
2. Changing the backend port from 3002 to 3003 to avoid port conflicts
3. Updating all documentation to reflect the new port number

This allows the Constellation Viewer to access and visualize the content from the Notebooks directory as part of its wiki visualization capabilities.

## Implementation Details

1. **Backend API Endpoints**
   - GET `/notebooks` - List all notebook directories
   - GET `/notebooks/:directory` - List files in a specific notebook directory
   - GET `/notebooks/:directory/:file` - Get content of a specific notebook file
   - POST `/notebooks/wiki/:directory/:file` - Add notebook content as a wiki entry

2. **Frontend UI**
   - Added notebook directory dropdown and file browser in the sidebar
   - Implemented notebook content viewer in the info panel
   - Added "Add to Wiki" button to convert notebook content to wiki entries
   - Integrated with the existing constellation visualization

3. **Docker Configuration**
   - Modified `docker-compose.yml` to mount the Notebooks directory at `/app/notebooks`
   - Updated port from 3002 to 3003 to avoid conflicts

## Verification

A verification script has been created to ensure all integration points are working correctly:

```bash
cd /home/user/Repository
./verify-notebook-integration.sh
```

This script checks:
- Presence of the Notebooks directory and its subdirectories
- Backend integration with notebook-related code
- Frontend integration with notebook browser UI
- Docker volume mounting configuration
- Documentation updates
- Port configuration updates

## Usage

1. Start the Constellation Viewer application:
   ```bash
   cd /home/user/Repository
   ./start-all.sh
   ```

2. Open the Constellation Viewer in your browser:
   ```
   http://localhost:8090
   ```

3. Browse notebooks using the sidebar dropdown
4. View notebook content by clicking on a file
5. Add notebooks to the wiki constellation using the "Add to Wiki" button

## Next Steps

1. Improve search functionality across both the existing wiki content and the notebook files
2. Add filtering options for notebook content
3. Implement automatic classification of notebook content
4. Consider converting critical notebook content into proper wiki entries for better integration