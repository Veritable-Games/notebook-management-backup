#!/bin/bash
#
# Static Wiki Generator Script
#
# This script generates a static HTML wiki from notebooks

# Set up variables
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"

echo "=== Static Wiki Generator ==="
echo "Starting generation process..."

# Make sure node is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is required but not installed."
    exit 1
fi

# Create output directory if it doesn't exist
mkdir -p "$REPO_ROOT/static-wiki"

# Run the generator script
echo "Generating wiki from notebooks..."
node "$SCRIPT_DIR/static-wiki-generator.js"

# Check if generation was successful
if [ $? -eq 0 ]; then
    echo "Wiki generation completed successfully!"
    
    # Find a way to open the wiki in the default browser
    if command -v xdg-open &> /dev/null; then
        echo "Opening wiki in browser..."
        xdg-open "$REPO_ROOT/static-wiki/index.html"
    elif command -v open &> /dev/null; then
        echo "Opening wiki in browser..."
        open "$REPO_ROOT/static-wiki/index.html"
    else
        echo "To view the wiki, open this file in your browser:"
        echo "$REPO_ROOT/static-wiki/index.html"
    fi
else
    echo "Error: Wiki generation failed."
    exit 1
fi