# Getting Started with Veritable Games

This guide provides a simple introduction to working with this repository.

## The Basics

This project is a collection of tools for game design, documentation, and visualization.

### Main Components

1. **Wiki/Notebook Viewer** - Browse and edit notebooks and documentation
2. **Relationship Visualization** - See how content is connected
3. **Content Management** - Organize your game design documents

## Quick Start

### 1. Start the Services

Run this command from the repository root:

```bash
./start-all.sh
```

This will start all the necessary services.

### 2. Access the Applications

Once everything is running, open these URLs in your browser:

- **Wiki Viewer**: http://localhost:8081/
- **Relationship Visualization**: http://localhost:8081/relationships

### 3. Stopping Services

When you're done, stop all services with:

```bash
./stop-all.sh
```

## Working with Notebooks

The repository comes with notebooks organized in the `notebooks/` directory. 

Important notebooks:
- Game design documents in `notebooks/game-projects/`
- Reference materials in `notebooks/reference/`

## Need More Information?

If you need more detailed information:

- Check `README.md` for an overview of the project
- Look at `docs/guides/` for specific how-to guides
- Run `./service-manager.sh status` to see what's running

## Troubleshooting

If something isn't working:

1. Make sure all services are running with `./service-manager.sh status`
2. Check logs in the `logs/` directory
3. Try restarting services with `./restart-all.sh`