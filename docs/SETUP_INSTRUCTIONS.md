# Veritable Games Repository Setup Instructions

## Project Overview

Veritable Games consists of multiple interconnected services that work together to provide a comprehensive platform for game design, documentation, and collaboration.

## Naming Conventions

### Repository Names

Use consistent naming for repositories:

| Project | Repository Name |
|---------|----------------|
| Backend API | `vg-backend-api` |
| Constellation Viewer | `vg-constellation` |
| Canvas Application | `vg-canvas` |
| Content Management | `vg-content` |
| 3D Visualization | `vg-3d-viz` |
| User Admin Portal | `vg-user-portal` |
| Monitoring | `vg-monitoring` |
| Visualization Tools | `vg-viz-tools` |

### Branch Names

- Main branch: `main`
- Feature branches: `feature/[issue-number]-short-description`
- Bug fixes: `fix/[issue-number]-short-description`
- Documentation: `docs/short-description`
- Refactoring: `refactor/short-description`

### Commit Messages

Follow conventional commits format:
- `feat: add new feature`
- `fix: resolve bug in feature`
- `docs: update documentation`
- `style: format code`
- `refactor: restructure code without changing functionality`
- `test: add or modify tests`
- `chore: update build scripts, etc.`

### File and Directory Naming

- JavaScript files: `camelCase.js`
- React components: `PascalCase.js`
- CSS files: `component-name.css`
- Test files: `component-name.test.js`
- Configuration files: `kebab-case.config.js`
- Directory names: `kebab-case`

## GitHub Repository Setup

### Prerequisites

1. GitHub account with admin access to the Veritable Games organization
2. SSH key set up with GitHub
3. Personal access token with repo and organization permissions

### Setup Tools

#### GitHub CLI

GitHub CLI provides a command-line interface to GitHub:

```bash
# Install GitHub CLI
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-key C99B11DEB97541F0
sudo apt-add-repository https://cli.github.com/packages
sudo apt update
sudo apt install gh

# Authenticate with GitHub
gh auth login
```

#### Git Credential Manager

Git Credential Manager helps securely store authentication credentials:

```bash
# Install Git Credential Manager
wget "https://github.com/git-ecosystem/git-credential-manager/releases/download/v2.3.2/gcm-linux_amd64.2.3.2.deb"
sudo dpkg -i gcm-linux_amd64.2.3.2.deb
git-credential-manager configure
```

### Automated Setup

Use the provided GitHub setup script:

```bash
./github-repo-setup.sh
```

This script will:
1. Check for GitHub CLI and Git Credential Manager
2. Install them if needed
3. Create repositories for all projects
4. Initialize local Git repositories
5. Push initial commits to GitHub

### Manual Setup Process

1. **Create GitHub Repository**
   ```bash
   gh repo create Veritable-Games/vg-canvas --private --description "Interactive canvas drawing application"
   ```

2. **Clone and Set Up**
   ```bash
   git clone git@github.com:Veritable-Games/vg-canvas.git
   cd vg-canvas
   ```

3. **Add Initial Files**
   ```bash
   # Add README, .gitignore, etc.
   git add .
   git commit -m "Initial setup"
   git push -u origin main
   ```

## Project Directory Structure

Each project should follow this structure:

```
project-name/
├── .github/                 # GitHub configuration
│   └── workflows/           # GitHub Actions workflows
├── src/                     # Source code
├── tests/                   # Test files
├── docs/                    # Documentation
├── public/                  # Static assets
├── config/                  # Configuration files
├── scripts/                 # Utility scripts
├── .gitignore               # Git ignore file
├── README.md                # Project documentation
├── CHANGELOG.md             # Change log
├── LICENSE                  # License file
└── package.json             # Dependency management
```

## Configuration Standards

### package.json Scripts

Each project should have consistent npm scripts:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "webpack --config webpack.config.js",
    "test": "jest",
    "lint": "eslint src",
    "format": "prettier --write src",
    "docs": "jsdoc -c jsdoc.json",
    "prepare": "husky install"
  }
}
```

### ESLint Configuration

Create `.eslintrc.js`:
```javascript
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    // Custom rules here
  }
};
```

### Prettier Configuration

Create `.prettierrc`:
```json
{
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "semi": true
}
```

### Jest Configuration

Create `jest.config.js`:
```javascript
module.exports = {
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/index.js',
    '!src/setupTests.js'
  ]
};
```

## Continuous Integration/Deployment

### GitHub Actions Workflow

Create `.github/workflows/ci.yml`:
```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 18
        cache: 'npm'
    - name: Install dependencies
      run: npm ci
    - name: Lint
      run: npm run lint
    - name: Test
      run: npm test
    - name: Build
      run: npm run build
```

## Documentation Standards

### README.md Template

Each project should include:
- Project description
- Features
- Installation instructions
- Usage examples
- Development guide
- Testing instructions
- Deployment process
- License information

### Code Documentation

- Use JSDoc for documenting functions and classes
- Include examples where appropriate
- Document types for parameters and return values

## Service Management

### Starting All Services

```bash
./start-all.sh
```

### Stopping All Services

```bash
./stop-all.sh
```

### Monitoring Dashboard

Access at:
```
http://localhost:9090/dashboard.html
```

## Git Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/123-new-feature
   ```

2. **Make Changes**
   - Follow coding standards
   - Write tests
   - Update documentation

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

4. **Push Changes**
   ```bash
   git push origin feature/123-new-feature
   ```

5. **Create Pull Request**
   ```bash
   gh pr create --title "Feature: Add new functionality" --body "Description of changes"
   ```

6. **Merge to Main**
   ```bash
   gh pr merge --squash
   ```

## Canvas Application Status

The Canvas Application is currently set up with GitHub integration:
- Repository: `git@github.com:Veritable-Games/canvas.git`
- Status: ✅ Initialized, no commits yet

To push Canvas Application to GitHub:
```bash
cd /home/user/Repository/projects/canvas-application
git add .
git commit -m "Initial commit"
git push -u origin main
```

## Additional Conventions

### API Endpoints

- RESTful API endpoints
- Use versioning: `/api/v1/resource`
- Respond with appropriate HTTP status codes
- Include consistent error formats

### Database Schemas

For MongoDB models:
- Use singular names (e.g., `User`, not `Users`)
- Include timestamps
- Define indexes for query optimization
- Use SchemaTypes validation

### Component Structure (React)

```javascript
// ComponentName.js
import React from 'react';
import PropTypes from 'prop-types';
import './ComponentName.css';

const ComponentName = (props) => {
  // Component logic
  return (
    // JSX
  );
};

ComponentName.propTypes = {
  // Define prop types
};

ComponentName.defaultProps = {
  // Define default props
};

export default ComponentName;
```

### State Management

- Use Redux for complex state management
- Use Context API for simpler state sharing
- Use local state for component-specific state

### Security Practices

- Store secrets in environment variables
- Implement proper authentication and authorization
- Validate all user inputs
- Use HTTPS for all communications
- Implement CSRF protection

## Final Checklist

- [ ] GitHub repositories created
- [ ] Project structure standardized
- [ ] Configuration files set up
- [ ] CI/CD implemented
- [ ] Documentation completed
- [ ] Services working locally
- [ ] Security practices implemented
- [ ] Code standards enforced