#!/bin/bash

# ZIM Wiki Export Script
# This script exports ZIM wiki content to plain text or markdown files

# Configuration
SOURCE_DIR="/home/user/Repository/Notebooks"
OUTPUT_DIR="/home/user/Repository/ExportedWiki"
FORMAT="markdown"  # markdown or plaintext
WIKI_LINKS=true  # preserve wiki links

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Function to process a single file
process_file() {
  local file="$1"
  local rel_path=$(realpath --relative-to="$SOURCE_DIR" "$file")
  local output_dir="$OUTPUT_DIR/$(dirname "$rel_path")"
  local base_name=$(basename "$file" .txt)
  
  # Create output directory
  mkdir -p "$output_dir"
  
  # Determine output extension
  local ext=".txt"
  if [ "$FORMAT" == "markdown" ]; then
    ext=".md"
  fi
  
  local output_file="$output_dir/$base_name$ext"
  
  echo "Processing: $file -> $output_file"
  
  # Check if it's a ZIM wiki file
  if grep -q "Content-Type: text/x-zim-wiki" "$file"; then
    # Remove ZIM headers
    sed -E '/Content-Type: text\/x-zim-wiki/d; /Wiki-Format: zim/d; /Creation-Date:/d' "$file" > "$output_file"
    
    # Convert formats if needed
    if [ "$FORMAT" == "markdown" ]; then
      # Convert headers
      sed -i -E 's/====== ([^=]+) ======/# \1/g; s/===== ([^=]+) =====/## \1/g; s/==== ([^=]+) ====/### \1/g; s/=== ([^=]+) ===/#### \1/g; s/== ([^=]+) ==/##### \1/g' "$output_file"
      
      # Convert formatting
      sed -i -E 's/\*\*([^*]+)\*\*/\*\*\1\*\*/g; s/\/\/([^/]+)\/\//\*\1\*/g' "$output_file"
      
      # Convert lists
      sed -i -E 's/^\* /- /g' "$output_file"
      
      # Handle wiki links
      if [ "$WIKI_LINKS" = true ]; then
        # Preserve wiki links
        echo "Preserving wiki links in $output_file"
      else
        # Convert wiki links to markdown
        sed -i -E 's/\[\[([^\]|:]+)\]\]/[\1](\1)/g; s/\[\[([^\]|:]+)\|([^\]]+)\]\]/[\2](\1)/g' "$output_file"
      fi
    fi
    
    echo "Exported: $output_file"
  else
    echo "Skipping non-ZIM file: $file"
  fi
}

# Function to process a directory
process_dir() {
  local dir="$1"
  
  # Process each text file in the directory
  find "$dir" -name "*.txt" -type f | while read -r file; do
    process_file "$file"
  done
}

# Main execution
echo "Starting export from $SOURCE_DIR to $OUTPUT_DIR (format: $FORMAT)"
process_dir "$SOURCE_DIR"
echo "Export completed!"

# Print stats
echo "----------------------------------------"
echo "Export Statistics:"
echo "Source files: $(find "$SOURCE_DIR" -name "*.txt" -type f | wc -l)"
echo "Exported files: $(find "$OUTPUT_DIR" -name "*.*" -type f | wc -l)"
echo "----------------------------------------"