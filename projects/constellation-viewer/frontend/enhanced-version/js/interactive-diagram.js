/**
 * Interactive Interface Diagram for Notebook Explorer
 * Creates a visual, interactive representation of the interface
 */

class InteractiveDiagram {
  constructor() {
    this.initialized = false;
    this.active = false;
    this.container = null;
    this.canvas = null;
    this.ctx = null;
    this.components = [];
    this.hoveredComponent = null;
    this.activeComponent = null;
    this.tooltipElement = null;
    this.animationFrame = null;
    
    // Bind methods
    this.init = this.init.bind(this);
    this.toggle = this.toggle.bind(this);
    this.render = this.render.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.findComponentAt = this.findComponentAt.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.createSimulatedAction = this.createSimulatedAction.bind(this);
    
    // Initialize
    document.addEventListener('DOMContentLoaded', this.init);
  }
  
  /**
   * Initialize the diagram
   */
  init() {
    if (this.initialized) return;
    
    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Show Interactive Diagram';
    toggleButton.className = 'diagram-toggle-button';
    toggleButton.style.cssText = `
      position: fixed;
      bottom: 70px;
      right: 20px;
      padding: 8px 16px;
      background-color: var(--color-primary);
      color: white;
      border: none;
      border-radius: 4px;
      font-weight: bold;
      cursor: pointer;
      z-index: 1000;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    `;
    toggleButton.addEventListener('click', this.toggle);
    document.body.appendChild(toggleButton);
    
    // Create tooltip element
    this.tooltipElement = document.createElement('div');
    this.tooltipElement.className = 'diagram-tooltip';
    this.tooltipElement.style.cssText = `
      position: absolute;
      padding: 8px 12px;
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      border-radius: 4px;
      font-size: 14px;
      pointer-events: none;
      z-index: 2000;
      max-width: 250px;
      display: none;
    `;
    document.body.appendChild(this.tooltipElement);
    
    // Define interface components
    this.components = [
      {
        id: 'header',
        name: 'Header',
        description: 'The main application header containing the title and subtitle.',
        x: 50, y: 50, width: 900, height: 100,
        color: '#9c27b0',
        render: (ctx) => {
          ctx.fillStyle = '#9c27b0';
          ctx.fillRect(50, 50, 900, 100);
          ctx.fillStyle = 'white';
          ctx.font = 'bold 24px Arial';
          ctx.fillText('Notebook Explorer', 400, 90);
          ctx.font = '16px Arial';
          ctx.fillText('Browse Your Text Notebooks', 400, 120);
        }
      },
      {
        id: 'sidebar',
        name: 'Sidebar',
        description: 'Contains notebook collections, file lists, and navigation options.',
        x: 50, y: 170, width: 250, height: 400,
        color: '#2196f3',
        render: (ctx) => {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(50, 170, 250, 400);
          ctx.strokeStyle = '#e0e0e0';
          ctx.lineWidth = 1;
          ctx.strokeRect(50, 170, 250, 400);
          
          // Collection dropdown
          ctx.fillStyle = '#f5f5f5';
          ctx.fillRect(70, 190, 210, 40);
          ctx.fillStyle = '#424242';
          ctx.font = '14px Arial';
          ctx.fillText('Notebook Collection:', 80, 210);
          ctx.fillText('Game Design Documents', 80, 225);
          
          // Files section
          ctx.fillStyle = '#424242';
          ctx.font = 'bold 16px Arial';
          ctx.fillText('Files:', 70, 260);
          
          // Search box
          ctx.fillStyle = '#f5f5f5';
          ctx.fillRect(70, 270, 210, 30);
          ctx.fillStyle = '#9e9e9e';
          ctx.font = '14px Arial';
          ctx.fillText('🔍 Search files...', 80, 290);
          
          // File list
          const files = [
            'Autumn_GDD.pdf.md',
            'Character_Design.gdoc.md',
            'Game_Development.txt.md',
            'Mechanics (folder)',
            'Project_-_Dodec.md'
          ];
          
          files.forEach((file, index) => {
            ctx.fillStyle = this.activeComponent === 'file-' + index ? '#e1bee7' : 'transparent';
            ctx.fillRect(70, 310 + index * 30, 210, 25);
            ctx.fillStyle = '#424242';
            ctx.font = '14px Arial';
            ctx.fillText(file, 80, 330 + index * 30);
          });
          
          // Tags
          ctx.fillStyle = '#424242';
          ctx.font = 'bold 16px Arial';
          ctx.fillText('Tags:', 70, 480);
          
          // Tag pills
          const tags = ['design', 'concept', 'character'];
          tags.forEach((tag, index) => {
            ctx.fillStyle = this.activeComponent === 'tag-' + index ? '#ba68c8' : '#f3e5f5';
            ctx.beginPath();
            ctx.roundRect(70 + index * 70, 490, 65, 25, 12);
            ctx.fill();
            ctx.fillStyle = '#7b1fa2';
            ctx.font = '12px Arial';
            ctx.fillText('#' + tag, 75 + index * 70, 507);
          });
        },
        clickableAreas: [
          {
            id: 'collection',
            name: 'Collection Dropdown',
            description: 'Select a notebook collection to browse.',
            x: 70, y: 190, width: 210, height: 40,
            action: () => this.createSimulatedAction('Changed collection to "Project Logs"')
          },
          {
            id: 'search',
            name: 'Search Files',
            description: 'Search for files by name or content.',
            x: 70, y: 270, width: 210, height: 30,
            action: () => this.createSimulatedAction('Searching for files...')
          },
          // Files clickable areas
          {
            id: 'file-0',
            name: 'Autumn_GDD.pdf.md',
            description: 'Game design document for Project Autumn.',
            x: 70, y: 310, width: 210, height: 25,
            action: () => this.createSimulatedAction('Loading Autumn_GDD.pdf.md')
          },
          {
            id: 'file-1',
            name: 'Character_Design.gdoc.md',
            description: 'Character designs and concepts.',
            x: 70, y: 340, width: 210, height: 25,
            action: () => this.createSimulatedAction('Loading Character_Design.gdoc.md')
          },
          {
            id: 'file-2',
            name: 'Game_Development.txt.md',
            description: 'Notes on game development.',
            x: 70, y: 370, width: 210, height: 25,
            action: () => this.createSimulatedAction('Loading Game_Development.txt.md')
          },
          {
            id: 'file-3',
            name: 'Mechanics (folder)',
            description: 'Folder containing game mechanics documents.',
            x: 70, y: 400, width: 210, height: 25,
            action: () => this.createSimulatedAction('Opening Mechanics folder')
          },
          {
            id: 'file-4',
            name: 'Project_-_Dodec.md',
            description: 'Project documentation for Dodec.',
            x: 70, y: 430, width: 210, height: 25,
            action: () => this.createSimulatedAction('Loading Project_-_Dodec.md')
          },
          // Tag clickable areas
          {
            id: 'tag-0',
            name: '#design',
            description: 'Filter files by design tag.',
            x: 70, y: 490, width: 65, height: 25,
            action: () => this.createSimulatedAction('Filtering by #design tag')
          },
          {
            id: 'tag-1',
            name: '#concept',
            description: 'Filter files by concept tag.',
            x: 140, y: 490, width: 65, height: 25,
            action: () => this.createSimulatedAction('Filtering by #concept tag')
          },
          {
            id: 'tag-2',
            name: '#character',
            description: 'Filter files by character tag.',
            x: 210, y: 490, width: 65, height: 25,
            action: () => this.createSimulatedAction('Filtering by #character tag')
          }
        ]
      },
      {
        id: 'content',
        name: 'Content Area',
        description: 'The main content area displaying the selected file.',
        x: 320, y: 170, width: 630, height: 400,
        color: '#4caf50',
        render: (ctx) => {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(320, 170, 630, 400);
          ctx.strokeStyle = '#e0e0e0';
          ctx.lineWidth = 1;
          ctx.strokeRect(320, 170, 630, 400);
          
          // Navigation bar
          ctx.fillStyle = '#f5f5f5';
          ctx.fillRect(330, 180, 610, 40);
          
          // Back/forward buttons
          ctx.fillStyle = '#e0e0e0';
          ctx.beginPath();
          ctx.roundRect(340, 190, 30, 20, 4);
          ctx.fill();
          ctx.fillStyle = '#424242';
          ctx.font = '14px Arial';
          ctx.fillText('⬅', 350, 205);
          
          ctx.fillStyle = '#e0e0e0';
          ctx.beginPath();
          ctx.roundRect(380, 190, 30, 20, 4);
          ctx.fill();
          ctx.fillStyle = '#424242';
          ctx.fillText('➡', 390, 205);
          
          // Content title
          ctx.fillStyle = '#212121';
          ctx.font = 'bold 20px Arial';
          ctx.fillText('Game Development & Design', 330, 250);
          
          // Content tabs
          ctx.fillStyle = '#f5f5f5';
          ctx.fillRect(330, 260, 610, 30);
          
          // Tabs
          const tabs = ['Read', 'Edit', 'History'];
          tabs.forEach((tab, index) => {
            const isActive = index === 0;
            ctx.fillStyle = isActive ? '#e1bee7' : 'transparent';
            ctx.fillRect(330 + index * 80, 260, 80, 30);
            ctx.fillStyle = isActive ? '#7b1fa2' : '#616161';
            ctx.font = '14px Arial';
            ctx.fillText(tab, 360 + index * 80, 280);
          });
          
          // Content body
          ctx.fillStyle = '#f5f5f5';
          ctx.fillRect(330, 300, 610, 260);
          
          // Document content
          ctx.fillStyle = '#212121';
          ctx.font = 'bold 18px Arial';
          ctx.fillText('Game Development & Design Notes', 350, 330);
          
          ctx.font = '14px Arial';
          ctx.fillText('1. Focus on atmospheric storytelling', 350, 360);
          ctx.fillText('2. Minimize UI elements', 350, 380);
          ctx.fillText('3. Use environmental cues for player guidance', 350, 400);
          ctx.fillText('4. Implement a modular quest system', 350, 420);
          
          ctx.font = 'bold 16px Arial';
          ctx.fillText('Design Principles', 350, 450);
          
          ctx.font = '14px Arial';
          ctx.fillText('Ensure players feel their choices matter and have meaningful', 350, 470);
          ctx.fillText('impact on the game world.', 350, 490);
        },
        clickableAreas: [
          {
            id: 'back-button',
            name: 'Back Button',
            description: 'Navigate to the previously viewed file.',
            x: 340, y: 190, width: 30, height: 20,
            action: () => this.createSimulatedAction('Navigating back')
          },
          {
            id: 'forward-button',
            name: 'Forward Button',
            description: 'Navigate forward in history.',
            x: 380, y: 190, width: 30, height: 20,
            action: () => this.createSimulatedAction('Navigating forward')
          },
          {
            id: 'read-tab',
            name: 'Read Tab',
            description: 'View the file content in read mode.',
            x: 330, y: 260, width: 80, height: 30,
            action: () => this.createSimulatedAction('Switched to Read tab')
          },
          {
            id: 'edit-tab',
            name: 'Edit Tab',
            description: 'Edit the file content.',
            x: 410, y: 260, width: 80, height: 30,
            action: () => this.createSimulatedAction('Switched to Edit tab')
          },
          {
            id: 'history-tab',
            name: 'History Tab',
            description: 'View the file revision history.',
            x: 490, y: 260, width: 80, height: 30,
            action: () => this.createSimulatedAction('Switched to History tab')
          }
        ]
      },
      {
        id: 'footer',
        name: 'Footer',
        description: 'Contains version information and copyright.',
        x: 50, y: 590, width: 900, height: 60,
        color: '#9c27b0',
        render: (ctx) => {
          ctx.fillStyle = '#9c27b0';
          ctx.fillRect(50, 590, 900, 60);
          ctx.fillStyle = 'white';
          ctx.font = '14px Arial';
          ctx.fillText('Notebook Explorer v1.0 | The Essential Text Browser', 400, 620);
          ctx.fillText('© 2025 Zim Notebook Viewer', 400, 640);
        }
      },
      {
        id: 'demo-badge',
        name: 'Demo Badge',
        description: 'Indicates that the application is running in demo mode with sample data.',
        x: 50, y: 500, width: 150, height: 70,
        color: '#7b1fa2',
        render: (ctx) => {
          ctx.fillStyle = 'rgba(156, 39, 176, 0.9)';
          ctx.beginPath();
          ctx.roundRect(50, 500, 150, 70, 6);
          ctx.fill();
          
          ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
          ctx.fillRect(50, 500, 150, 25);
          
          ctx.fillStyle = 'white';
          ctx.font = 'bold 14px Arial';
          ctx.fillText('DEMO MODE', 90, 517);
          
          ctx.font = '12px Arial';
          ctx.fillText('Using sample data', 65, 540);
          ctx.fillText('Collection: Game Design', 65, 560);
        }
      }
    ];
    
    this.initialized = true;
  }
  
