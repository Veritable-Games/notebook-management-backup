// symbols-integration.js
// Integration module for adding symbols to the dodecahedron faces

// Wait for the scene to be initialized
const waitForInitialization = (callback) => {
  if (window.scene && window.dodecahedron) {
    callback();
  } else {
    setTimeout(() => waitForInitialization(callback), 100);
  }
};

// Main integration function
export function initializeSymbols() {
  waitForInitialization(() => {
    console.log('Initializing symbols on dodecahedron faces');
    
    // Define symbol files - excluding Balance and Depression as they'll be handled separately
    const symbolFiles = [
      'Elation-Pleasure.png',
      'Fear-Anxiety.png',
      'Gain-Pride.png',
      'Misery.png',
      'Pain.png',
      'Return-Give.png',
      'Var-Response.png',
      'Want-Take.png'
    ];
    
    // Define text files that need placeholder visuals
    const textFiles = [
      'Empathy.txt',
      'Enmity.txt',
      'Loss-Shame.txt'
    ];
    
    // Missing 12th symbol placeholder
    const missingSymbolText = 'MISSING SYMBOL';
    
    // Get the scene and dodecahedron
    const { scene, dodecahedron } = window;
    
    // Function to create text-based symbol texture
    function createTextSymbol(text, bgColor = '#3366cc', textColor = '#ffffff', border = true) {
      // Create a canvas
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext('2d');
      
      // Draw background
      context.fillStyle = bgColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw border if needed
      if (border) {
        context.strokeStyle = textColor;
        context.lineWidth = 8;
        context.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
      }
      
      // Draw text
      context.fillStyle = textColor;
      context.font = 'bold 36px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      
      // Wrap text if needed
      const words = text.split(' ');
      const lineHeight = 40;
      let y = canvas.height / 2 - ((words.length - 1) * lineHeight) / 2;
      
      words.forEach(word => {
        context.fillText(word, canvas.width / 2, y);
        y += lineHeight;
      });
      
      // Create texture
      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    }
    
    // Create placeholder textures for text files
    const textSymbols = {};
    textFiles.forEach(filename => {
      const basename = filename.replace('.txt', '');
      textSymbols[basename] = createTextSymbol(basename);
    });
    
    // Add missing symbol placeholder
    const missingTexture = createTextSymbol(missingSymbolText, '#990000');
    
    // Create a group to hold the dodecahedron and its symbols
    const dodecGroup = new THREE.Group();
    scene.add(dodecGroup);
    
    // Remove existing dodecahedron from scene and add to our group
    scene.remove(dodecahedron);
    dodecGroup.add(dodecahedron);
    
    // Store the original dodecahedron rotation
    window.dodecahedron = dodecGroup;
    
    // Extract face information from the dodecahedron geometry
    const geometry = dodecahedron.geometry;
    const positions = geometry.getAttribute('position');
    const faces = [];
    
    // A dodecahedron has 12 faces, each with 3 vertices
    for (let i = 0; i < positions.count; i += 3) {
      // Calculate face center
      const face = {
        center: new THREE.Vector3(),
        normal: new THREE.Vector3()
      };
      
      // Collect vertices for this face
      const v1 = new THREE.Vector3(positions.getX(i), positions.getY(i), positions.getZ(i));
      const v2 = new THREE.Vector3(positions.getX(i+1), positions.getY(i+1), positions.getZ(i+1));
      const v3 = new THREE.Vector3(positions.getX(i+2), positions.getY(i+2), positions.getZ(i+2));
      
      // Calculate face center by averaging vertices
      face.center.add(v1).add(v2).add(v3).divideScalar(3);
      
      // Calculate face normal using cross product
      const edge1 = new THREE.Vector3().subVectors(v2, v1);
      const edge2 = new THREE.Vector3().subVectors(v3, v1);
      face.normal.crossVectors(edge1, edge2).normalize();
      
      // Extend center to position symbol on the surface
      const centerPos = face.center.clone().normalize().multiplyScalar(1.05);
      face.position = centerPos;
      
      // Calculate rotation to face outward
      face.rotation = new THREE.Euler();
      const upVector = new THREE.Vector3(0, 1, 0);
      
      // Create a quaternion from our normal to the up vector
      const quaternion = new THREE.Quaternion().setFromUnitVectors(
        upVector, 
        face.normal
      );
      
      // Convert quaternion to euler angles
      face.rotation.setFromQuaternion(quaternion);
      
      faces.push(face);
    }
    
    // Add a symbol to each face
    // Calculate how many faces we have to fill: 12 total
    // We have 8 image files (excluding Balance and Depression), 3 text files, and 1 missing symbol
    const totalSymbols = symbolFiles.length + Object.keys(textSymbols).length + 1; // +1 for missing symbol
    
    faces.forEach((face, index) => {
      let texture;
      let symbolName;
      
      if (index < symbolFiles.length) {
        // Use image symbols for first 8 faces
        symbolName = symbolFiles[index];
        
        // Load from server
        const loader = new THREE.TextureLoader();
        loader.crossOrigin = 'anonymous';
        
        // The server is configured to serve these files from ~/Desktop/symbols-copy/
        texture = loader.load(`/symbols/${symbolName}`);
        
      } else if (index < symbolFiles.length + Object.keys(textSymbols).length) {
        // Use text placeholders for the next 3 faces
        const textIndex = index - symbolFiles.length;
        const textName = Object.keys(textSymbols)[textIndex];
        symbolName = textName + '.txt';
        texture = textSymbols[textName];
        
      } else {
        // Use missing symbol placeholder for the 12th face
        symbolName = "Missing Symbol";
        texture = missingTexture;
      }
      
      // Create a plane geometry for the symbol
      const symbolGeometry = new THREE.PlaneGeometry(0.8, 0.8);
      const symbolMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide // Show from both sides
      });
      
      // Store original opacity and symbol name for animation and interaction
      symbolMaterial.userData = { 
        baseOpacity: 0.9,
        symbolName: symbolName 
      };
      
      const symbol = new THREE.Mesh(symbolGeometry, symbolMaterial);
      symbol.name = `symbol_${index}`;
      
      // Position the symbol on the face
      symbol.position.copy(face.position);
      symbol.rotation.copy(face.rotation);
      
      // Add the symbol to the group
      dodecGroup.add(symbol);
    });
    
    // Special handling for Balance (zoom out) and Depression (zoom in)
    
    // 1. Create Balance symbol (outer sphere that appears when zooming out)
    const balanceLoader = new THREE.TextureLoader();
    balanceLoader.crossOrigin = 'anonymous';
    const balanceTexture = balanceLoader.load('/symbols/Balance.png'); // Served by our server
    
    // Create a large sphere around everything
    const balanceSphereGeometry = new THREE.SphereGeometry(20, 32, 32);
    const balanceSphereMaterial = new THREE.MeshBasicMaterial({
      map: balanceTexture,
      transparent: true,
      opacity: 0,
      side: THREE.BackSide, // Show on inside
      userData: { symbolName: 'Balance' }
    });
    
    const balanceSphere = new THREE.Mesh(balanceSphereGeometry, balanceSphereMaterial);
    balanceSphere.name = 'balance_sphere';
    dodecGroup.add(balanceSphere);
    
    // 2. Create Depression symbol (inner core that appears when zooming in)
    const depressionLoader = new THREE.TextureLoader();
    depressionLoader.crossOrigin = 'anonymous';
    const depressionTexture = depressionLoader.load('/symbols/Depression.png'); // Served by our server
    
    // Create a small sphere at the center
    const depressionSphereGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const depressionSphereMaterial = new THREE.MeshBasicMaterial({
      map: depressionTexture,
      transparent: true,
      opacity: 0,
      userData: { symbolName: 'Depression' }
    });
    
    const depressionSphere = new THREE.Mesh(depressionSphereGeometry, depressionSphereMaterial);
    depressionSphere.name = 'depression_sphere';
    dodecGroup.add(depressionSphere);
    
    // Modify the animation loop to update symbol visibility
    const originalAnimate = window.animate;
    
    // Store the update symbols function on the group for access
    dodecGroup.updateSymbolsBasedOnZoom = function(camera) {
      // Calculate distance from camera to center
      const distance = camera.position.length();
      
      // Handle Balance (outer) symbol - appears when zooming out
      const balanceSphere = this.getObjectByName('balance_sphere');
      if (balanceSphere) {
        // Start appearing at distance 25, fully visible at 40
        const balanceOpacity = Math.max(0, Math.min(1, (distance - 25) / 15));
        balanceSphere.material.opacity = balanceOpacity;
      }
      
      // Handle Depression (inner) symbol - appears when zooming in
      const depressionSphere = this.getObjectByName('depression_sphere');
      if (depressionSphere) {
        // Start appearing at distance 8, fully visible at 3
        const depressionOpacity = Math.max(0, Math.min(1, 1 - (distance - 3) / 5));
        depressionSphere.material.opacity = depressionOpacity;
      }
      
      // Update which symbol is being looked at for glow effect
      this.updateSymbolGlow(camera);
    };
    
    // Method to make symbols glow when centered
    dodecGroup.updateSymbolGlow = function(camera) {
      // Cast a ray from camera to center to find which face is being looked at
      const raycaster = new THREE.Raycaster();
      raycaster.set(camera.position, new THREE.Vector3(0, 0, 0).sub(camera.position).normalize());
      
      // Find intersections with all symbol meshes
      const symbols = this.children.filter(obj => obj.name && obj.name.startsWith('symbol_'));
      const intersects = raycaster.intersectObjects(symbols);
      
      // Reset all symbols to base opacity
      symbols.forEach(symbol => {
        if (symbol.material && symbol.material.userData && symbol.material.userData.baseOpacity) {
          symbol.material.opacity = symbol.material.userData.baseOpacity;
        }
      });
      
      // Make intersected symbol glow
      if (intersects.length > 0) {
        const symbol = intersects[0].object;
        
        // Pulse effect for glowing
        const time = Date.now() * 0.001; // Convert to seconds
        const pulse = Math.sin(time * 3) * 0.1 + 0.9;
        
        // Apply glow effect
        symbol.material.opacity = Math.min(1.0, symbol.material.userData.baseOpacity * 1.2) * pulse;
      }
    };
    
    // Add double-click handling for orbit toggle
    let orbitMode = false;
    
    // Create a shake effect for visual feedback
    function shakeObject(object) {
      if (!object) return;
      
      // Store original position
      const originalPosition = object.position.clone();
      const originalRotation = object.rotation.clone();
      
      // Small random offsets for position
      const posOffset = 0.1;
      const rotOffset = 0.05;
      
      // Define shake animation
      let shakeStep = 0;
      const maxSteps = 10;
      
      function performShake() {
        if (shakeStep >= maxSteps) {
          // Reset to original position/rotation at the end
          object.position.copy(originalPosition);
          object.rotation.copy(originalRotation);
          return;
        }
        
        // Calculate shake intensity (strongest at start, diminishing)
        const intensity = 1 - (shakeStep / maxSteps);
        
        // Apply random position offset
        object.position.set(
          originalPosition.x + (Math.random() - 0.5) * posOffset * intensity,
          originalPosition.y + (Math.random() - 0.5) * posOffset * intensity,
          originalPosition.z + (Math.random() - 0.5) * posOffset * intensity
        );
        
        // Apply random rotation offset
        object.rotation.set(
          originalRotation.x + (Math.random() - 0.5) * rotOffset * intensity,
          originalRotation.y + (Math.random() - 0.5) * rotOffset * intensity,
          originalRotation.z + (Math.random() - 0.5) * rotOffset * intensity
        );
        
        // Increment step and schedule next frame
        shakeStep++;
        requestAnimationFrame(performShake);
      }
      
      // Start the shake animation
      performShake();
    }
    
    // Function to toggle orbit mode
    function toggleOrbitMode() {
      orbitMode = !orbitMode;
      
      // Update controls based on orbit mode
      if (window.controls) {
        window.controls.enableRotate = true; // Always enable rotation
        
        if (orbitMode) {
          // In orbit mode, the camera moves around the object
          window.controls.enablePan = false;
          
          // Visual feedback - "shake" the object
          shakeObject(dodecGroup);
          
          // Update UI to show orbit mode is active
          const modeIndicator = document.getElementById('mode-indicator') || createModeIndicator();
          modeIndicator.textContent = 'ORBIT MODE';
          modeIndicator.style.backgroundColor = 'rgba(0, 100, 255, 0.7)';
          modeIndicator.style.opacity = '1';
        } else {
          // In normal mode, use the original settings
          window.controls.enablePan = false; // Original was false
          
          // Update UI to show normal mode
          const modeIndicator = document.getElementById('mode-indicator') || createModeIndicator();
          modeIndicator.textContent = 'NORMAL MODE';
          modeIndicator.style.backgroundColor = 'rgba(100, 100, 100, 0.7)';
          
          // Fade out after 2 seconds
          setTimeout(() => {
            modeIndicator.style.opacity = '0';
          }, 2000);
        }
      }
    }
    
    // Create a mode indicator element
    function createModeIndicator() {
      const indicator = document.createElement('div');
      indicator.id = 'mode-indicator';
      indicator.style.position = 'absolute';
      indicator.style.top = '60px'; // Below the existing UI
      indicator.style.left = '50%';
      indicator.style.transform = 'translateX(-50%)';
      indicator.style.padding = '8px 16px';
      indicator.style.backgroundColor = 'rgba(0, 100, 255, 0.7)';
      indicator.style.color = 'white';
      indicator.style.borderRadius = '4px';
      indicator.style.fontFamily = 'monospace';
      indicator.style.fontSize = '14px';
      indicator.style.fontWeight = 'bold';
      indicator.style.zIndex = '1000';
      indicator.style.pointerEvents = 'none';
      indicator.style.transition = 'opacity 0.5s ease-out';
      indicator.style.opacity = '0';
      document.body.appendChild(indicator);
      return indicator;
    }
    
    // Add double-click handler
    const canvas = document.querySelector('#cube canvas');
    if (canvas) {
      canvas.addEventListener('dblclick', (event) => {
        event.preventDefault();
        toggleOrbitMode();
        console.log('Double-click: Toggling orbit mode to', orbitMode);
      });
    }
    
    // Create zoom indicator
    const zoomIndicator = document.createElement('div');
    zoomIndicator.id = 'zoom-indicator';
    zoomIndicator.style.position = 'absolute';
    zoomIndicator.style.bottom = '20px';
    zoomIndicator.style.right = '20px';
    zoomIndicator.style.padding = '8px 12px';
    zoomIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    zoomIndicator.style.color = 'white';
    zoomIndicator.style.borderRadius = '4px';
    zoomIndicator.style.fontFamily = 'monospace';
    zoomIndicator.style.fontSize = '14px';
    zoomIndicator.style.userSelect = 'none';
    zoomIndicator.style.zIndex = '1000';
    document.body.appendChild(zoomIndicator);
    
    // Override the animation loop to update symbols
    if (window.requestAnimationFrame && window.camera) {
      window.animate = function() {
        window.animationFrameId = requestAnimationFrame(window.animate);
        
        // Call the original animation function
        if (originalAnimate && typeof originalAnimate === 'function') {
          originalAnimate();
        }
        
        // Update symbols based on camera position
        if (dodecGroup.updateSymbolsBasedOnZoom) {
          const camera = window.camera;
          dodecGroup.updateSymbolsBasedOnZoom(camera);
          
          // Update zoom indicator
          const distance = camera.position.length();
          const zoomLevel = Math.round(100 / distance);
          
          // Update zoom indicator text based on what's currently visible
          if (distance < 8) {
            zoomIndicator.textContent = `ZOOMED IN: ${zoomLevel}%`;
            // Make it red when Depression is starting to appear
            if (distance < 8) {
              const redIntensity = Math.min(255, Math.round(255 * (1 - (distance - 3) / 5)));
              zoomIndicator.style.backgroundColor = `rgba(${redIntensity}, 0, 0, 0.7)`;
            }
          } else if (distance > 25) {
            zoomIndicator.textContent = `ZOOMED OUT: ${zoomLevel}%`;
            // Make it blue when Balance is starting to appear
            if (distance > 25) {
              const blueIntensity = Math.min(255, Math.round(255 * ((distance - 25) / 15)));
              zoomIndicator.style.backgroundColor = `rgba(0, 0, ${blueIntensity}, 0.7)`;
            }
          } else {
            zoomIndicator.textContent = `ZOOM: ${zoomLevel}%`;
            zoomIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
          }
        }
      };
    }
    
    console.log('Symbol integration complete - 11 symbols placed on dodecahedron');
  });
}

// Auto-initialize when this module is loaded
if (typeof window !== 'undefined') {
  console.log('Symbols integration module loaded');
  
  // Add script loaded notification
  const notification = document.createElement('div');
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.left = '20px';
  notification.style.padding = '10px 20px';
  notification.style.backgroundColor = 'rgba(0, 200, 0, 0.8)';
  notification.style.color = 'white';
  notification.style.borderRadius = '5px';
  notification.style.fontFamily = 'Arial, sans-serif';
  notification.style.zIndex = '10000';
  notification.textContent = 'Symbols module loaded - initializing...';
  document.body.appendChild(notification);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.transition = 'opacity 1s';
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 1000);
  }, 3000);
  
  // Initialize after a short delay to ensure the main script has loaded
  setTimeout(() => {
    initializeSymbols();
  }, 500);
}