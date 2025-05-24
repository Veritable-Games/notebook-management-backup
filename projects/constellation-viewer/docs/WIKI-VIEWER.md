# Wiki Viewer System

## Overview

The Wiki Viewer is a modern, feature-rich documentation platform integrated with the Constellation Viewer project. It provides a clean, responsive interface for browsing and editing wiki content with full notebook integration.

## Features

### Interface Improvements

- **Modern Design**: Clean, responsive UI with intuitive navigation
- **Dark Mode**: Toggle between light and dark themes for comfortable viewing
- **View Modes**: Choose between compact, normal, and reading layouts
- **Breadcrumb Navigation**: Clear path indicators for better navigation
- **Search Functionality**: Fast content search with highlighted results

### Content & Editing

- **Markdown Support**: Full markdown editing with live preview
- **Notebook Integration**: Browse and import notebook content directly
- **Content Organization**: Category-based sidebar navigation
- **Metadata**: Display last modified date and author information
- **Edit History**: Track changes to wiki pages (planned feature)

### Technical Features

- **Client-side Caching**: Faster page loading through browser cache
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Consistent Styling**: Unified look and feel with existing systems
- **API Integration**: Seamlessly connects with the existing backend

## Getting Started

1. **Access the Wiki Viewer**:
   - Navigate to http://localhost:8090 (main interface)
   - Click on "Wiki Viewer" card
   - Or directly access http://localhost:8090/wiki

2. **Browse Content**:
   - Use the sidebar navigation to browse categories and pages
   - Use search to find specific content
   - Toggle view modes using the toolbar

3. **Edit Content**:
   - Click the "Edit" tab on any page
   - Use the markdown editor to make changes
   - Click "Save Changes" to publish

4. **Integrate Notebooks**:
   - Select a notebook directory from the sidebar dropdown
   - Choose a file to view its content
   - Click "Add to Wiki" to import it as a wiki page

## Implementation Details

The Wiki Viewer is built on the existing Constellation Viewer infrastructure with several key components:

1. **wiki-viewer.html**: Main interface HTML, CSS, and JavaScript
2. **server.js**: Backend API endpoints for content storage and retrieval
3. **docker-compose.yml**: Container configuration for deployment

The system uses a responsive design approach with CSS variables for theming and a modular JavaScript structure for better maintainability.

## Future Enhancements

- **Version History**: Track and display page revision history
- **User Authentication**: Role-based access control
- **Rich Media Support**: Improved handling of images and embedded content
- **Real-time Collaboration**: Concurrent editing capabilities
- **Enhanced Search**: Full-text indexing for faster, more accurate results
- **Custom Themes**: User-selectable visual themes

## Contributing

To contribute to the Wiki Viewer system:

1. Fork the repository
2. Make your changes
3. Test thoroughly
4. Submit a pull request with a detailed description of your changes

## License

All rights reserved. Veritable Games © 2025.