  /**
   * Toggle the diagram visibility
   */
  toggle() {
    if (this.active) {
      this.hide();
    } else {
      this.show();
    }
  }
  
  /**
   * Show the diagram
   */
  show() {
    if (this.active) return;
    
    // Create container
    this.container = document.createElement('div');
    this.container.className = 'interactive-diagram-container';
    this.container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 1500;
    `;
    
    // Create header
    const header = document.createElement('div');
    header.style.cssText = `
      width: 100%;
      color: white;
      padding: 20px;
      text-align: center;
    `;
    header.innerHTML = '<h2>Interactive Interface Diagram</h2><p>Click on elements to see simulated actions. Hover for details.</p>';
    this.container.appendChild(header);
    
    // Create canvas
    this.canvas = document.createElement('canvas');
    this.canvas.width = 1000;
    this.canvas.height = 700;
    this.canvas.style.cssText = `
      background-color: #f5f5f5;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    `;
    this.container.appendChild(this.canvas);
    
    // Create footer
    const footer = document.createElement('div');
    footer.style.cssText = `
      width: 100%;
      color: white;
      padding: 20px;
      text-align: center;
    `;
    
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close Diagram';
    closeButton.style.cssText = `
      padding: 8px 16px;
      background-color: #f44336;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    `;
    closeButton.addEventListener('click', this.toggle);
    footer.appendChild(closeButton);
    this.container.appendChild(footer);
    
    // Add to document
    document.body.appendChild(this.container);
    
    // Get context
    this.ctx = this.canvas.getContext('2d');
    
    // Add event listeners
    this.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.canvas.addEventListener('click', this.handleClick);
    
    // Start rendering
    this.active = true;
    this.render();
    
    // Update button text
    const toggleButton = document.querySelector('.diagram-toggle-button');
    if (toggleButton) {
      toggleButton.textContent = 'Hide Interactive Diagram';
    }
  }
  
