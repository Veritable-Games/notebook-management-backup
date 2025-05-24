# Naming Conventions

This document outlines the standardized naming conventions for the Veritable Games Repository. Following these conventions ensures consistency across the codebase and makes the project more maintainable.

## Directory and File Naming

### Directories

- Use kebab-case for all directory names: `backend-api`, `content-management`
- Exception: React component directories may use PascalCase

### Files

- JavaScript/TypeScript files:
  - Components: `PascalCase.jsx`, `PascalCase.tsx`
  - Utilities: `camelCase.js`, `camelCase.ts`
  - Configuration: `kebab-case.config.js`
- CSS/SCSS files: `component-name.css`, `component-name.module.scss`
- Test files: `filename.test.js`, `ComponentName.test.jsx`
- Documentation: `UPPER-KEBAB-CASE.md` for root-level docs
- Data files: `kebab-case.json`, `kebab-case.yaml`

## Code Naming

### JavaScript/TypeScript

- **Variables and Functions**: camelCase
  ```javascript
  const userData = fetchUserData();
  ```

- **Classes and React Components**: PascalCase
  ```javascript
  class UserManager {}
  function DataDisplay() {}
  ```

- **Constants**: UPPER_SNAKE_CASE
  ```javascript
  const MAX_RETRY_COUNT = 3;
  ```

- **Private Properties**: camelCase with leading underscore
  ```javascript
  this._privateProperty = value;
  ```

### CSS/SCSS

- **Class Names**: kebab-case
  ```css
  .user-profile-container {}
  ```

- **ID Selectors**: kebab-case
  ```css
  #main-content {}
  ```

## Service Naming

- Service names should be descriptive and use the format `{Purpose}-{Type}`
- Examples:
  - `content-management-backend`
  - `constellation-viewer-frontend`
  - `relationship-api`

## API Naming

### REST Endpoints

- Use plural nouns for resources
- Separate words with hyphens
- Follow RESTful conventions

Examples:
- GET `/api/users`
- POST `/api/content-items`
- PUT `/api/relationship-mappings/123`

### Query Parameters

- Use camelCase for query parameters
- Be descriptive but concise

Examples:
- `/api/users?sortBy=lastName&sortOrder=desc`
- `/api/content?includeArchived=true&pageSize=10`

## Environment Variables

- Use UPPER_SNAKE_CASE
- Group by purpose with double underscore as namespace separator

Examples:
- `NODE_ENV=development`
- `API__PORT=3000`
- `DATABASE__HOST=localhost`

## Branch Naming

- Feature branches: `feature/short-description`
- Bug fixes: `fix/short-description`
- Documentation: `docs/short-description`
- Releases: `release/v1.2.3`

## Commit Messages

Follow conventional commits format:
- `feat: add new feature`
- `fix: resolve bug in feature`
- `docs: update documentation`
- `style: format code`
- `refactor: restructure code without changing functionality`
- `test: add or modify tests`
- `chore: update build scripts, etc.`

## Documentation

- Use PascalCase with hyphens for main documentation files: `API-GUIDE.md`
- Use descriptive titles that clearly indicate the document's purpose
- Include the `.md` extension for all Markdown files