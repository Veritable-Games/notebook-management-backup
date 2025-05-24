# Wiki Export Guide

I've created two options for exporting your ZIM wiki content into a neutral format that doesn't depend on categories or special structures:

## Option 1: Bash Script (Recommended)

The bash script is simpler and more reliable:

```bash
# Run the script
cd /home/user/Repository
./export-wiki.sh
```

This will:
1. Read all .txt files from `/home/user/Repository/Notebooks`
2. Export them to `/home/user/Repository/ExportedWiki`
3. Convert ZIM wiki format to Markdown
4. Preserve the wiki links syntax ([[PageName]])

## Option 2: Node.js Script

If you prefer JavaScript:

```bash
# Run the script with Node.js
cd /home/user/Repository
node export-wiki.js
```

This does the same as the bash script but using JavaScript.

## Configuration Options

You can edit the scripts to change these options:

1. **Output Format**:
   - `FORMAT="markdown"` (default) - Exports to .md files with Markdown formatting
   - `FORMAT="plaintext"` - Exports to .txt files with minimal formatting

2. **Wiki Links**:
   - `WIKI_LINKS=true` (default) - Preserves wiki links as [[PageName]]
   - `WIKI_LINKS=false` - Converts wiki links to Markdown: [PageName](PageName)

3. **Directories**:
   - `SOURCE_DIR` - Change the source directory
   - `OUTPUT_DIR` - Change the output directory

## What Gets Converted

The export process:

1. Removes all ZIM headers (Content-Type, Wiki-Format, Creation-Date)
2. Converts ZIM headings to Markdown headings
   - `====== Title ======` becomes `# Title`
3. Converts lists
   - `* Item` becomes `- Item`
4. Preserves wiki links in their original format
   - `[[PageName]]` stays as `[[PageName]]`

## Using the Exported Files

The exported files can be:

1. Used with any Markdown viewer
2. Imported into other wiki systems
3. Viewed directly in text editors or IDEs
4. Used with the Constellation Viewer (it supports both ZIM and regular Markdown)

These exported files provide a "neutral" format that doesn't depend on the ZIM wiki structure while preserving all your content and links.