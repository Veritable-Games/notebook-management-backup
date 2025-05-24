#!/bin/bash
# Populate forum with actual content from repository

echo "📝 Creating forum posts from your repository content..."

# Create posts in the database directly using your actual content
docker-compose exec -T ps2-era-forum-db mysql -u wordpress -pwordpress wordpress << 'EOF'

-- Noxii Project Pitch Post
INSERT INTO wp_posts (post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_password, post_name, to_ping, pinged, post_modified, post_modified_gmt, post_content_filtered, post_parent, guid, menu_order, post_type, post_mime_type, comment_count) VALUES
(1, NOW(), NOW(), 
'<h2>Project Noxii - Game Pitch</h2>
<p><strong>Noxii</strong> is a lethally competitive skydiving game focused on visceral mid-air combat, hand-crafted levels, a unique permadeath system; all with a narrative that serves thematic purpose.</p>

<h3>Core Concept</h3>
<ul>
<li><strong>Why:</strong> You\'ve been condemned by the state for your crimes</li>
<li><strong>What:</strong> Sentenced to retributive punishment through deadly vertical games</li>
<li><strong>Where:</strong> Explore the immense, maze-like city of Grand Voss</li>
<li><strong>Who:</strong> Join the Noxii in immortal death</li>
</ul>

<p>This project explores themes of redemption, competition, and survival in a unique vertical combat environment. Looking for feedback on gameplay mechanics and narrative integration.</p>

<p><em>Status:</em> Concept development phase<br>
<em>Looking for:</em> Gameplay feedback, narrative suggestions, art collaboration</p>', 
'Project Noxii - Skydiving Combat Game Pitch', 
'A lethally competitive skydiving game with visceral mid-air combat and unique permadeath mechanics.', 
'publish', 'open', 'closed', '', 'noxii-game-pitch', '', '', NOW(), NOW(), '', 0, '', 0, 'post', '', 0);

-- On Command Game Design Post
INSERT INTO wp_posts (post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_password, post_name, to_ping, pinged, post_modified, post_modified_gmt, post_content_filtered, post_parent, guid, menu_order, post_type, post_mime_type, comment_count) VALUES
(1, NOW(), NOW(), 
'<h2>On Command - Game Design Document</h2>
<p><strong>On Command</strong> is a hard-science fiction third person tactical shooter with a heavy focus on squad control, level exploration, character interaction, and planned enemy engagements.</p>

<h3>Key Features</h3>
<ul>
<li>Squad-based tactical gameplay</li>
<li>Deep character interaction systems</li>
<li>Scientific accuracy in world-building</li>
<li>Strategic enemy engagement mechanics</li>
<li>Exploration-focused level design</li>
</ul>

<h3>Setting</h3>
<p>Set in a realistic sci-fi universe where tactical planning and team coordination are essential for survival. Players command specialized squad members through complex missions requiring both strategic thinking and precise execution.</p>

<p><em>Current Status:</em> Design document phase<br>
<em>Seeking:</em> Technical implementation feedback, squad AI suggestions</p>', 
'On Command - Tactical Sci-Fi Squad Shooter Design', 
'Hard science fiction tactical shooter focused on squad control and strategic gameplay.', 
'publish', 'open', 'closed', '', 'on-command-design-doc', '', '', NOW(), NOW(), '', 0, '', 0, 'post', '', 0);

-- Dodec Character Profile Post
INSERT INTO wp_posts (post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_password, post_name, to_ping, pinged, post_modified, post_modified_gmt, post_content_filtered, post_parent, guid, menu_order, post_type, post_mime_type, comment_count) VALUES
(1, NOW(), NOW(), 
'<h2>Dodec Character Profile: Arrisi Kron</h2>
<h3>ARRISI KRON - DETERMINED SPECIALIST</h3>

<p><strong>Profile:</strong><br>
Arrisi Kron is a determined specialist, known for her fierce determination and unwavering focus on mission objectives. Her specialized skills make her an invaluable team member in complex operations.</p>

<h3>Character Traits</h3>
<ul>
<li>Highly specialized skill set</li>
<li>Exceptional determination under pressure</li>
<li>Mission-focused mindset</li>
<li>Strong analytical capabilities</li>
</ul>

<h3>Role in Dodec Universe</h3>
<p>Arrisi represents the archetype of the dedicated specialist - someone who excels in their chosen field through sheer determination and focused expertise. Her character explores themes of specialization vs. adaptability in challenging environments.</p>

<p><em>Character Status:</em> Core team member<br>
<em>Development Phase:</em> Character background and abilities<br>
<em>Feedback Wanted:</em> Character motivation, skill balance</p>', 
'Dodec Character Profile: Arrisi Kron - Determined Specialist', 
'Character profile for Arrisi Kron, a determined specialist in the Dodec universe.', 
'publish', 'open', 'closed', '', 'dodec-arrisi-kron-profile', '', '', NOW(), NOW(), '', 0, '', 0, 'post', '', 0);

