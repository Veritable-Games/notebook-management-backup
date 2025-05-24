# Utility Scripts

Collection of scripts for content conversion and service management.

## Script Categories

### Converters

Scripts for converting between content formats:

- `convert-to-obsidian.sh`: Convert .txt files to Markdown for Obsidian
- `export-wiki.sh`: Export wiki content to other formats
- `export-wiki.js`: JavaScript implementation of wiki export

### Services

Scripts for managing services:

- `restart-server.sh`: Restart application servers
- `service-audit.sh`: Check status of all services
- `launch-relationship-api.sh`: Start the relationship API server
- `launch-unified-interface.sh`: Start the unified interface

## Usage Examples

### Converting Content to Obsidian

```bash
./converters/convert-to-obsidian.sh
```

### Exporting Wiki Content

```bash
./converters/export-wiki.sh
```

### Managing Services

```bash
./services/restart-server.sh
```

## Adding New Scripts

When adding new scripts:

1. Place in the appropriate category directory
2. Make executable with `chmod +x your-script.sh`
3. Add documentation in this README
4. Ensure consistent naming conventions