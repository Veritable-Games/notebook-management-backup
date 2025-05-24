#!/bin/bash
# Activate PS2-Era-Forum theme

echo "🎮 Activating PS2-Era-Forum theme..."

# Update the WordPress database to use the PS2 theme
docker-compose exec -T ps2-era-forum-db mysql -u wordpress -pwordpress wordpress -e "
UPDATE wp_options SET option_value = 'ps2-era-forum' WHERE option_name = 'template';
UPDATE wp_options SET option_value = 'ps2-era-forum' WHERE option_name = 'stylesheet';
UPDATE wp_options SET option_value = 'PS2-Era Forum' WHERE option_name = 'current_theme';
"

echo "✅ PS2-Era-Forum theme activated!"
echo ""
echo "🎮 Visit your forum: http://localhost:8030"
echo ""
echo "The theme should now have:"
echo "• PS2-era styling (blue/gray color scheme)"
echo "• Verdana font (classic forum look)"
echo "• Classic forum layout"
echo "• bbPress forum integration"