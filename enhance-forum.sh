#!/bin/bash
# Enhance the actually working PS2-Era Forum

echo "🎮 Enhancing your working PS2-Era Forum..."

# 1. Add more organized forum categories using bbPress
echo "📁 Adding forum categories for better organization..."

docker-compose exec -T ps2-era-forum-db mysql -u wordpress -pwordpress wordpress << 'EOF'

-- Check if bbPress tables exist and create forum structure
-- Insert forum categories (bbPress uses custom post types)

-- Game Development Category
INSERT IGNORE INTO wp_posts (post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_name, post_type, menu_order) VALUES
(1, NOW(), NOW(), 'Main category for all game development discussions and project updates.', 'Game Development', '', 'publish', 'closed', 'closed', 'game-development', 'forum', 1);

-- Project Categories
INSERT IGNORE INTO wp_posts (post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_name, post_type, menu_order) VALUES
(1, NOW(), NOW(), 'Discussion and development updates for Project Noxii.', 'Project Noxii', '', 'publish', 'closed', 'closed', 'project-noxii', 'forum', 2),
(1, NOW(), NOW(), 'On Command sci-fi tactical shooter development.', 'Project On Command', '', 'publish', 'closed', 'closed', 'project-on-command', 'forum', 3),
(1, NOW(), NOW(), 'Character development and world-building for Dodec.', 'Project Dodec', '', 'publish', 'closed', 'closed', 'project-dodec', 'forum', 4),
(1, NOW(), NOW(), 'Design concepts for Project Autumn.', 'Project Autumn', '', 'publish', 'closed', 'closed', 'project-autumn', 'forum', 5);

-- Technical Discussion
INSERT IGNORE INTO wp_posts (post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_name, post_type, menu_order) VALUES
(1, NOW(), NOW(), 'Technical development discussions, tools, and programming help.', 'Technical Development', '', 'publish', 'closed', 'closed', 'technical-development', 'forum', 6);

-- General Discussion
INSERT IGNORE INTO wp_posts (post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_name, post_type, menu_order) VALUES
(1, NOW(), NOW(), 'General gaming discussions and off-topic conversations.', 'General Discussion', '', 'publish', 'closed', 'closed', 'general-discussion', 'forum', 7);

EOF

# 2. Enhance the PS2 theme with better forum styling
echo "🎨 Enhancing PS2-era theme styling..."

cat >> /home/user/Repository/projects/wordpress-projects/PS2-Era-Forum/themes/ps2-era-forum/style.css << 'EOF'

/* Enhanced Forum Styling */
.bbp-breadcrumb {
  background: #E8F0F8;
  padding: 8px 12px;
  border: 1px solid #B8D4F0;
  margin-bottom: 15px;
  font-size: 11px;
}

.bbp-forum-info, .bbp-topic-info {
  background: #FFFFFF;
  border: 1px solid #B8D4F0;
  padding: 10px;
  margin-bottom: 10px;
}

.bbp-forum-title, .bbp-topic-title {
  font-weight: bold;
  color: #0066CC;
  text-decoration: none;
}

.bbp-forum-title:hover, .bbp-topic-title:hover {
  color: #0044AA;
}

.bbp-forum-content, .bbp-topic-content {
  margin-top: 8px;
  line-height: 1.4;
}

/* Forum stats */
.bbp-forum-topic-count, .bbp-forum-reply-count {
  font-weight: bold;
  color: #666;
}

/* Reply/Post forms */
.bbp-reply-form, .bbp-topic-form {
  background: #F8F8F8;
  border: 1px solid #DDD;
  padding: 15px;
  margin: 15px 0;
}

/* Buttons */
.bbp-submit-wrapper input[type="submit"] {
  background: #0066CC;
  color: white;
  border: 1px solid #0044AA;
  padding: 6px 12px;
  font-size: 11px;
  cursor: pointer;
}

.bbp-submit-wrapper input[type="submit"]:hover {
  background: #0044AA;
}

/* User info */
.bbp-reply-author, .bbp-topic-author {
  background: #E8F0F8;
  border: 1px solid #B8D4F0;
  padding: 10px;
  margin-bottom: 10px;
}

/* Make it look more like classic forum software */
.bbp-replies, .bbp-topics {
  border-collapse: collapse;
  width: 100%;
}

.bbp-replies th, .bbp-topics th {
  background: #0066CC;
  color: white;
  padding: 8px;
  text-align: left;
  font-size: 11px;
  font-weight: bold;
}

.bbp-replies td, .bbp-topics td {
  border-bottom: 1px solid #DDD;
  padding: 8px;
  font-size: 11px;
}

/* PS2-era specific styling */
.widget {
  background: #F0F4F8;
  border: 1px solid #B8D4F0;
  margin-bottom: 10px;
  padding: 10px;
}

.widget-title {
  background: #0066CC;
  color: white;
  margin: -10px -10px 10px -10px;
  padding: 6px 10px;
  font-size: 11px;
  font-weight: bold;
}

/* Navigation menu styling */
.menu, .nav-menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu li, .nav-menu li {
  display: inline-block;
  margin-right: 15px;
}

