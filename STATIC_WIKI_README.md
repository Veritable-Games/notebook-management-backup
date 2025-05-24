# Static Wiki Generator

A lightweight, dependency-free wiki generator that converts your notebooks into a fully-functional static HTML wiki.

## Features

- **Zero Dependencies**: No server, no database, just plain HTML you can open in any browser
- **Wiki Links**: Full support for `[[WikiLinks]]` with backlink tracking
- **Tags & Categories**: Automatic tag extraction and category organization
- **Graph Visualization**: Interactive visualization of connections between pages
- **Instant Search**: Client-side search that works without a server
- **Portable**: The generated wiki can be shared, uploaded, or viewed locally

## How It Works

The Static Wiki Generator works in a simple three-step process:

1. **Analysis**: Scans your notebook files and extracts metadata, links, and content
2. **Processing**: Converts content to HTML, organizes by tags and categories, tracks relationships
3. **Generation**: Creates a complete static HTML website with navigation, search, and visualization

## Getting Started

1. Run the generator script:

```bash
./scripts/generate-static-wiki.sh
```

2. Open the generated `static-wiki/index.html` in any web browser.

That's it! No server setup, no database configuration, no dependencies.

## Key Benefits

- **Simplicity**: No complex infrastructure to maintain
- **Portability**: Can be viewed offline or easily shared
- **Performance**: Fast loading, no server delays
- **Compatibility**: Works in any modern browser
- **Easy Deployment**: Just copy the files to any web host

## Directory Structure

The generated wiki follows a clean, intuitive structure:

```
static-wiki/
├── index.html              # Home page
├── all-pages.html          # Alphabetical list of all pages
├── categories.html         # List of all categories
├── tags.html               # Tag cloud with all tags
├── graph.html              # Relationship visualization
├── assets/                 # CSS and other static assets
├── pages/                  # Individual wiki pages
├── categories/             # Category index pages
└── tags/                   # Tag index pages
```

## How to Customize

The generator script (`static-wiki-generator.js`) can be easily customized:

- **Styles**: Edit the CSS in the `generateStyles()` function
- **Templates**: Modify the HTML templates in each generator function
- **Detection Logic**: Adjust tag detection in the `detectTags()` function
- **Categories**: Customize category logic in `detectCategory()`

## Technical Details

- **HTML5**: Modern semantic markup
- **CSS3**: Clean, responsive design
- **JavaScript**: Minimal, vanilla JS for interactive features
- **D3.js**: For graph visualization
- **Force-Graph**: For interactive node relationships

## Future Enhancements

Future versions could include:

- Search index for faster searching
- Print-friendly styles
- Dark mode toggle
- Custom themes
- PDF export option