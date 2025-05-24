#!/bin/bash
# Create forum structure and content based on existing repository

echo "🎮 Creating PS2-Era Forum structure from your repository content..."

# Function to create forum topics via WordPress REST API
create_forum_post() {
    local title="$1"
    local content="$2"
    local forum_id="$3"
    
    curl -X POST "http://localhost:8030/wp-json/wp/v2/posts" \
         -H "Content-Type: application/json" \
         -u "admin:PS2Admin2024!" \
         -d "{
             \"title\": \"$title\",
             \"content\": \"$content\",
             \"status\": \"publish\"
         }" > /dev/null 2>&1
}

# Create main forum categories via database
echo "📁 Creating forum categories..."
docker-compose exec -T ps2-era-forum-db mysql -u wordpress -pwordpress wordpress << 'EOF'

-- Game Development Projects
INSERT INTO wp_posts (post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_password, post_name, to_ping, pinged, post_modified, post_modified_gmt, post_content_filtered, post_parent, guid, menu_order, post_type, post_mime_type, comment_count) VALUES
(1, NOW(), NOW(), 'Welcome to the Game Development section! Share your projects, get feedback, and collaborate with other developers.', 'Game Development Projects', '', 'publish', 'open', 'closed', '', 'game-development-projects', '', '', NOW(), NOW(), '', 0, '', 0, 'forum', '', 0);

-- Project Noxii
INSERT INTO wp_posts (post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_password, post_name, to_ping, pinged, post_modified, post_modified_gmt, post_content_filtered, post_parent, guid, menu_order, post_type, post_mime_type, comment_count) VALUES
(1, NOW(), NOW(), 'Discussion and development updates for Project Noxii - a game design project exploring various gameplay mechanics and narratives.', 'Project Noxii', '', 'publish', 'open', 'closed', '', 'project-noxii', '', '', NOW(), NOW(), '', 0, '', 0, 'forum', '', 0);

-- Project On Command  
INSERT INTO wp_posts (post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_password, post_name, to_ping, pinged, post_modified, post_modified_gmt, post_content_filtered, post_parent, guid, menu_order, post_type, post_mime_type, comment_count) VALUES
(1, NOW(), NOW(), 'Sci-fi adventure game development. Discuss characters, world-building, and narrative elements for the On Command universe.', 'Project On Command', '', 'publish', 'open', 'closed', '', 'project-on-command', '', '', NOW(), NOW(), '', 0, '', 0, 'forum', '', 0);

-- Project Dodec
INSERT INTO wp_posts (post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_password, post_name, to_ping, pinged, post_modified, post_modified_gmt, post_content_filtered, post_parent, guid, menu_order, post_type, post_mime_type, comment_count) VALUES
(1, NOW(), NOW(), 'Character profiles and world-building for the Dodec universe. Share character concepts and story ideas.', 'Project Dodec', '', 'publish', 'open', 'closed', '', 'project-dodec', '', '', NOW(), NOW(), '', 0, '', 0, 'forum', '', 0);

-- Project Autumn
INSERT INTO wp_posts (post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_password, post_name, to_ping, pinged, post_modified, post_modified_gmt, post_content_filtered, post_parent, guid, menu_order, post_type, post_mime_type, comment_count) VALUES
(1, NOW(), NOW(), 'Design concepts and narrative elements for Project Autumn. Early development discussions and brainstorming.', 'Project Autumn', '', 'publish', 'open', 'closed', '', 'project-autumn', '', '', NOW(), NOW(), '', 0, '', 0, 'forum', '', 0);

-- Technical Development
INSERT INTO wp_posts (post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_password, post_name, to_ping, pinged, post_modified, post_modified_gmt, post_content_filtered, post_parent, guid, menu_order, post_type, post_mime_type, comment_count) VALUES
(1, NOW(), NOW(), 'Technical discussions about game development tools, programming, and implementation details.', 'Technical Development', '', 'publish', 'open', 'closed', '', 'technical-development', '', '', NOW(), NOW(), '', 0, '', 0, 'forum', '', 0);

-- General Discussion
INSERT INTO wp_posts (post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_password, post_name, to_ping, pinged, post_modified, post_modified_gmt, post_content_filtered, post_parent, guid, menu_order, post_type, post_mime_type, comment_count) VALUES
(1, NOW(), NOW(), 'General gaming discussions, industry news, and off-topic conversations.', 'General Discussion', '', 'publish', 'open', 'closed', '', 'general-discussion', '', '', NOW(), NOW(), '', 0, '', 0, 'forum', '', 0);

EOF

echo "✅ Forum categories created!"
echo ""
echo "🎮 Your PS2-Era Forum now has:"
echo "• Game Development Projects"
echo "  - Project Noxii"
echo "  - Project On Command"  
echo "  - Project Dodec"
echo "  - Project Autumn"
echo "• Technical Development"
echo "• General Discussion"
echo ""
echo "🌐 Visit: http://localhost:8030"
echo "🔐 Admin: http://localhost:8030/wp-admin"
echo ""
echo "Next: The forum structure is ready for your existing content!"