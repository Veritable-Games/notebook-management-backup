#!/bin/bash
# convert-to-pdf.sh - Convert Markdown files to PDF
# Requires: pandoc, wkhtmltopdf
# Usage: ./convert-to-pdf.sh

# Check for dependencies
if ! command -v pandoc &> /dev/null; then
    echo "pandoc not found. Please install with: sudo apt-get install -y pandoc"
    exit 1
fi

if ! command -v wkhtmltopdf &> /dev/null; then
    echo "wkhtmltopdf not found. Please install with: sudo apt-get install -y wkhtmltopdf"
    exit 1
fi

# Create output directory
OUTPUT_DIR="$HOME/Desktop"
mkdir -p "$OUTPUT_DIR"

# Convert SETUP_INSTRUCTIONS.md to PDF
echo "Converting SETUP_INSTRUCTIONS.md to PDF..."
pandoc --from markdown --to html5 /home/user/Repository/SETUP_INSTRUCTIONS.md | wkhtmltopdf - "$OUTPUT_DIR/VeritableGames_SetupInstructions.pdf"

# Convert contribute.md to PDF
echo "Converting contribute.md to PDF..."
pandoc --from markdown --to html5 /home/user/Repository/contribute.md | wkhtmltopdf - "$OUTPUT_DIR/VeritableGames_ContributionGuide.pdf"

# Convert integration-plan.md to PDF
echo "Converting integration-plan.md to PDF..."
pandoc --from markdown --to html5 /home/user/Repository/projects/integration-plan.md | wkhtmltopdf - "$OUTPUT_DIR/VeritableGames_IntegrationPlan.pdf"

# Convert styleguide.md to PDF
echo "Converting styleguide.md to PDF..."
pandoc --from markdown --to html5 /home/user/Repository/projects/styleguide.md | wkhtmltopdf - "$OUTPUT_DIR/VeritableGames_StyleGuide.pdf"

echo "All files converted successfully. PDFs saved to: $OUTPUT_DIR/"
echo "Files created:"
echo "- $OUTPUT_DIR/VeritableGames_SetupInstructions.pdf"
echo "- $OUTPUT_DIR/VeritableGames_ContributionGuide.pdf"
echo "- $OUTPUT_DIR/VeritableGames_IntegrationPlan.pdf"
echo "- $OUTPUT_DIR/VeritableGames_StyleGuide.pdf"