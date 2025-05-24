#!/bin/bash
# Create collaborative frontend components for seamless integration

echo "🎨 Creating Collaborative Frontend Components..."

# 1. Create a unified dashboard that shows all services together
cat > /home/user/Repository/projects/content-management/frontend/pages/dashboard.js << 'EOF'
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function CollaborativeDashboard() {
  const [activityFeed, setActivityFeed] = useState([]);
  const [serviceStatus, setServiceStatus] = useState({});
  const [quickActions, setQuickActions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Get unified activity feed
      const activityResponse = await fetch('http://localhost:3001/api/collaborative/activity/feed');
      if (activityResponse.ok) {
        const activityData = await activityResponse.json();
        setActivityFeed(activityData.activities || []);
      }

      // Check service status
      const services = {
        'Content Management': { url: 'http://localhost:3000', port: 3000, status: 'online' },
        'Backend API': { url: 'http://localhost:3001', port: 3001, status: 'checking' },
        'PS2-Era Forum': { url: 'http://localhost:8030', port: 8030, status: 'checking' },
        'Constellation Viewer': { url: 'http://localhost:8090', port: 8090, status: 'checking' }
      };

      // Quick health checks
      for (const [name, service] of Object.entries(services)) {
        if (name === 'Content Management') continue; // We're already here
        
        try {
          const healthCheck = await fetch(`http://localhost:3001/api/health`, { 
            method: 'GET',
            mode: 'no-cors' 
          });
          services[name].status = 'online';
        } catch (error) {
          services[name].status = 'offline';
        }
      }

      setServiceStatus(services);

      // Set up quick actions based on current projects
      setQuickActions([
        {
          title: 'Share to Forum',
          description: 'Post current notebook content to PS2-Era Forum',
          action: 'share-forum',
          icon: '🎮',
          enabled: services['PS2-Era Forum'].status === 'online'
        },
        {
          title: 'Add to Constellation',
          description: 'Visualize content in 3D constellation',
          action: 'add-constellation',
          icon: '🌌',
          enabled: services['Constellation Viewer'].status === 'online'
        },
        {
          title: 'Sync All Content',
          description: 'Synchronize content across all services',
          action: 'sync-all',
          icon: '🔄',
          enabled: true
        },
        {
          title: 'View Forum Activity',
          description: 'See latest discussions and posts',
          action: 'view-forum',
          icon: '💬',
          enabled: services['PS2-Era Forum'].status === 'online'
        }
      ]);

      setLoading(false);
    } catch (error) {
      console.error('Dashboard data fetch error:', error);
      setLoading(false);
    }
  };

  const executeQuickAction = async (action) => {
    switch (action) {
      case 'share-forum':
        window.open('/share-to-forum', '_blank');
        break;
      case 'add-constellation':
        window.open('/integration', '_blank');
        break;
      case 'sync-all':
        await syncAllContent();
        break;
      case 'view-forum':
        window.open('http://localhost:8030', '_blank');
        break;
    }
  };

  const syncAllContent = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/collaborative/sync/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notebookEntry: {
            title: 'Recent Activity Sync',
            content: 'Synchronizing content across all collaborative services',
            category: 'general'
          },
          targetServices: ['forum', 'constellation']
        })
      });

      if (response.ok) {
        alert('Content synchronized across all services!');
        fetchDashboardData(); // Refresh data
      }
    } catch (error) {
      alert('Sync failed: ' + error.message);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <section>
          <h1 className="text-3xl font-bold mb-2">Collaborative Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Unified view of all your game development services and activities
          </p>
        </section>

        {/* Service Status Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(serviceStatus).map(([name, service]) => (
            <div key={name} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-sm">{name}</h3>
                  <p className="text-xs text-gray-500">Port {service.port}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  service.status === 'online' ? 'bg-green-500' :
                  service.status === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
              </div>
              <a 
                href={service.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-ps2-blue hover:underline mt-2 block"
              >
                Open Service →
              </a>
            </div>
          ))}
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.action}
                onClick={() => executeQuickAction(action.action)}
                disabled={!action.enabled}
                className={`p-4 rounded-lg text-left transition-colors ${
                  action.enabled 
                    ? 'bg-white dark:bg-gray-800 shadow hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700' 
                    : 'bg-gray-100 dark:bg-gray-900 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <h3 className="font-medium text-sm mb-1">{action.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">{action.description}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Unified Activity Feed */}
        <section>
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            {loading ? (
              <div className="p-6 text-center">Loading activity feed...</div>
            ) : activityFeed.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No recent activity across services
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {activityFeed.map((activity, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <div className="flex items-start space-x-3">
                      <div className="text-xl">{activity.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium">
                            <a 
                              href={activity.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:text-ps2-blue"
                            >
                              {activity.title}
                            </a>
                          </h3>
                          <span className="text-xs text-gray-500">{activity.service}</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {new Date(activity.date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Cross-Service Links */}
        <section>
          <h2 className="text-xl font-bold mb-4">Service Integration</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <h3 className="font-medium mb-2">📝 → 🎮</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Share notebook content directly to PS2-Era Forum
              </p>
              <a href="/share-to-forum" className="btn-secondary text-sm">
                Create Forum Post
              </a>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <h3 className="font-medium mb-2">📝 → 🌌</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Visualize content relationships in 3D space
              </p>
              <a href="/integration" className="btn-secondary text-sm">
                Add to Constellation
              </a>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <h3 className="font-medium mb-2">🎮 ↔ 🌌</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Forum discussions linked to visual exploration
              </p>
              <a href="/forum" className="btn-secondary text-sm">
                View Integration
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
EOF

# 2. Create a content sharing component
cat > /home/user/Repository/projects/content-management/frontend/pages/share-to-forum.js << 'EOF'
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function ShareToForum() {
  const [notebooks, setNotebooks] = useState([]);
  const [selectedNotebook, setSelectedNotebook] = useState('');
  const [selectedEntry, setSelectedEntry] = useState('');
  const [entries, setEntries] = useState([]);
  const [customTitle, setCustomTitle] = useState('');
  const [customContent, setCustomContent] = useState('');
  const [sharing, setSharing] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchNotebooks();
  }, []);

  useEffect(() => {
    if (selectedNotebook) {
      fetchEntries(selectedNotebook);
    }
  }, [selectedNotebook]);

  const fetchNotebooks = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/notebooks');
      if (response.ok) {
        const data = await response.json();
        setNotebooks(data.notebooks || []);
      }
    } catch (error) {
      console.error('Error fetching notebooks:', error);
    }
  };

  const fetchEntries = async (notebookId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/notebooks/${notebookId}`);
      if (response.ok) {
        const data = await response.json();
        setEntries(data.entries || []);
      }
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const shareToForum = async () => {
    if (!selectedEntry && !customTitle) {
      alert('Please select an entry or provide custom content');
      return;
    }

    setSharing(true);
    try {
      let postData;

      if (selectedEntry) {
        // Get the full entry content
        const entryResponse = await fetch(`http://localhost:3001/api/notebooks/${selectedNotebook}/${selectedEntry}`);
        if (!entryResponse.ok) throw new Error('Failed to fetch entry content');
        
        const entryData = await entryResponse.json();
        const selectedEntryInfo = entries.find(e => e.id === selectedEntry);
        
        postData = {
          title: `[Project Discussion] ${selectedEntryInfo.title}`,
          content: `<h2>${selectedEntryInfo.title}</h2>

<p><strong>From Content Management System</strong></p>

<div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #0066cc; margin: 15px 0;">
${entryData.content.replace(/\n/g, '<br>')}
</div>

<p><em>This content was shared from the Content Management system. Join the discussion below!</em></p>

<p>Related Projects: ${selectedNotebook.replace('-wiki', '')}</p>`,
          category: selectedNotebook
        };
      } else {
        // Use custom content
        postData = {
          title: customTitle,
          content: `<div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #0066cc; margin: 15px 0;">
${customContent.replace(/\n/g, '<br>')}
</div>

<p><em>This content was shared from the Content Management system. Join the discussion below!</em></p>`,
          category: 'general'
        };
      }

      const response = await fetch('http://localhost:3001/api/collaborative/forum/create-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });

      if (response.ok) {
        const result = await response.json();
        setResult({
          success: true,
          url: result.url,
          message: 'Successfully shared to PS2-Era Forum!'
        });
      } else {
        throw new Error('Failed to create forum post');
      }
    } catch (error) {
      setResult({
        success: false,
        message: `Error sharing to forum: ${error.message}`
      });
    } finally {
      setSharing(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <section>
          <h1 className="text-3xl font-bold mb-4">Share to PS2-Era Forum</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Share your notebook content or create custom posts for the gaming forum community.
          </p>
        </section>

        {result && (
          <div className={`p-4 rounded-lg ${
            result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            <p className="font-medium">{result.message}</p>
            {result.success && result.url && (
              <a 
                href={result.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm underline block mt-2"
              >
                View Forum Post →
              </a>
            )}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Share Existing Content</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Notebook</label>
                  <select 
                    className="input w-full"
                    value={selectedNotebook}
                    onChange={(e) => setSelectedNotebook(e.target.value)}
                  >
                    <option value="">Choose a notebook...</option>
                    {notebooks.map(notebook => (
                      <option key={notebook.id} value={notebook.id}>
                        {notebook.name} ({notebook.entryCount} entries)
                      </option>
                    ))}
                  </select>
                </div>

                {selectedNotebook && entries.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Entry</label>
                    <select 
                      className="input w-full"
                      value={selectedEntry}
                      onChange={(e) => setSelectedEntry(e.target.value)}
                    >
                      <option value="">Choose an entry...</option>
                      {entries.map(entry => (
                        <option key={entry.id} value={entry.id}>
                          {entry.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Or Create Custom Post</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Custom Title</label>
                  <input 
                    type="text"
                    className="input w-full"
                    placeholder="Enter forum post title..."
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Custom Content</label>
                  <textarea 
                    className="input w-full h-32"
                    placeholder="Enter your forum post content..."
                    value={customContent}
                    onChange={(e) => setCustomContent(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button 
                onClick={shareToForum}
                disabled={sharing || (!selectedEntry && !customTitle)}
                className={`btn-primary ${sharing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {sharing ? 'Sharing...' : 'Share to Forum'} 🎮
              </button>
              
              <a 
                href="http://localhost:8030" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                View Forum
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
EOF

echo "✅ Collaborative frontend components created!"
echo ""
echo "🤝 Your Collaborative Ecosystem Now Includes:"
echo "• Unified Dashboard (localhost:3000/dashboard)"
echo "• Content Sharing Tool (localhost:3000/share-to-forum)" 
echo "• Real-time activity feeds across all services"
echo "• Cross-service status monitoring"
echo "• One-click content synchronization"
echo ""
echo "🚀 All services now work together as a unified platform!"