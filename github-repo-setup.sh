#!/bin/bash
# github-repo-setup.sh - Setup GitHub repositories for Veritable Games projects
# Usage: ./github-repo-setup.sh

# GitHub organization and authentication
ORG="Veritable-Games"
GITHUB_USER="your-github-username" # Change this to your GitHub username

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
  echo "GitHub CLI (gh) not found. Would you like to install it? (y/n)"
  read install_gh
  
  if [[ "$install_gh" == "y" || "$install_gh" == "Y" ]]; then
    echo "Installing GitHub CLI..."
    type -p curl >/dev/null || sudo apt install curl -y
    curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
    && sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
    && sudo apt update \
    && sudo apt install gh -y
    
    # Login to GitHub
    echo "Please login to GitHub CLI:"
    gh auth login
  else
    echo "Continuing without GitHub CLI..."
  fi
fi

# Check if Git Credential Manager is installed
if ! command -v git-credential-manager &> /dev/null; then
  echo "Git Credential Manager not found. Would you like to install it? (y/n)"
  read install_gcm
  
  if [[ "$install_gcm" == "y" || "$install_gcm" == "Y" ]]; then
    echo "Installing Git Credential Manager..."
    wget "https://github.com/git-ecosystem/git-credential-manager/releases/download/v2.3.2/gcm-linux_amd64.2.3.2.deb" -O /tmp/gcm.deb
    sudo dpkg -i /tmp/gcm.deb
    git-credential-manager configure
    
    echo "Git Credential Manager installed."
  else
    echo "Continuing without Git Credential Manager..."
  fi
fi

# Determine authentication method
if command -v gh &> /dev/null && gh auth status &> /dev/null; then
  echo "Using GitHub CLI for authentication..."
  USE_GH_CLI=true
else
  echo "GitHub CLI not available or not authenticated."
  echo "Using Personal Access Token for authentication..."
  USE_GH_CLI=false
  
  # Ask for GitHub personal access token (needs repo and org permissions)
  read -sp "Enter your GitHub Personal Access Token: " GITHUB_TOKEN
  echo ""
  
  if [ -z "$GITHUB_TOKEN" ]; then
    echo "Error: GitHub token is required"
    exit 1
  fi
fi

# Function to create GitHub repository
create_github_repo() {
  local repo_name=$1
  local description=$2

  echo "Creating GitHub repository: $ORG/$repo_name"
  
  # Create repository using GitHub CLI or API
  if [ "$USE_GH_CLI" = true ]; then
    # Using GitHub CLI
    echo "Creating repository $repo_name using GitHub CLI..."
    
    gh repo create "$ORG/$repo_name" \
      --description "$description" \
      --private \
      --enable-issues \
      --enable-wiki
    
    # Check if repository was created successfully
    if [ $? -eq 0 ]; then
      repo_url="https://github.com/$ORG/$repo_name"
      echo "Repository created: $repo_url"
      ssh_url="git@github.com:$ORG/$repo_name.git"
      echo "SSH URL: $ssh_url"
      return 0
    else
      echo "Error creating repository with GitHub CLI"
      return 1
    fi
  else
    # Using GitHub API with token
    echo "Creating repository $repo_name using GitHub API..."
    
    response=$(curl -s -X POST \
      -H "Authorization: token $GITHUB_TOKEN" \
      -H "Accept: application/vnd.github.v3+json" \
      https://api.github.com/orgs/$ORG/repos \
      -d '{
        "name": "'"$repo_name"'",
        "description": "'"$description"'",
        "private": true,
        "has_issues": true,
        "has_projects": true,
        "has_wiki": true
      }')
    
    # Check if repository was created successfully
    if echo "$response" | grep -q "html_url"; then
      repo_url=$(echo "$response" | grep -o '"html_url":"[^"]*"' | cut -d'"' -f4)
      echo "Repository created: $repo_url"
      
      # Extract SSH URL from response
      ssh_url=$(echo "$response" | grep -o '"ssh_url":"[^"]*"' | cut -d'"' -f4)
      echo "SSH URL: $ssh_url"
      return 0
    else
      echo "Error creating repository:"
      echo "$response"
      return 1
    fi
  fi
}

