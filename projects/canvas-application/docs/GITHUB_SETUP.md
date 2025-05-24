# GitHub Repository Setup Instructions

Follow these steps to create and configure your company's Canvas repository on GitHub:

## 1. Create a New Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right and select "New repository"
3. Set the repository name to "canvas"
4. Choose your organization as the owner (or create an organization first)
5. Set visibility to "Private"
6. Do NOT initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

## 2. Push Your Local Repository

Once the repository is created, follow the commands shown on GitHub or use these:

```bash
# Add the GitHub repository as remote (replace with your actual URL)
git remote add origin https://github.com/your-organization/canvas.git

# Push the code to GitHub
git push -u origin master
```

## 3. Configure Repository Settings

After pushing your code, configure these settings in GitHub:

### Branch Protection

1. Go to Settings > Branches
2. Click "Add rule" under "Branch protection rules"
3. In "Branch name pattern", enter "main" (or "master")
4. Enable the following options:
   - ✓ Require pull request reviews before merging
   - ✓ Require status checks to pass before merging 
   - ✓ Require branches to be up to date before merging
   - ✓ Include administrators
5. Click "Create"
6. Repeat for "develop" branch if needed

### Team Permissions

1. Go to Settings > Manage access
2. Click "Invite teams or people"
3. Add your teams with these permission levels:
   - Administrators: Admin access (for team leaders/managers)
   - Developers: Write access (for all developers)
   - Viewers: Read access (for stakeholders/other departments)

### Enable Features

1. Go to Settings > Features
2. Enable "Issues"
3. Enable "Projects" 
4. Enable "Discussions" for team communication

## 4. Set Up GitHub Actions

GitHub Actions should be automatically configured by our CI workflow file.

## 5. Create Initial Project Board

1. Go to the "Projects" tab
2. Click "Create project"
3. Choose "Board" template
4. Configure columns: "To do", "In progress", "Review", "Done"
5. Add initial issues to track work

## 6. Webhooks and Integrations (Optional)

Consider setting up:
- Slack integration for notifications
- JIRA integration if you use it for project management
- GitHub Apps for code quality (CodeClimate, SonarCloud, etc.)

## Repository Configuration Complete!

Your Canvas repository is now ready for collaborative team development with appropriate permissions and protections.