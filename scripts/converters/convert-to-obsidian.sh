#!/bin/bash

# Convert ZIM wiki files to Markdown for Obsidian
# This script preserves wiki links while converting the format

SOURCE_DIR="/home/user/Repository/Notebooks"
OUTPUT_DIR="/home/user/ObsidianVault"

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Function to convert a file
convert_file() {
  local file="$1"
  local rel_path=$(realpath --relative-to="$SOURCE_DIR" "$file")
  local output_dir="$OUTPUT_DIR/$(dirname "$rel_path")"
  local base_name=$(basename "$file" .txt)
  
  # Create output directory
  mkdir -p "$output_dir"
  
  # Output file
  local output_file="$output_dir/$base_name.md"
  
  echo "Processing: $file -> $output_file"
  
  # Check if it's a ZIM wiki file
  if grep -q "Content-Type: text/x-zim-wiki" "$file"; then
    # Remove ZIM headers and convert to Markdown format
    sed -E '/Content-Type: text\/x-zim-wiki/d; 
             /Wiki-Format: zim/d; 
             /Creation-Date:/d;
             s/====== ([^=]+) ======/# \1/g; 
             s/===== ([^=]+) =====/## \1/g; 
             s/==== ([^=]+) ====/### \1/g; 
             s/=== ([^=]+) ===/#### \1/g; 
             s/== ([^=]+) ==/##### \1/g;
             s/\*\*([^*]+)\*\*/\*\*\1\*\*/g;
             s/\/\/([^/]+)\/\//\*\1\*/g;
             s/^\* /- /g' "$file" > "$output_file"
    
    echo "Converted: $output_file"
  else
    # Just copy non-ZIM file with .md extension
    cp "$file" "$output_file"
    echo "Copied: $output_file"
  fi
}

# Process all txt files
find "$SOURCE_DIR" -name "*.txt" -type f | while read -r file; do
  convert_file "$file"
done

# Create an index file
cat > "$OUTPUT_DIR/Home.md" << EOL
# Project Knowledge Base

Welcome to your project knowledge base in Obsidian!

## Projects

- [[noxii-wiki-pages/Home|Noxii]]
- [[on-command-wiki-pages/Home|On Command]]
- [[dodec-wiki-pages/Home|Dodec: Beyond Our Home]]
- [[autumn-wiki-pages/Home|Autumn]]
- [[All of it Anything Everything At Once/Cosmic_Knights_GDD|Cosmic Knights]]

## Reference Materials

- [[reference-wiki-pages/narrative-structure|Narrative Structure]]

## Using This Knowledge Base

- Use \`[[Page Name]]\` to create links between notes
- View the graph to see connections between your projects
- Use backlinks to see what references each page
- Create new notes by linking to them before they exist
EOL

echo "---------------------------------------"
echo "Conversion complete!"
echo "---------------------------------------"
echo "Files converted: $(find "$OUTPUT_DIR" -name "*.md" | wc -l)"
echo "To use your new knowledge base:"
echo "1. Open Obsidian"
echo "2. Select 'Open folder as vault'"
echo "3. Choose: $OUTPUT_DIR"
echo "---------------------------------------"