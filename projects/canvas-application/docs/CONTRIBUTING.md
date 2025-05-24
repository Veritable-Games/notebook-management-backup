# Contributing to Canvas

Thank you for your interest in contributing to Canvas! This document provides guidelines and instructions for contributing to our collaborative drawing tool.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone. Harassment, discrimination, or disruptive behavior will not be tolerated.

## Development Process

### Getting Started

1. Set up your development environment following the README instructions
2. Familiarize yourself with the codebase and architecture
3. Browse the issues to find something to work on

### Branching Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features and enhancements
- `bugfix/*` - Bug fixes
- `release/*` - Release preparation

### Pull Request Process

1. Create a branch from `develop` with an appropriate prefix
2. Make your changes, following our coding standards
3. Write or update tests as necessary
4. Update documentation for your changes
5. Submit a pull request to the `develop` branch
6. Address any feedback from code reviewers

### Code Review Guidelines

- Reviewers should respond within 2 business days
- Focus on code quality, not style preferences
- Be constructive and respectful
- Explain reasoning behind suggestions

## Coding Standards

### JavaScript/React

- Follow ESLint rules in the project
- Use functional components with hooks
- Keep components small and focused
- Use prop types or TypeScript for type checking
- Write descriptive variable and function names

### CSS

- Follow the existing styling methodology
- Make components responsive
- Use variables for colors and spacing

### Testing

- Write unit tests for new functionality
- Ensure existing tests still pass
- Consider edge cases in your tests

## Documentation

- Update README.md if adding features or changing functionality
- Comment complex code sections
- Include JSDoc comments for functions and components
- Provide usage examples for new features

## Permissions

Team members have the following permissions:

- Developers: Push to feature branches, create PRs
- Reviewers: Review and approve PRs
- Maintainers: Merge PRs to develop/main, manage releases

## Questions?

If you have questions about contributing, reach out to the team lead or post in the #canvas-development channel.