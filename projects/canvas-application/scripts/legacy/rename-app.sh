#!/bin/bash

# Script to rename the app to "Canvas"
set -e
echo "=== Renaming app to Canvas ==="

# Update package.json with new name
echo "=== Updating package.json ==="
sed -i 's/"name": "my-excalidraw-app"/"name": "canvas"/' package.json

# Update all references in HTML files
echo "=== Updating HTML files ==="
find public -name "*.html" -exec sed -i 's/Excalidraw App/Canvas/g' {} \;
find public -name "*.html" -exec sed -i 's/my-excalidraw-app/canvas/g' {} \;

# Update page title and metadata
echo "=== Updating title and metadata ==="
if [ -f "public/index.html" ]; then
  sed -i 's/content="A drawing and diagramming application powered by Excalidraw"/content="Canvas - A drawing and diagramming application"/g' public/index.html
  sed -i 's/<title>Excalidraw App<\/title>/<title>Canvas<\/title>/g' public/index.html
fi

# Update App.js header
echo "=== Updating App.js ==="
if [ -f "src/App.js" ]; then
  sed -i 's/<h1>My Excalidraw App<\/h1>/<h1>Canvas<\/h1>/g' src/App.js
fi

# Update manifest.json
echo "=== Updating manifest.json ==="
if [ -f "public/manifest.json" ]; then
  sed -i 's/"short_name": "React App"/"short_name": "Canvas"/g' public/manifest.json
  sed -i 's/"name": "Create React App Sample"/"name": "Canvas - Drawing App"/g' public/manifest.json
fi

# Update README
echo "=== Updating README.md ==="
if [ -f "README.md" ]; then
  sed -i '1s/^# Excalidraw App/# Canvas/' README.md
  sed -i 's/A drawing and diagramming application powered by Excalidraw/A drawing and diagramming application/g' README.md
fi

echo "=== App renamed to Canvas! ==="
echo "To run the app: ./start-app.sh"