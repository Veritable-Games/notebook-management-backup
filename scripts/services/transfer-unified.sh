#!/bin/bash

# We'll upload our unified page through the existing wiki system
# rather than trying to modify the running server

echo "Creating a unified wiki page..."

# Read the HTML content
CONTENT=$(cat /home/user/simple-unified.html)

# Escape JSON special characters in the content
ESCAPED_CONTENT=$(echo "$CONTENT" | sed 's/\\/\\\\/g' | sed 's/"/\\"/g' | sed 's/\n/\\n/g')

# Create the JSON payload
JSON="{\"title\": \"Unified Interface\", \"content\": \"$ESCAPED_CONTENT\", \"tags\": [\"interface\", \"wiki\"]}"

# Save it to a file
echo "$JSON" > /tmp/unified-payload.json

# Upload it using curl
echo "Uploading..."
curl -s -X POST http://localhost:3003/pages -H "Content-Type: application/json" -d "@/tmp/unified-payload.json"

echo ""
echo "Unified interface is now available at: http://localhost:3003/pages/Unified%20Interface"