  /**
   * Hide the diagram
   */
  hide() {
    if (!this.active) return;
    
    // Stop rendering
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    
    // Remove event listeners
    if (this.canvas) {
      this.canvas.removeEventListener('mousemove', this.handleMouseMove);
      this.canvas.removeEventListener('click', this.handleClick);
    }
    
    // Remove container
    if (this.container) {
      document.body.removeChild(this.container);
      this.container = null;
      this.canvas = null;
      this.ctx = null;
    }
    
    // Hide tooltip
    this.hideTooltip();
    
    // Reset state
    this.active = false;
    this.hoveredComponent = null;
    this.activeComponent = null;
    
    // Update button text
    const toggleButton = document.querySelector('.diagram-toggle-button');
    if (toggleButton) {
      toggleButton.textContent = 'Show Interactive Diagram';
    }
  }
  
  /**
   * Render the diagram
   */
  render() {
    if (!this.active || !this.ctx) return;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Render components
    this.components.forEach(component => {
      component.render(this.ctx);
    });
    
    // Schedule next frame
    this.animationFrame = requestAnimationFrame(this.render);
  }
  
  /**
   * Handle mouse movement
   * @param {MouseEvent} event - The mouse event
   */
  handleMouseMove(event) {
    // Get mouse position relative to canvas
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Find component at position
    const component = this.findComponentAt(x, y);
    
    // Update hover state
    if (component !== this.hoveredComponent) {
      this.hoveredComponent = component;
      
      if (component) {
        this.showTooltip(component, event.clientX, event.clientY);
      } else {
        this.hideTooltip();
      }
    } else if (component && this.tooltipElement) {
      // Update tooltip position
      this.tooltipElement.style.left = (event.clientX + 10) + 'px';
      this.tooltipElement.style.top = (event.clientY + 10) + 'px';
    }
  }
  
