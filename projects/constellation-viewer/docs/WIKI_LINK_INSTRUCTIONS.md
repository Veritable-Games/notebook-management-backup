# Wiki Link System for Constellation Viewer

I've implemented a wiki link system for your Constellation Viewer that allows you to create links between pages, including cross-project links.

## What's Been Added

1. Wiki-style links that transform `[[PageName]]` syntax into clickable links
2. Support for different link types:
   - Basic links: `[[PageName]]`
   - Links with display text: `[[PageName|Display Text]]`
   - Cross-project links: `[[ProjectName:PageName]]`
   - Cross-project links with display text: `[[ProjectName:PageName|Display Text]]`
3. Visual styling:
   - Regular links in blue
   - Cross-project links in purple
   - Hover tooltips showing the target

## How to Test It

1. Navigate to http://localhost:8090/basic.html
2. Select "reference-wiki-pages" from the directory dropdown
3. Open the "wiki-link-test.txt" file I created
4. You should see various wiki links that you can click to navigate

## Using Wiki Links in Your Content

You can now add wiki links to any of your content files using these formats:

```
[[PageName]]                             - Link to a page in the same directory
[[PageName|Display Text]]                - Link with custom text
[[ProjectName:PageName]]                 - Link to a page in another project
[[ProjectName:PageName|Display Text]]    - Cross-project link with custom text
```

Valid project names:
- Noxii
- OnCommand
- Dodec
- Autumn
- CosmicKnights

## How It Works

The implementation:
1. Attaches to the existing content display system
2. Watches for changes to the displayed content
3. Transforms wiki link syntax into clickable HTML links
4. Preserves all existing functionality

## Troubleshooting

If links aren't working:
1. Make sure the file has been saved
2. Try refreshing the page
3. Check the browser console for any error messages

You can also manually trigger the link processing by opening the browser console and typing:
```javascript
processExistingContent();
```

## Future Enhancements

Possible next steps:
1. Add backlink tracking (seeing what links to the current page)
2. Add visual indicators for missing pages
3. Add editor integration for easier link creation
4. Add a visual graph of page relationships