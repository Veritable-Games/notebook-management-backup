# Enhanced Wiki System

## Overview

The Enhanced Wiki System is a modern, feature-rich documentation platform built for Veritable Games' project documentation. It combines traditional wiki functionality with interactive features, notebook integration, and modern UX design.

## Features

- **Modern Interface**: Clean, responsive design with intuitive navigation
- **Dark Mode Support**: Comfortable viewing in any lighting environment
- **Markdown Support**: Full markdown editing with real-time preview
- **Notebook Integration**: Import text files directly into the wiki system
- **Advanced Navigation**: Breadcrumbs, history, and categorized sidebar
- **Search Functionality**: Fast content search with highlighted results
- **Multiple View Modes**: Choose between compact, normal, and reading layouts
- **Metadata Support**: Automatic tracking of creation and modification dates
- **Tag System**: Organize content with customizable tags
- **Browser Compatibility**: Works on modern browsers including mobile devices

## Getting Started

1. Start the server:
   ```
   cd /home/user/Repository/WebProjects/Constellation-Viewer
   npm start
   ```

2. Access the Enhanced Wiki at:
   ```
   http://localhost:3003/enhanced
   ```

## Implementation Details

### Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Libraries**: 
  - EasyMDE for Markdown editing
  - Marked for Markdown rendering
  - Font Awesome for icons
- **Backend**: Node.js with Express
- **Data Storage**: JSON-based file storage

### Key Components

- **enhanced-wiki.js**: Core wiki functionality implementation
- **enhanced-wiki.css**: Comprehensive styling with CSS variables for theming
- **enhanced-wiki.html**: Main interface template
- **Server endpoints**: Extended API with metadata support

## Integration with Notebooks

The Enhanced Wiki System integrates with the existing Notebooks system, allowing:

1. Browsing of notebook directories and files from the sidebar
2. Viewing notebook content with automatic formatting
3. Converting notebook entries to wiki pages with a single click
4. Preserving original content structure during conversion

## Future Enhancements

- **User Authentication**: Role-based access control
- **Version History**: Track changes to wiki pages over time
- **Rich Media Support**: Embedded video and interactive elements
- **Collaborative Editing**: Real-time multi-user editing
- **AI-Assisted Content Management**: Smart suggestions and auto-organization
- **Custom Themes**: User-selectable visual themes

## Contributing

To contribute to the Enhanced Wiki System:

1. Make improvements to the JavaScript, CSS, or HTML files
2. Test your changes thoroughly
3. Update this documentation with any new features or changes
4. Submit your changes via pull request

## License

All rights reserved. Veritable Games © 2025.