  /**
   * Handle mouse click
   * @param {MouseEvent} event - The mouse event
   */
  handleClick(event) {
    // Get mouse position relative to canvas
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Find component at position
    const component = this.findComponentAt(x, y);
    
    // Trigger action
    if (component && component.action) {
      this.activeComponent = component.id;
      component.action();
    }
  }
  
  /**
   * Find component at position
   * @param {number} x - The x position
   * @param {number} y - The y position
   * @returns {Object|null} - The component at position or null
   */
  findComponentAt(x, y) {
    // Check clickable areas first
    for (const component of this.components) {
      if (component.clickableAreas) {
        for (const area of component.clickableAreas) {
          if (
            x >= area.x && x <= area.x + area.width &&
            y >= area.y && y <= area.y + area.height
          ) {
            return area;
          }
        }
      }
    }
    
    // Then check components
    for (const component of this.components) {
      if (
        x >= component.x && x <= component.x + component.width &&
        y >= component.y && y <= component.y + component.height
      ) {
        return component;
      }
    }
    
    return null;
  }
  
  /**
   * Show tooltip for component
   * @param {Object} component - The component to show tooltip for
   * @param {number} x - The x position
   * @param {number} y - The y position
   */
  showTooltip(component, x, y) {
    if (!this.tooltipElement) return;
    
    this.tooltipElement.innerHTML = `
      <div><strong>${component.name}</strong></div>
      <div>${component.description || ''}</div>
      ${component.action ? '<div><em>Click to interact</em></div>' : ''}
    `;
    
    this.tooltipElement.style.left = (x + 10) + 'px';
    this.tooltipElement.style.top = (y + 10) + 'px';
    this.tooltipElement.style.display = 'block';
  }
  
  /**
   * Hide tooltip
   */
  hideTooltip() {
    if (this.tooltipElement) {
      this.tooltipElement.style.display = 'none';
    }
  }
  
  /**
   * Create a simulated action
   * @param {string} action - The action description
   */
  createSimulatedAction(action) {
    // Create simulation notice
    const notice = document.createElement('div');
    notice.className = 'simulation-notice';
    notice.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: rgba(33, 150, 243, 0.9);
      color: white;
      padding: 15px 20px;
      border-radius: 4px;
      z-index: 2000;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      transition: opacity 0.3s;
      max-width: 300px;
    `;
    
    notice.innerHTML = `
      <div style="font-weight: bold; margin-bottom: 5px;">Simulated Action</div>
      <div>${action}</div>
    `;
    
    document.body.appendChild(notice);
    
    // Remove after delay
    setTimeout(() => {
      notice.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(notice);
      }, 300);
    }, 3000);
    
    // Log to console
    console.log('Simulated Action:', action);
  }
}

// Create and initialize the diagram
const interactiveDiagram = new InteractiveDiagram();