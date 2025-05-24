#!/bin/bash
# git-setup.sh - Set up Git repositories for all Veritable Games projects
# Usage: ./git-setup.sh

# Base directory
REPO_DIR="/home/user/Repository/projects"

# GitHub organization name
ORG="Veritable-Games"

# Make sure SSH key is set up
if [ ! -f ~/.ssh/id_rsa ]; then
  echo "SSH key not found. Please set up an SSH key first:"
  echo "  ssh-keygen -t rsa -b 4096 -C \"your_email@example.com\""
  echo "Then add it to your GitHub account."
  exit 1
fi

# Initialize Git in the main repository if needed
if [ ! -d "/home/user/Repository/.git" ]; then
  echo "Initializing Git in main repository..."
  cd /home/user/Repository
  git init
  
  # Create .gitignore file
  cat > .gitignore << EOF
# Node.js
node_modules/
npm-debug.log
yarn-debug.log
yarn-error.log
package-lock.json

# Logs
logs
*.log

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build directories
dist/
build/
out/
.next/
.nuxt/

# Cache
.cache/
.npm/

# Coverage directory
coverage/

# Editor directories and files
.idea/
.vscode/
*.swp
*.swo
.DS_Store
EOF

  # Initial commit for the main repository
  git add .
  git commit -m "Initial commit for Veritable Games repository"
  git branch -M main
  
  # Prompt to add a remote for the main repository
  read -p "Do you want to add a remote for the main repository? (y/n) " ADD_REMOTE
  if [[ $ADD_REMOTE == "y" || $ADD_REMOTE == "Y" ]]; then
    read -p "Enter the GitHub repository URL (e.g., git@github.com:$ORG/Repository.git): " REPO_URL
    git remote add origin $REPO_URL
    echo "Remote added. You can now push with: git push -u origin main"
  fi
fi

# Function to set up a project repository
setup_project_repo() {
  local project=$1
  
  echo "Setting up Git for $project..."
  
  # Navigate to the project directory
  cd "$REPO_DIR/$project"
  
  # Initialize Git if needed
  if [ ! -d ".git" ]; then
    git init
    
    # Create .gitignore file
    cat > .gitignore << EOF
# Node.js
node_modules/
npm-debug.log
yarn-debug.log
yarn-error.log

# Logs
logs
*.log

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build directories
dist/
build/
out/
.next/
.nuxt/

# Cache
.cache/
.npm/

# Coverage directory
coverage/

# Editor directories and files
.idea/
.vscode/
*.swp
*.swo
.DS_Store
EOF
    
    # Initial commit
    git add .
    git commit -m "Initial commit for $project"
    git branch -M main
    
    # Add remote
    echo "Adding remote for $project..."
    git remote add origin "git@github.com:$ORG/$project.git"
    
    echo "Git repository set up for $project"
    echo "To push to GitHub: git push -u origin main"
    echo "------------------------------------------"
  else
    echo "Git repository already exists for $project"
    echo "------------------------------------------"
  fi
}

# List of projects to set up
PROJECTS=(
  "backend-api"
  "constellation-viewer"
  "canvas-application" 
  "content-management"
  "3d-visualization"
  "user-admin-portal"
  "monitoring"
  "visualization-tools"
)

# Set up repositories for each project
echo "Setting up Git repositories for all projects..."
for project in "${PROJECTS[@]}"; do
  setup_project_repo "$project"
done

echo "All Git repositories have been set up!"
echo ""
echo "Next steps:"
echo "1. Create the repositories on GitHub (if not already created)"
echo "2. Push each project: cd $REPO_DIR/[project-name] && git push -u origin main"
echo ""
echo "For new repositories on GitHub:"
echo "  - Go to https://github.com/organizations/$ORG/repositories/new"
echo "  - Set the repository name to match the project name"
echo "  - Set it as Private"
echo "  - Do not initialize with README, .gitignore, or license"
echo "  - Create repository"