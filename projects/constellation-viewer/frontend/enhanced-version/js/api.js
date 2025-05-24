/**
 * API interaction module for the Notebook Explorer application
 */

class NotebookAPI {
  constructor(baseUrl = '/api') {
    this.baseUrl = baseUrl;
    this.endpoints = {
      notebooks: `${baseUrl}/notebooks`,
      pages: `${baseUrl}/pages`,
      relationships: `${baseUrl}/relationships`,
      search: `${baseUrl}/search`
    };
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    this.abortControllers = new Map();
  }

  /**
   * Make an API request with error handling
   * @param {string} url - The URL to request
   * @param {Object} options - Fetch options
   * @param {string} requestId - Optional ID for aborting request
   * @returns {Promise<Object>} - Response data
   */
  async request(url, options = {}, requestId = null) {
    // Create abort controller for this request if an ID is provided
    if (requestId) {
      // Cancel previous request with same ID if it exists
      if (this.abortControllers.has(requestId)) {
        this.abortControllers.get(requestId).abort();
      }
      
      const controller = new AbortController();
      this.abortControllers.set(requestId, controller);
      options.signal = controller.signal;
    }
    
    try {
      // Set default headers
      options.headers = { ...this.headers, ...options.headers };
      
      // Make request
      const response = await fetch(url, options);
      
      // Clear abort controller if request completed
      if (requestId) {
        this.abortControllers.delete(requestId);
      }
      
      // Check for successful response
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error (${response.status}): ${errorText}`);
      }
      
      // Parse JSON response
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        return { success: true, data };
      } else {
        const text = await response.text();
        return { success: true, data: text };
      }
    } catch (error) {
      // Don't report aborted requests as errors
      if (error.name === 'AbortError') {
        console.log('Request aborted:', url);
        return { success: false, aborted: true };
      }
      
      console.error('API request failed:', error);
      return { 
        success: false, 
        error: error.message || 'Unknown API error',
        status: error.status
      };
    }
  }

  /**
   * Cancel an ongoing request by ID
   * @param {string} requestId - The request ID to cancel
   */
  cancelRequest(requestId) {
    if (this.abortControllers.has(requestId)) {
      this.abortControllers.get(requestId).abort();
      this.abortControllers.delete(requestId);
    }
  }

  /**
   * Get all available notebooks
   * @returns {Promise<Object>} - Notebook data
   */
  async getNotebooks() {
    return this.request(`${this.endpoints.notebooks}`, {
      method: 'GET'
    }, 'get-notebooks');
  }

  /**
   * Get a specific notebook by ID
   * @param {string} notebookId - The notebook ID
   * @returns {Promise<Object>} - Notebook data
   */
  async getNotebook(notebookId) {
    return this.request(`${this.endpoints.notebooks}/${notebookId}`, {
      method: 'GET'
    });
  }

  /**
   * Get pages for a specific notebook
   * @param {string} notebookId - The notebook ID
   * @returns {Promise<Object>} - Pages data
   */
  async getPages(notebookId) {
    return this.request(`${this.endpoints.notebooks}/${notebookId}/pages`, {
      method: 'GET'
    });
  }

  /**
   * Get a specific page by ID
   * @param {string} pageId - The page ID
   * @returns {Promise<Object>} - Page data
   */
  async getPage(pageId) {
    return this.request(`${this.endpoints.pages}/${pageId}`, {
      method: 'GET'
    });
  }

  /**
   * Get relationships between pages or notebooks
   * @param {string} sourceId - Source entity ID
   * @param {Object} options - Filter options
   * @returns {Promise<Object>} - Relationship data
   */
  async getRelationships(sourceId, options = {}) {
    const queryParams = new URLSearchParams(options).toString();
    const url = `${this.endpoints.relationships}/${sourceId}${queryParams ? `?${queryParams}` : ''}`;
    
    return this.request(url, {
      method: 'GET'
    });
  }

  /**
   * Search across notebooks and pages
   * @param {string} query - Search query
   * @param {Object} filters - Search filters
   * @returns {Promise<Object>} - Search results
   */
  async search(query, filters = {}) {
    const params = new URLSearchParams({
      q: query,
      ...filters
    }).toString();
    
    return this.request(`${this.endpoints.search}?${params}`, {
      method: 'GET'
    }, `search-${query}`);
  }

  /**
   * Get mock data for development/testing when API is unavailable
   * @param {string} type - The data type to fetch
   * @returns {Object} - Mock data
   */
  getMockData(type) {
    const mockData = {
      notebooks: [
        { id: 'nb1', title: 'Game Design Documents', description: 'Game design notes and concepts', lastModified: '2023-10-15T10:30:00Z' },
        { id: 'nb2', title: 'Project Logs', description: 'Development journals and updates', lastModified: '2023-11-05T14:22:00Z' },
        { id: 'nb3', title: 'Reference Materials', description: 'External references and inspiration', lastModified: '2023-09-28T08:15:00Z' }
      ],
      pages: {
        'nb1': [
          { id: 'p1', notebookId: 'nb1', title: 'Autumn GDD', path: '/Autumn_GDD.pdf.md', lastModified: '2023-10-10T09:45:00Z', tags: ['design', 'document'] },
          { id: 'p2', notebookId: 'nb1', title: 'Character Design', path: '/Character_Design.gdoc.md', lastModified: '2023-10-12T11:30:00Z', tags: ['characters', 'art'] },
          { id: 'p3', notebookId: 'nb1', title: 'Game Development & Design', path: '/Game_Development_&_Design.txt.md', lastModified: '2023-10-14T16:20:00Z', tags: ['development', 'planning'] }
        ],
        'nb2': [
          { id: 'p4', notebookId: 'nb2', title: 'Game Logs', path: '/Game_Logs.docx.md', lastModified: '2023-11-01T10:15:00Z', tags: ['logs', 'progress'] },
          { id: 'p5', notebookId: 'nb2', title: 'Ongoing Production', path: '/Ongoing_Production.md', lastModified: '2023-11-04T13:45:00Z', tags: ['development', 'production'] }
        ],
        'nb3': [
          { id: 'p6', notebookId: 'nb3', title: 'Kickstarter Tips', path: '/kickstarter_tips.txt.md', lastModified: '2023-09-20T14:30:00Z', tags: ['reference', 'crowdfunding'] },
          { id: 'p7', notebookId: 'nb3', title: 'Publisher Pitch Tips', path: '/Publisher_Pitch_Tips.txt.md', lastModified: '2023-09-25T11:20:00Z', tags: ['reference', 'publishing'] }
        ]
      },
      pageContent: {
        'p1': '# Autumn Game Design Document\n\n## Overview\nAutumn is a narrative-driven adventure game set in a world where seasons have stopped changing.\n\n## Core Mechanics\n- Environmental puzzles\n- Character interactions\n- Season manipulation abilities',
        'p2': '# Character Design Notes\n\n## Main Character\n- Name: Ember\n- Age: 24\n- Background: Forest guardian\n\n## Supporting Characters\n- Winter Keeper\n- Spring Weaver\n- Summer Guardian',
        'p3': '# Game Development & Design Notes\n\n1. Focus on atmospheric storytelling\n2. Minimize UI elements\n3. Use environmental cues for player guidance\n4. Implement a modular quest system'
      },
      relationships: {
        'p1': [
          { source: 'p1', target: 'p2', type: 'references', strength: 0.8 },
          { source: 'p1', target: 'p3', type: 'implements', strength: 0.6 }
        ],
        'p2': [
          { source: 'p2', target: 'p1', type: 'part_of', strength: 0.9 }
        ]
      }
    };
    
    return mockData[type] || null;
  }
}

// Create and export a default instance
const api = new NotebookAPI();
export default api;