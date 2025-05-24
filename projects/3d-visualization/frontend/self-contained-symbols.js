// self-contained-symbols.js
// Loads the symbols integration for the 3D visualization with embedded symbols

(function() {
  // Wait for the scene to be initialized
  function waitForSceneInit(callback) {
    if (window.scene && window.dodecahedron) {
      console.log('Scene initialized, proceeding with symbols integration');
      callback();
    } else {
      console.log('Waiting for scene initialization...');
      setTimeout(() => waitForSceneInit(callback), 100);
    }
  }

  // Function to create color-based symbol texture instead of loading from files
  function createColorSymbol(color, name) {
    // Create a canvas
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    
    // Draw background
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw border
    context.strokeStyle = '#ffffff';
    context.lineWidth = 8;
    context.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
    
    // Draw text (symbol name)
    context.fillStyle = '#ffffff';
    context.font = 'bold 28px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    
    // Wrap text if needed
    const words = name.split(' ');
    const lineHeight = 30;
    let y = canvas.height / 2 - ((words.length - 1) * lineHeight) / 2;
    
    words.forEach(word => {
      context.fillText(word, canvas.width / 2, y);
      y += lineHeight;
    });
    
    // Create texture
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }
  
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
  
  // Initialize the symbols integration
  function initializeSymbols() {
    waitForSceneInit(() => {
      console.log('Initializing symbols on dodecahedron faces');

      // Get the scene and dodecahedron
      const { scene, dodecahedron } = window;
      
      // Create color-based symbols - no file loading needed
      const symbols = [
        { name: 'Elation-Pleasure', color: '#FFD700' }, // Gold
        { name: 'Fear-Anxiety', color: '#8B0000' },     // Dark Red
        { name: 'Gain-Pride', color: '#9932CC' },       // Purple
        { name: 'Misery', color: '#2F4F4F' },           // Dark Slate
        { name: 'Pain', color: '#FF4500' },             // Orange Red
        { name: 'Return-Give', color: '#008000' },      // Green
        { name: 'Var-Response', color: '#4682B4' },     // Steel Blue
        { name: 'Want-Take', color: '#8B4513' },        // Saddle Brown
        { name: 'Empathy', color: '#4B0082' },          // Indigo
        { name: 'Enmity', color: '#DC143C' },           // Crimson
        { name: 'Loss-Shame', color: '#696969' }        // Dim Gray
      ];
      
      // Missing 12th symbol placeholder
      const missingTexture = createTextSymbol('MISSING SYMBOL', '#990000');
      
      // Create textures for all symbols
      const symbolTextures = {};
      symbols.forEach(symbol => {
        symbolTextures[symbol.name] = createColorSymbol(symbol.color, symbol.name);
      });
      
      // Special handling for Balance and Depression
      symbolTextures['Balance'] = createColorSymbol('#1E90FF', 'Balance'); // Dodger Blue
      symbolTextures['Depression'] = createColorSymbol('#8B008B', 'Depression'); // Dark Magenta
      
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
      faces.forEach((face, index) => {
        let texture;
        let symbolName;
        
        if (index < symbols.length) {
          // Use our pre-created symbols
          symbolName = symbols[index].name;
          texture = symbolTextures[symbolName];
        } else {
          // Use missing symbol placeholder for the 12th face
          symbolName = "Missing Symbol";
          texture = missingTexture;
        }
        
        // Create a plane geometry for the symbol
        const symbolGeometry = new THREE.PlaneGeometry(0.7, 0.7); // Slightly smaller than before
        const symbolMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          opacity: 0.9,
          side: THREE.DoubleSide, // Show from both sides
          depthWrite: false // Prevent z-fighting
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
        
        // Add a debugging console log
        console.log(`Added symbol ${symbolName} to face ${index} at position ${face.position.x.toFixed(2)}, ${face.position.y.toFixed(2)}, ${face.position.z.toFixed(2)}`);
      });
      
      // Special handling for Depression (inner core that appears when zooming in)
      const depressionSphereGeometry = new THREE.SphereGeometry(0.4, 32, 32);
      const depressionSphereMaterial = new THREE.MeshBasicMaterial({
        map: symbolTextures['Depression'],
        transparent: true,
        opacity: 0,
        userData: { symbolName: 'Depression' }
      });
      
      const depressionSphere = new THREE.Mesh(depressionSphereGeometry, depressionSphereMaterial);
      depressionSphere.name = 'depression_sphere';
      dodecGroup.add(depressionSphere);
      
      // Store the original animation function
      const originalAnimate = window.animate;
      
      // Method to update symbols based on zoom
      dodecGroup.updateSymbolsBasedOnZoom = function(camera) {
        // Calculate distance from camera to center
        const distance = camera.position.length();
        
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
      if (typeof requestAnimationFrame !== 'undefined' && window.camera) {
        window.animate = function() {
          window.animationFrameId = requestAnimationFrame(window.animate);
          
          // Call the original animation function if it exists
          if (originalAnimate && typeof originalAnimate === 'function') {
            originalAnimate();
          }
          
          // Update symbols based on camera position
          if (dodecGroup.updateSymbolsBasedOnZoom) {
            dodecGroup.updateSymbolsBasedOnZoom(window.camera);
            
            // Update zoom indicator
            const distance = window.camera.position.length();
            const zoomLevel = Math.round(100 / distance);
            
            // Update zoom indicator text based on what's currently visible
            if (distance < 8) {
              zoomIndicator.textContent = `ZOOMED IN: ${zoomLevel}%`;
              // Make it red when Depression is starting to appear
              if (distance < 8) {
                const redIntensity = Math.min(255, Math.round(255 * (1 - (distance - 3) / 5)));
                zoomIndicator.style.backgroundColor = `rgba(${redIntensity}, 0, 0, 0.7)`;
              }
            } else {
              zoomIndicator.textContent = `ZOOM: ${zoomLevel}%`;
              zoomIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            }
          }
        };
      }
      
      console.log('Symbol integration complete - all 11 symbols created and attached to dodecahedron faces');
      
      // Display notification
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
      notification.textContent = 'Self-contained symbols added - double-click to toggle orbit mode';
      document.body.appendChild(notification);
      
      // Remove notification after 5 seconds
      setTimeout(() => {
        notification.style.transition = 'opacity 1s';
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 1000);
      }, 5000);
    });
  }

  // Create notification to show loading status
  const loadingNotification = document.createElement('div');
  loadingNotification.style.position = 'fixed';
  loadingNotification.style.bottom = '20px';
  loadingNotification.style.left = '20px';
  loadingNotification.style.padding = '10px 20px';
  loadingNotification.style.backgroundColor = 'rgba(255, 165, 0, 0.8)';
  loadingNotification.style.color = 'white';
  loadingNotification.style.borderRadius = '5px';
  loadingNotification.style.fontFamily = 'Arial, sans-serif';
  loadingNotification.style.zIndex = '10000';
  loadingNotification.textContent = 'Self-contained symbols loading...';
  document.body.appendChild(loadingNotification);

  // Initialize after the window loads
  if (document.readyState === 'complete') {
    // If already loaded, initialize now
    setTimeout(initializeSymbols, 500);
    // Remove loading notification
    setTimeout(() => {
      loadingNotification.remove();
    }, 1000);
  } else {
    // Otherwise wait for window to load
    window.addEventListener('load', () => {
      setTimeout(initializeSymbols, 500);
      // Remove loading notification
      setTimeout(() => {
        loadingNotification.remove();
      }, 1000);
    });
  }
})();