.menu a, .nav-menu a {
  color: #0066CC;
  text-decoration: none;
  font-size: 11px;
  font-weight: bold;
}

.menu a:hover, .nav-menu a:hover {
  text-decoration: underline;
}
EOF

# 3. Add a custom header with navigation
cat > /home/user/Repository/projects/wordpress-projects/PS2-Era-Forum/themes/ps2-era-forum/header.php << 'EOF'
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php wp_title('|', true, 'right'); ?><?php bloginfo('name'); ?></title>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<div id="wrapper">
    <div id="header">
        <div id="site-title">
            <h1><a href="<?php echo home_url(); ?>"><?php bloginfo('name'); ?></a></h1>
            <p class="site-description"><?php bloginfo('description'); ?></p>
        </div>
        
        <div id="main-nav">
            <ul class="nav-menu">
                <li><a href="<?php echo home_url(); ?>">Home</a></li>
                <li><a href="<?php echo home_url('/forums/'); ?>">Forums</a></li>
                <li><a href="<?php echo home_url('/forums/game-development/'); ?>">Game Dev</a></li>
                <li><a href="<?php echo home_url('/forums/project-noxii/'); ?>">Project Noxii</a></li>
                <li><a href="<?php echo home_url('/forums/project-on-command/'); ?>">On Command</a></li>
                <li><a href="<?php echo home_url('/forums/project-dodec/'); ?>">Dodec</a></li>
                <li><a href="<?php echo home_url('/forums/technical-development/'); ?>">Tech Talk</a></li>
            </ul>
        </div>
    </div>
    
    <div id="content">
EOF

# 4. Add footer
cat > /home/user/Repository/projects/wordpress-projects/PS2-Era-Forum/themes/ps2-era-forum/footer.php << 'EOF'
    </div> <!-- #content -->
    
    <div id="footer">
        <div id="footer-content">
            <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?> - Game Development Community</p>
            <p>Powered by WordPress & bbPress | <a href="<?php echo admin_url(); ?>">Admin</a></p>
            <p>Projects: <a href="/forums/project-noxii/">Noxii</a> | <a href="/forums/project-on-command/">On Command</a> | <a href="/forums/project-dodec/">Dodec</a> | <a href="/forums/project-autumn/">Autumn</a></p>
        </div>
    </div>
</div> <!-- #wrapper -->

<?php wp_footer(); ?>
</body>
</html>
EOF

# 5. Add more project-specific content
echo "📝 Adding more content based on your repository..."

docker-compose exec -T ps2-era-forum-db mysql -u wordpress -pwordpress wordpress << 'EOF'

-- Add more detailed posts about your projects
INSERT INTO wp_posts (post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_name, post_type) VALUES
(1, NOW(), NOW(), 
'<h2>Character Profile: Gregers Ovesen</h2>
<p>Another key character in the Dodec universe with unique traits and backstory.</p>

<h3>Character Background</h3>
<p>Gregers brings a different perspective to the team dynamic, complementing Arrisi Kron\'s specialist approach with his own unique skills.</p>

<p><strong>Discussion Points:</strong></p>
<ul>
<li>How does Gregers interact with other team members?</li>
<li>What role does he play in major story moments?</li>
<li>Character development arc suggestions?</li>
</ul>

<p><em>Share your thoughts on Gregers\' character development!</em></p>', 
'Dodec Character: Gregers Ovesen Discussion', 
'Character development discussion for Gregers Ovesen in the Dodec universe.', 
'publish', 'open', 'closed', 'dodec-gregers-ovesen', 'post');

-- Add technical discussion post
INSERT INTO wp_posts (post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_name, post_type) VALUES
(1, NOW(), NOW(), 
'<h2>Grid System Implementation</h2>
<p>Discussion about implementing grid-based systems for game development, particularly useful for tactical games like On Command.</p>

<h3>Key Considerations</h3>
<ul>
<li>Memory efficiency for large grids</li>
<li>Pathfinding optimization</li>
<li>Visual feedback systems</li>
<li>Dynamic grid modification during gameplay</li>
</ul>

<h3>Implementation Approaches</h3>
<p>Different strategies for grid implementation depending on game requirements and performance constraints.</p>

<p><strong>What approaches have worked for your projects?</strong></p>', 
'Grid System Implementation - Technical Discussion', 
'Technical discussion about implementing grid-based systems for game development.', 
'publish', 'open', 'closed', 'grid-system-implementation', 'post');

EOF

echo "✅ Forum enhancements complete!"
echo ""
echo "🎮 Your Enhanced PS2-Era Forum Now Has:"
echo "• Better forum organization with bbPress categories"
echo "• Enhanced PS2-era styling (classic blue/gray theme)"
echo "• Custom navigation header"
echo "• More project-specific content"
echo "• Character discussion posts"
echo "• Technical development discussions"
echo ""
echo "🌐 Visit: http://localhost:8030"
echo "🔐 Admin: http://localhost:8030/wp-admin (admin/PS2Admin2024!)"
echo ""
echo "Your forum is now a proper game development community!"