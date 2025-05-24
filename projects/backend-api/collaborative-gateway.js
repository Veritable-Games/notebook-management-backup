const express = require('express');
const cors = require('cors');
const axios = require('axios');

// Collaborative Gateway - Routes between all services
const gateway = express.Router();

// Enable CORS for cross-service communication
gateway.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8030', 'http://localhost:8090'],
  credentials: true
}));

// WordPress Forum Integration
gateway.get('/forum/posts', async (req, res) => {
  try {
    // Get WordPress posts via REST API
    const response = await axios.get('http://ps2-era-forum:80/wp-json/wp/v2/posts');
    res.json({
      source: 'ps2-era-forum',
      posts: response.data.map(post => ({
        id: post.id,
        title: post.title.rendered,
        content: post.content.rendered,
        excerpt: post.excerpt.rendered,
        date: post.date,
        url: `http://localhost:8030/?p=${post.id}`,
        project: extractProjectTag(post.title.rendered)
      }))
    });
  } catch (error) {
    console.error('Forum integration error:', error.message);
    res.json({ source: 'ps2-era-forum', posts: [], error: 'Forum offline' });
  }
});

// Create WordPress post from content management
gateway.post('/forum/create-post', async (req, res) => {
  try {
    const { title, content, category } = req.body;
    
    const wpPost = {
      title: title,
      content: content,
      status: 'publish',
      categories: [1] // Default category
    };

    const response = await axios.post(
      'http://ps2-era-forum:80/wp-json/wp/v2/posts',
      wpPost,
      {
        auth: {
          username: 'admin',
          password: 'PS2Admin2024!'
        }
      }
    );

    res.json({
      success: true,
      forumPost: response.data,
      url: `http://localhost:8030/?p=${response.data.id}`
    });
  } catch (error) {
    console.error('Forum post creation error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Constellation Viewer Integration
gateway.get('/constellation/pages', async (req, res) => {
  try {
    const response = await axios.get('http://constellation-viewer:3003/pages');
    res.json({
      source: 'constellation-viewer',
      pages: response.data
    });
  } catch (error) {
    console.error('Constellation integration error:', error.message);
    res.json({ source: 'constellation-viewer', pages: [], error: 'Constellation offline' });
  }
});

// Cross-service content synchronization
gateway.post('/sync/content', async (req, res) => {
  try {
    const { notebookEntry, targetServices } = req.body;
    const results = {};

    // Sync to Forum if requested
    if (targetServices.includes('forum')) {
      try {
        const forumPost = await axios.post('http://localhost:4000/api/collaborative/forum/create-post', {
          title: notebookEntry.title,
          content: `<h2>${notebookEntry.title}</h2>\n${notebookEntry.content}`,
          category: notebookEntry.category
        });
        results.forum = { success: true, url: forumPost.data.url };
      } catch (error) {
        results.forum = { success: false, error: error.message };
      }
    }

    // Sync to Constellation if requested
    if (targetServices.includes('constellation')) {
      try {
        const constellationPage = await axios.post('http://constellation-viewer:3003/pages', {
          title: notebookEntry.title,
          content: notebookEntry.content,
          category: notebookEntry.category,
          timestamp: new Date().toISOString()
        });
        results.constellation = { success: true, id: constellationPage.data.id };
      } catch (error) {
        results.constellation = { success: false, error: error.message };
      }
    }

    res.json({
      success: true,
      syncResults: results,
      message: 'Content synchronized across services'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Real-time activity feed combining all services
gateway.get('/activity/feed', async (req, res) => {
  try {
    const activities = [];

    // Get recent forum posts
    try {
      const forumResponse = await axios.get('http://localhost:4000/api/collaborative/forum/posts');
      forumResponse.data.posts.slice(0, 5).forEach(post => {
        activities.push({
          type: 'forum_post',
          title: post.title,
          url: post.url,
          date: post.date,
          service: 'PS2-Era Forum',
          icon: '🎮'
        });
      });
    } catch (e) { /* Continue if forum offline */ }

    // Get recent notebook entries
    try {
      const notebooksResponse = await axios.get('http://localhost:4000/api/notebooks');
      notebooksResponse.data.notebooks.forEach(notebook => {
        activities.push({
          type: 'notebook_update',
          title: `${notebook.name} updated`,
          url: `http://localhost:3000/notebooks?category=${notebook.id}`,
          date: new Date().toISOString(),
          service: 'Content Management',
          icon: '📝'
        });
      });
    } catch (e) { /* Continue if API offline */ }

    // Sort by date
    activities.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({
      activities: activities.slice(0, 10),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Helper function to extract project tags from titles
function extractProjectTag(title) {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('noxii')) return 'noxii';
  if (titleLower.includes('on command')) return 'on-command';
  if (titleLower.includes('dodec')) return 'dodec';
  if (titleLower.includes('autumn')) return 'autumn';
  return 'general';
}

module.exports = gateway;
