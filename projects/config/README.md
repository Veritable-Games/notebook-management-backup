# Configuration

Central configuration files for all projects and services.

## Configuration Files

- `project-structure.json`: Repository structure and component relationships
- `services.json`: Service definitions and dependencies
- `ports.json`: Port assignments for all services
- `paths.json`: Filesystem paths for various components

## Usage

Configuration files are referenced by scripts and services to maintain consistency across the repository:

```javascript
const config = require('../config/project-structure.json');
console.log(config.structure.projects.children);
```

## Adding New Configuration

When adding new configuration files:

1. Use descriptive names
2. Follow the established JSON schema
3. Add documentation in this README
4. Reference from relevant components

## Schema Validation

Configuration files can be validated with:

```bash
cd scripts/services
./validate-config.sh
```