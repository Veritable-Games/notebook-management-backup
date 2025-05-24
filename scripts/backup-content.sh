#!/bin/bash

# Automated Content Backup Script
# Backs up notebooks, projects, and configurations

set -e

BACKUP_DIR="/home/user/Repository/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="repository_backup_${TIMESTAMP}"
BACKUP_PATH="${BACKUP_DIR}/${BACKUP_NAME}"

echo "Starting content backup: ${BACKUP_NAME}"

# Create backup directory if it doesn't exist
mkdir -p "${BACKUP_DIR}"

# Create timestamped backup directory
mkdir -p "${BACKUP_PATH}"

# Backup notebooks (most important content)
echo "Backing up notebooks..."
if [ -d "/home/user/Notebooks" ]; then
    cp -r "/home/user/Notebooks" "${BACKUP_PATH}/Notebooks"
    echo "  ✓ Notebooks backed up"
else
    echo "  ⚠ Notebooks directory not found"
fi

# Backup repository notebooks
echo "Backing up repository notebooks..."
if [ -d "/home/user/Repository/notebooks" ]; then
    cp -r "/home/user/Repository/notebooks" "${BACKUP_PATH}/repository_notebooks"
    echo "  ✓ Repository notebooks backed up"
fi

# Backup project configurations
echo "Backing up project configurations..."
mkdir -p "${BACKUP_PATH}/projects"

# Backup important project files (not node_modules)
for project in /home/user/Repository/projects/*/; do
    if [ -d "$project" ]; then
        project_name=$(basename "$project")
        echo "  Backing up project: $project_name"
        
        mkdir -p "${BACKUP_PATH}/projects/${project_name}"
        
        # Copy important files, exclude large directories
        rsync -av --exclude='node_modules' \
                  --exclude='dist' \
                  --exclude='build' \
                  --exclude='.git' \
                  --exclude='*.log' \
                  --exclude='*.pid' \
                  "$project" "${BACKUP_PATH}/projects/${project_name}/"
    fi
done

# Backup configuration files
echo "Backing up configurations..."
mkdir -p "${BACKUP_PATH}/config"

# Important config files
for config_file in \
    "/home/user/Repository/docker-compose.yml" \
    "/home/user/Repository/CLAUDE.md" \
    "/home/user/Repository/data/tags.json" \
    "/home/user/Repository/config/"; do
    
    if [ -e "$config_file" ]; then
        cp -r "$config_file" "${BACKUP_PATH}/config/"
    fi
done

# Backup relationships and data
echo "Backing up relationship data..."
if [ -d "/home/user/Repository/data" ]; then
    cp -r "/home/user/Repository/data" "${BACKUP_PATH}/data"
fi

# Create backup manifest
echo "Creating backup manifest..."
cat > "${BACKUP_PATH}/BACKUP_MANIFEST.txt" << EOF
Repository Content Backup
=========================
Created: $(date)
Backup: ${BACKUP_NAME}

Contents:
- Notebooks (primary content)
- Repository notebooks  
- Project configurations (excluding node_modules)
- Docker compose configuration
- Relationship data
- Tags and metadata

Backup Statistics:
EOF

# Add size information
du -sh "${BACKUP_PATH}"/* >> "${BACKUP_PATH}/BACKUP_MANIFEST.txt" 2>/dev/null || true

# Create compressed archive
echo "Creating compressed archive..."
cd "${BACKUP_DIR}"
tar -czf "${BACKUP_NAME}.tar.gz" "${BACKUP_NAME}"

# Calculate archive size
ARCHIVE_SIZE=$(du -sh "${BACKUP_NAME}.tar.gz" | cut -f1)

# Remove uncompressed backup directory
rm -rf "${BACKUP_NAME}"

# Cleanup old backups (keep last 7 days)
echo "Cleaning up old backups..."
find "${BACKUP_DIR}" -name "repository_backup_*.tar.gz" -mtime +7 -delete

echo "✓ Backup completed successfully!"
echo "  Archive: ${BACKUP_DIR}/${BACKUP_NAME}.tar.gz"
echo "  Size: ${ARCHIVE_SIZE}"
echo "  Location: ${BACKUP_PATH}"

# Log backup completion
echo "$(date): Backup ${BACKUP_NAME} completed (${ARCHIVE_SIZE})" >> "${BACKUP_DIR}/backup.log"