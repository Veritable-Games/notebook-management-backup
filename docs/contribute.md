# Contributing to Veritable Games Projects

This document provides guidelines for contributing to Veritable Games repositories.

## Project Structure

Veritable Games consists of multiple interconnected projects:

- **Backend API** - RESTful API server
- **Constellation Viewer** - Wiki and document visualization
- **Canvas Application** - Interactive drawing application
- **Content Management** - Content organization system
- **3D Visualization** - 3D visualization tools
- **User Admin Portal** - User and admin portal
- **Monitoring** - System monitoring

## Development Workflow

### 1. Setting Up Your Environment

1. Clone the repository:
   ```bash
   git clone git@github.com:Veritable-Games/[project-name].git
   ```

2. Install dependencies:
   ```bash
   cd [project-name]
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### 2. Branch Naming Convention

- Feature branches: `feature/[issue-number]-short-description`
- Bug fixes: `fix/[issue-number]-short-description`
- Documentation: `docs/short-description`
- Refactoring: `refactor/short-description`

### 3. Code Style

All projects follow consistent code style:

- Use ESLint and Prettier for code formatting
- Follow the project-specific linting rules
- Run linting before committing: `npm run lint`

### 4. Making Changes

1. Create a new branch from `main`:
   ```bash
   git checkout -b feature/[issue-number]-short-description
   ```

2. Make your changes, following the code style guidelines

3. Write tests for your changes when applicable

4. Run tests to ensure they pass:
   ```bash
   npm test
   ```

5. Commit your changes with a descriptive message:
   ```bash
   git commit -m "Feature: Add new functionality for X"
   ```

### 5. Pull Requests

1. Push your branch to GitHub:
   ```bash
   git push origin feature/[issue-number]-short-description
   ```

2. Create a pull request on GitHub

3. Fill out the pull request template with:
   - Description of changes
   - Issue(s) addressed
   - Testing performed
   - Any potential concerns

4. Wait for code review

5. Address any feedback from the review

6. Once approved, your changes will be merged into `main`

## Integration Between Projects

When working on features that span multiple repositories:

1. Create issues in all affected repositories
2. Reference these issues in your commits and PRs
3. Ensure changes are backward compatible 
4. Update the integration tests

## Running the Entire System

To run all components of the Veritable Games platform:

1. Start all services:
   ```bash
   ./start-all.sh
   ```

2. Access the monitoring dashboard:
   ```
   http://localhost:9090/dashboard.html
   ```

3. Stop all services:
   ```bash
   ./stop-all.sh
   ```

## Release Process

Releases follow semantic versioning (MAJOR.MINOR.PATCH):

1. MAJOR: Incompatible API changes
2. MINOR: Backward-compatible new functionality
3. PATCH: Backward-compatible bug fixes

All releases are tagged in Git and documented in the project CHANGELOG.md.

## Contact

For questions or assistance:

- Create an issue on the repository
- Contact the project maintainers
- Join the developer Slack channel