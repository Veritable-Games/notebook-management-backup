# Veritable Games Repository

A collection of tools for game design documentation, visualization, and web interfaces.

## What's Included

- **Wiki/Notebook Viewer** - Browse and edit game design documents
- **Relationship Visualization** - See how content is connected
- **Content Management** - Organize your game design materials

## Getting Started

See [GETTING_STARTED.md](./GETTING_STARTED.md) for a simple guide to using this repository.

## Running the Applications

1. **Start everything**:
   ```bash
   ./start-all.sh
   ```

2. **Access the applications**:
   - Wiki Viewer: http://localhost:8081/
   - Relationship Visualization: http://localhost:8081/relationships

3. **Stop everything**:
   ```bash
   ./stop-all.sh
   ```

## Project Structure

```
Repository/
├── notebooks/       # Game design documents and notes
├── projects/        # Application code
├── config/          # Configuration
├── data/            # Data storage
└── logs/            # Log files
```

## Notebooks

The repository contains game design documents in the `notebooks/` directory:

- **Game Projects**: `notebooks/game-projects/`
- **Reference Material**: `notebooks/reference/`
- **Various Notes**: `notebooks/All of it Anything Everything At Once/`

## Managing Services

Use the service manager to control individual services:

```bash
# Check what's running
./service-manager.sh status

# Start just the backend
./service-manager.sh start backend-api

# Restart a specific service
./service-manager.sh restart constellation-viewer
```

## Need More Information?

More detailed documentation is available in the `docs/` directory.

## License

© 2025 Veritable Games. All rights reserved.