-- Game Development Tips Post
INSERT INTO wp_posts (post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_password, post_name, to_ping, pinged, post_modified, post_modified_gmt, post_content_filtered, post_parent, guid, menu_order, post_type, post_mime_type, comment_count) VALUES
(1, NOW(), NOW(), 
'<h2>Game Difficulty Design - Balancing Challenge and Accessibility</h2>
<p>Based on our development experience across multiple projects, here are some key considerations for designing game difficulty:</p>

<h3>Core Principles</h3>
<ul>
<li><strong>Gradual Learning Curve:</strong> Introduce mechanics progressively</li>
<li><strong>Player Agency:</strong> Let players choose their challenge level</li>
<li><strong>Clear Feedback:</strong> Players should understand why they failed</li>
<li><strong>Multiple Solutions:</strong> Avoid single "correct" approaches</li>
</ul>

<h3>Implementation Strategies</h3>
<ul>
<li>Adaptive difficulty based on player performance</li>
<li>Optional challenge modes for experienced players</li>
<li>Accessibility options that don\'t compromise core experience</li>
<li>Clear visual and audio cues for important mechanics</li>
</ul>

<p>These principles have been tested across our various game projects and consistently improve player engagement and retention.</p>

<p><em>Discussion:</em> What difficulty design strategies have worked for your projects?</p>', 
'Game Difficulty Design - Balancing Challenge and Accessibility', 
'Design principles and strategies for creating well-balanced game difficulty across different player skill levels.', 
'publish', 'open', 'closed', '', 'game-difficulty-design-tips', '', '', NOW(), NOW(), '', 0, '', 0, 'post', '', 0);

-- Welcome Post
INSERT INTO wp_posts (post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_password, post_name, to_ping, pinged, post_modified, post_modified_gmt, post_content_filtered, post_parent, guid, menu_order, post_type, post_mime_type, comment_count) VALUES
(1, NOW(), NOW(), 
'<h2>Welcome to PS2 Era Gaming Forum!</h2>
<p>Welcome to our community of game developers, designers, and enthusiasts! This forum is dedicated to sharing game development projects, discussing design concepts, and collaborating on creative endeavors.</p>

<h3>What You\'ll Find Here</h3>
<ul>
<li><strong>Game Development Projects:</strong> Ongoing projects including Noxii, On Command, Dodec, and Autumn</li>
<li><strong>Character Profiles & World Building:</strong> Detailed character development and universe creation</li>
<li><strong>Technical Development:</strong> Programming discussions, tool recommendations, and implementation strategies</li>
<li><strong>Design Philosophy:</strong> Game design theory, player psychology, and narrative development</li>
</ul>

<h3>Community Guidelines</h3>
<p>This is a collaborative space for constructive feedback, creative brainstorming, and professional development discussion. We encourage detailed posts, thoughtful responses, and productive criticism.</p>

<h3>Get Started</h3>
<ul>
<li>Browse the project categories to see ongoing development work</li>
<li>Share your own projects and get community feedback</li>
<li>Contribute to character development and world-building discussions</li>
<li>Participate in technical development conversations</li>
</ul>

<p>Looking forward to seeing what we can create together!</p>', 
'Welcome to PS2 Era Gaming Forum - Game Development Community', 
'Welcome to our game development community! Share projects, discuss design, and collaborate on creative endeavors.', 
'publish', 'open', 'closed', '', 'welcome-ps2-era-gaming-forum', '', '', NOW(), NOW(), '', 0, '', 0, 'post', '', 0);

EOF

echo "✅ Forum posts created from your repository content!"
echo ""
echo "🎮 Your forum now includes:"
echo "• Welcome post introducing the community"
echo "• Project Noxii game pitch with actual content"
echo "• On Command design document overview"  
echo "• Dodec character profile (Arrisi Kron)"
echo "• Game difficulty design tips from your notes"
echo ""
echo "🌐 Visit: http://localhost:8030 to see your content live!"
echo ""
echo "All posts use your actual repository content and are organized by project themes."