# Function to setup project repository locally and push
setup_project_repo() {
  local project=$1
  local description=$2
  
  # Create GitHub repository
  create_github_repo "$project" "$description"
  if [ $? -ne 0 ]; then
    echo "Failed to create GitHub repository for $project"
    return 1
  fi
  
  # Setup locally
  local project_dir="/home/user/Repository/projects/$project"
  
  if [ ! -d "$project_dir" ]; then
    echo "Project directory not found: $project_dir"
    return 1
  fi
  
  cd "$project_dir"
  
  # Initialize Git if needed
  if [ ! -d ".git" ]; then
    git init
    
    # Create .gitignore
    cat > .gitignore << EOF
# Node.js
node_modules/
npm-debug.log
yarn-debug.log
yarn-error.log

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build directories
/build
/dist

# Coverage directory
/coverage

# Cache
.cache/
.npm/

# Editor directories and files
.idea/
.vscode/
*.swp
*.swo
.DS_Store
EOF

    # Setup GitHub Actions workflow for CI/CD
    mkdir -p .github/workflows
    
    cat > .github/workflows/ci.yml << EOF
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
      run: npm run lint || echo "Linting not configured"
    - name: Build
      run: npm run build || echo "Build not configured"
EOF

    # Add initial README.md
    cat > README.md << EOF
# $project

Part of Veritable Games platform.

## Features

* [Add key features here]

## Installation

\`\`\`bash
npm install
\`\`\`

## Usage

\`\`\`bash
npm start
\`\`\`

## Development

\`\`\`bash
npm run dev
\`\`\`

## License

© $(date +%Y) Veritable Games. All rights reserved.
EOF

    # Add all files
    git add .
    git commit -m "Initial repository setup"
    git branch -M main
    
    # Add GitHub remote
    git remote add origin git@github.com:$ORG/$project.git
    
    # Push to GitHub
    git push -u origin main
    
    echo "Repository setup complete for $project"
    echo "------------------------------------------"
  else
    echo "Git already initialized for $project"
    echo "Adding remote: git@github.com:$ORG/$project.git"
    
    # Check if origin remote exists
    if git remote | grep -q "origin"; then
      git remote set-url origin git@github.com:$ORG/$project.git
    else
      git remote add origin git@github.com:$ORG/$project.git
    fi
    
    git push -u origin main
    
    echo "Repository updated for $project"
    echo "------------------------------------------"
  fi
}

# Main projects with descriptions
declare -A PROJECTS
PROJECTS=(
  ["backend-api"]="RESTful API server for Veritable Games platform"
  ["constellation-viewer"]="Interactive wiki and document visualization tool"
  ["canvas-application"]="Interactive canvas drawing application with collaboration features"
  ["content-management"]="Content organization and management system"
  ["3d-visualization"]="3D visualization tools for content exploration"
  ["user-admin-portal"]="User and admin portal with integrated forum features"
  ["monitoring"]="Monitoring and status dashboard for Veritable Games services"
  ["visualization-tools"]="UI components and visualization tools for Veritable Games"
)

# Ask which projects to setup
echo "Select projects to setup on GitHub:"
echo "0) All projects"
i=1
for project in "${!PROJECTS[@]}"; do
  echo "$i) $project"
  i=$((i+1))
done

read -p "Enter numbers (separated by space) or 0 for all: " -a selections

if [[ "${selections[0]}" == "0" ]]; then
  # Setup all projects
  for project in "${!PROJECTS[@]}"; do
    setup_project_repo "$project" "${PROJECTS[$project]}"
  done
else
  # Setup selected projects
  i=1
  for project in "${!PROJECTS[@]}"; do
    if [[ " ${selections[@]} " =~ " $i " ]]; then
      setup_project_repo "$project" "${PROJECTS[$project]}"
    fi
    i=$((i+1))
  done
fi

echo ""
echo "GitHub repository setup complete!"
echo ""
echo "Additional steps:"
echo "1. Configure branch protection rules on GitHub"
echo "2. Add team members and set permissions"
echo "3. Configure GitHub Actions for CI/CD"