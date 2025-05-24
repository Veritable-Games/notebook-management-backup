# Project Repository Documentation

This repository contains various web projects organized into logical groups with standardized structures.

## Repository Structure

```
Repository/
├── WebProjects/                       # All web projects in a unified structure
│   ├── 3D-Visualization/              # Simple 3D dodecahedron visualization
│   │   ├── frontend/                  # Frontend code and assets
│   │   ├── config/                    # Configuration files
│   │   ├── docs/                      # Documentation
│   │   └── package.json               # Project definition and scripts
│   │
│   ├── Content-Management/            # Content management system
│   │   ├── frontend/                  # Next.js React frontend
│   │   ├── backend/                   # Express.js API and server
│   │   ├── config/                    # Configuration files
│   │   ├── docs/                      # Documentation
│   │   └── package.json               # Project definition and scripts
│   │
│   ├── Constellation-Viewer/          # 3D constellation wiki visualization
│   │   ├── frontend/                  # Three.js frontend code
│   │   ├── backend/                   # Wiki server and data storage
│   │   ├── config/                    # Docker and deployment configs
│   │   ├── docs/                      # Documentation
│   │   └── package.json               # Project definition and scripts
│   │
│   └── WordPress-Projects/            # WordPress-based web projects
│       ├── PS2-Forum/                 # Complete PS2 forum WordPress installation
│       │   ├── core/                  # Core WordPress files
│       │   ├── themes/                # PS2 forum themes
│       │   ├── plugins/               # Forum plugins
│       │   ├── config/                # Docker configuration
│       │   ├── docs/                  # Documentation
│       │   └── start.sh               # Startup script
│       │
│       ├── Theme-Components/          # WordPress theme components
│       │   ├── themes/                # PS2 theme components
│       │   ├── config/                # Docker configuration
│       │   ├── docs/                  # Documentation
│       │   └── start.sh               # Startup script
│       │
│       └── Forum-Plugins/             # WordPress forum plugins
│           ├── plugins/               # PS2 forum plugins
│           ├── config/                # Docker configuration
│           ├── docs/                  # Documentation
│           └── start.sh               # Startup script
│
├── Notebooks/                         # Project notebooks and wiki pages
│   ├── All of it Anything Everything At Once/  # General notes, drafts, and ideas
│   ├── LLM-confusion/                 # Notes related to language models
│   ├── autumn-wiki-pages/             # Wiki pages for Project Autumn
│   ├── dodec-wiki-pages/              # Wiki pages for Project Dodec
│   ├── noxii-wiki-pages/              # Wiki pages for Noxii project
│   ├── on-command-wiki-pages/         # Wiki pages for On Command project
│   └── reference-wiki-pages/          # Reference materials and resources
│
├── Documentation/                     # Project documentation
│   └── README.md                      # This file
│
├── docker-compose.yml                 # Docker composition for all services
├── start-all.sh                       # Script to start all services
└── start-project.sh                   # Script to start individual projects
```

## Project Standardized Structure

Each project follows a consistent structure:

- **frontend/** - Client-side code, assets, and components
- **backend/** - Server-side code, APIs, and data management
- **config/** - Configuration files, deployment scripts, etc.
- **docs/** - Project-specific documentation
- **package.json** - Project scripts and dependencies in the root (for JS projects)

WordPress projects include these additional directories:
- **core/** - Core WordPress files
- **themes/** - WordPress themes
- **plugins/** - WordPress plugins

## Notebooks Documentation

The Notebooks directory contains various project documentation, design notes, and reference materials organized by project:

### Notebooks Structure

- **All of it Anything Everything At Once/** - Collection of general ideas, drafts, and notes spanning various projects
- **LLM-confusion/** - Notes related to language model development and research
- **autumn-wiki-pages/** - Wiki pages for the Autumn project, including game design documents
- **dodec-wiki-pages/** - Documentation for the Dodec project with character profiles and world-building
- **noxii-wiki-pages/** - Game design documents for the Noxii project across different versions
- **on-command-wiki-pages/** - Design notes for the On Command project, including character information
- **reference-wiki-pages/** - General reference materials and external resources

### Key Documents

- **Game Design Documents (GDD)** - Located in project-specific wiki folders, tracking design evolution
- **Character Profiles** - Detailed character information in respective project folders
- **Technical Notes** - Implementation details and system designs
- **World-building** - Background information on project settings and lore

## Running the Projects

### All Projects

To start all projects:

```bash
./start-all.sh
```

### Individual Projects

To start a specific project:

```bash
./start-project.sh
```

Or use Docker Compose directly:

```bash
# Start 3D Visualization
docker-compose up -d 3d-visualization

# Start Content Management System
docker-compose up -d content-management-backend content-management-frontend

# Start Constellation Viewer
docker-compose up -d constellation-backend constellation-frontend

# Start PS2 Forum
docker-compose up -d ps2-forum-db ps2-forum

# Start Theme Components
docker-compose up -d theme-components-db theme-components

# Start Forum Plugins
docker-compose up -d forum-plugins-db forum-plugins
```

## Project Access Points

### JavaScript Projects
- **3D Visualization:** http://localhost:8081
- **Content Management Backend:** http://localhost:3001
- **Content Management Frontend:** http://localhost:3000
- **Constellation Backend:** http://localhost:3003/notebooks (API)
- **Constellation Frontend:** http://localhost:8090

### WordPress Projects
- **PS2 Forum:** http://localhost:8001
- **Theme Components:** http://localhost:8010
- **Forum Plugins:** http://localhost:8020

## PS2-Forum Project Details

### Visual Design Concept

The PS2-Forum project recreates the nostalgic aesthetic of early 2000s PlayStation 2 era forums with modern community features.

#### Color Scheme
- Deep blue header (#14418B) similar to PlayStation 2 UI
- Light gray background (#E8E8E8) for main content
- Table-based layout with subtle cell shading
- Pixel-perfect borders and beveled buttons

#### Typography
- System fonts like Verdana or Arial at 12px
- Bold blue thread titles
- Small gray timestamps and user info
- ALL CAPS for section headers and navigation

#### Navigation Elements
- Top navbar with gradient blue similar to PS2 memory card interface
- "Breadcrumb" navigation showing current location
- User control panel in the right sidebar
- "Who's online" counter showing active users

#### Thread Display
- Avatar on left (48x48px max)
- Username, post count, and join date under avatar
- Main content area with a light border
- Distinctive "OP" tag for original poster
- Custom signature area with divider line

#### Multi-dimensional Feedback System
- Star rating system using blue PS2-style stars
- Tag system with badges for content types
- Small color-coded badges for content classification
- Visual indicators showing thread "temperature" (activity level)

### Core Features

#### User Authentication and Profiles
- Custom profile fields for gamer tags/IDs
- Ability to link to in-game characters
- Achievement badges based on forum activity
- Signature area with limited BBCode support

#### Forum Structure
- Main categories (Game Discussion, Community, Support)
- Sub-forums for specific topics/games
- Pinned topics for important announcements
- "New posts since last visit" highlighting

#### Multi-dimensional Feedback
- Easy-to-use feedback controls on each post
- Visualizations showing aggregated feedback
- Content tagging system for easy searching
- Tag-based filtering of content

#### Game World Integration
- Player location tracking from Unity displayed on profiles
- Interactive map showing player positions
- In-game achievements displayed on forum profiles
- Game event announcements auto-posted to relevant forums

#### Moderation Tools
- Transparent moderation logs visible to all users
- Community reporting system with clear status tracking
- Democratic election system for moderators
- Public moderation guidelines and appeal process

### Current Implementation Status

#### Environment
- Docker setup with WordPress and MySQL running
- WordPress installation complete with bbPress plugin activated
- Custom PS2-Era Forum theme created and activated

#### Theme Files Created
- Basic theme structure (index.php, header.php, footer.php, sidebar.php, bbpress.php)
- Custom styling in style.css to replicate PS2-era forum aesthetics
- JavaScript implementation for multi-dimensional feedback system (forum-system.js)

#### Plugin Development
- Created ps2-forum-feedback.php plugin for handling the backend of feedback system
- REST API endpoints defined for storing and retrieving feedback data

#### Content Creation
- Created forums and topics in bbPress
- Created a homepage with shortcodes to display forums and recent activity

### Next Steps

#### Visual & UI Enhancements
- Gradient Header & Buttons: Apply a gradient to the header similar to the PS2 memory card UI
- Breadcrumb Navigation: Improve visibility and styling
- Forum Icons: Add small, era-appropriate icons next to forum categories
- Pixel Borders & Beveled Buttons: Enhance buttons and section borders with a pixel-perfect look
- ALL CAPS Section Headers: Ensure navigation and section headers follow the all-caps styling

#### Thread & Post Display
- User Ranks & Badges: Display post count, user rank, and join date under avatars
- Distinct OP Tag: Differentiate the original poster from others in a thread
- Custom Signature Lines: Allow users to include a signature with limited BBCode
- Feedback System UI: Display star ratings, content tags, and activity level indicators

#### Functional Enhancements
- "Who's Online" Sidebar: Show active users and recent activity
- User Control Panel: Provide customization options
- Pinned Topics Highlighting: Ensure pinned topics stand out visually
- Content Tagging & Search Filters: Add tag-based filtering
- Private Messaging System: Enable direct messages with a retro-styled inbox
- Game Integration Features: Display player location tracking and game data
- Moderation & Community Tools: Implement transparent moderation tools