# Styled Wiki Interface

This modernized wiki interface provides an enhanced user experience with the following features:

- Modern UI with clean styling based on shared UI components
- Dark mode toggle with theme persistence
- Responsive design for various device sizes
- Table of contents generation for longer pages
- Notebook browser integration
- Markdown rendering with code syntax highlighting
- Inline editing capabilities

## Getting Started

### Starting the Server

To start the Styled Wiki Interface, run:

```bash
./start-styled-wiki.sh
```

This script will:
1. Check if the server is already running
2. Create necessary directories and symlinks
3. Install required dependencies
4. Configure the server with the proper routes
5. Start the server on port 8081

The styled interface will be available at:
- http://localhost:8081/basic-styled

### Stopping the Server

To stop the server, run:

```bash
./stop-styled-wiki.sh
```

## Components

The Styled Wiki Interface consists of:

1. **Server-side components**:
   - Express.js server (`backend/server.js`)
   - API for notebook access
   - Configuration module integration

2. **Client-side components**:
   - HTML/CSS/JS interface (`frontend/basic-styled.html`)
   - Modern responsive UI
   - Dark mode theme toggle
   - Markdown rendering
   - API integration for data access

## Notebooks Integration

The styled interface integrates with the notebooks stored in `/home/user/Notebooks`, allowing:

- Browsing notebook directories
- Viewing notebook content
- Adding notebook content to the wiki

## Configuration

The server uses configuration from:
- Central config file: `/home/user/Repository/data/config.js`
- Fallback values for missing configuration

## Troubleshooting

If you encounter issues:

1. **Server won't start**: Check if another process is using port 8081
2. **Missing dependencies**: Run `npm install` in the constellation-viewer directory
3. **Cannot access notebooks**: Verify the path in the config file is correct

## Next Steps

Future enhancements could include:
- Full implementation of the wiki content editor
- Search functionality across notebooks and wiki pages
- File upload capabilities
- User authentication and access control
- Mobile-optimized view