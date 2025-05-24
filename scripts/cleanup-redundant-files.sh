#!/bin/bash
# cleanup-redundant-files.sh
#
# This script identifies and removes redundant files and directories in the repository
# as part of the reorganization process.
#
# IMPORTANT: Review the lists of files to be removed before confirming removal.

set -e

# Terminal colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

REPO_ROOT="/home/user/Repository"
cd "$REPO_ROOT"

echo -e "${BLUE}Identifying redundant files and directories...${NC}"

# Create a temporary directory for storing lists of files to remove
TEMP_DIR=$(mktemp -d)
REDUNDANT_SCRIPTS="$TEMP_DIR/redundant_scripts.txt"
REDUNDANT_CONFIGS="$TEMP_DIR/redundant_configs.txt"
REDUNDANT_DIRS="$TEMP_DIR/redundant_dirs.txt"

# -----------------------------
# Identify redundant script files
# -----------------------------
echo -e "${YELLOW}Checking for redundant scripts...${NC}"

# Find duplicate service management scripts
find ./projects -name "start-all*.sh" -o -name "stop-all*.sh" -o -name "service-manager*.sh" | sort > "$REDUNDANT_SCRIPTS"

# Find redundant standalone script files outside of scripts/ directory
find . -path "./scripts" -prune -o -name "*.sh" -not -path "./service-manager.sh" -not -path "./start-all.sh" -not -path "./stop-all.sh" -not -path "./restart-all.sh" -not -path "./projects/*-application/*.sh" | sort >> "$REDUNDANT_SCRIPTS"

# -----------------------------
# Identify redundant configuration files
# -----------------------------
echo -e "${YELLOW}Checking for redundant configuration files...${NC}"

# Find duplicate service configuration files (only outside the main config directory)
find ./projects -path "./projects/config" -prune -o -name "services.json" -print | sort > "$REDUNDANT_CONFIGS"

# -----------------------------
# Identify redundant directories
# -----------------------------
echo -e "${YELLOW}Checking for redundant directories...${NC}"

# Directories that should be consolidated
echo "./projects/config" > "$REDUNDANT_DIRS"
echo "./projects/logs" >> "$REDUNDANT_DIRS"
echo "./projects/pids" >> "$REDUNDANT_DIRS"
echo "./projects/documentation" >> "$REDUNDANT_DIRS"
echo "./WebProjects" >> "$REDUNDANT_DIRS"

# -----------------------------
# Show identified files and ask for confirmation
# -----------------------------
echo -e "${GREEN}Found the following redundant files and directories:${NC}"
echo -e "${BLUE}Redundant Scripts:${NC}"
cat "$REDUNDANT_SCRIPTS"
echo

echo -e "${BLUE}Redundant Configuration Files:${NC}"
cat "$REDUNDANT_CONFIGS"
echo

echo -e "${BLUE}Redundant Directories:${NC}"
cat "$REDUNDANT_DIRS"
echo

echo -e "${RED}WARNING: This will remove the above files and directories.${NC}"
read -p "Do you want to continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo -e "${YELLOW}Operation cancelled.${NC}"
    rm -rf "$TEMP_DIR"
    exit 0
fi

# -----------------------------
# Process redundant scripts
# -----------------------------
echo -e "${BLUE}Removing redundant scripts...${NC}"
while IFS= read -r file; do
    if [ -f "$file" ]; then
        echo "Removing $file"
        rm "$file"
    fi
done < "$REDUNDANT_SCRIPTS"

# -----------------------------
# Process redundant configuration files
# -----------------------------
echo -e "${BLUE}Removing redundant configuration files...${NC}"
while IFS= read -r file; do
    if [ -f "$file" ]; then
        echo "Removing $file"
        rm "$file"
    fi
done < "$REDUNDANT_CONFIGS"

# -----------------------------
# Process redundant directories
# -----------------------------
echo -e "${BLUE}Handling redundant directories...${NC}"
while IFS= read -r dir; do
    if [ -d "$dir" ]; then
        # Special handling for config directory - move contents to new location
        if [ "$dir" == "./projects/config" ]; then
            echo "Moving contents from $dir to ./config"
            mkdir -p ./config
            cp -r "$dir"/* ./config/
            echo "Removing $dir"
            rm -rf "$dir"
        # Special handling for documentation directory - move contents to new location
        elif [ "$dir" == "./projects/documentation" ]; then
            echo "Moving contents from $dir to ./docs"
            mkdir -p ./docs
            cp -r "$dir"/* ./docs/
            echo "Removing $dir"
            rm -rf "$dir"
        # Special handling for logs directory - move contents to new location
        elif [ "$dir" == "./projects/logs" ]; then
            echo "Moving contents from $dir to ./logs"
            mkdir -p ./logs
            cp -r "$dir"/* ./logs/
            echo "Removing $dir"
            rm -rf "$dir"
        # WebProjects special handling - move any unique content to projects/
        elif [ "$dir" == "./WebProjects" ]; then
            echo "WARNING: Not automatically removing WebProjects directory."
            echo "Please manually review and migrate any unique content to the projects/ directory."
        # For other directories, just remove them
        else
            echo "Removing $dir"
            rm -rf "$dir"
        fi
    fi
done < "$REDUNDANT_DIRS"

# -----------------------------
# Cleanup temporary files
# -----------------------------
rm -rf "$TEMP_DIR"

echo -e "${GREEN}Cleanup complete.${NC}"
echo -e "${YELLOW}Note: Some directories like WebProjects may require manual review.${NC}"
echo -e "${YELLOW}To avoid accidental data loss, these were not automatically removed.${NC}"