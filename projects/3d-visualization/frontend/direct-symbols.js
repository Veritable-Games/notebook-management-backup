// direct-symbols.js - Direct modification of dodecahedron
// A simpler approach to add visible symbols

console.log('Direct symbols script loaded');

(function() {
  // Directly modify the dodecahedron on load
  window.addEventListener('load', () => {
    setTimeout(initDirectSymbols, 1000);
  });

  function initDirectSymbols() {
    // Check if scene and dodecahedron exist
    if (!window.scene || !window.dodecahedron) {
      console.log('Scene or dodecahedron not found, waiting...');
      setTimeout(initDirectSymbols, 500);
      return;
    }
    
    console.log('Starting direct symbol application');
    
    // Create colored materials for each face
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0xFFD700, transparent: true, opacity: 0.8 }), // Gold
      new THREE.MeshBasicMaterial({ color: 0x8B0000, transparent: true, opacity: 0.8 }), // Dark Red
      new THREE.MeshBasicMaterial({ color: 0x9932CC, transparent: true, opacity: 0.8 }), // Purple
      new THREE.MeshBasicMaterial({ color: 0x2F4F4F, transparent: true, opacity: 0.8 }), // Dark Slate
      new THREE.MeshBasicMaterial({ color: 0xFF4500, transparent: true, opacity: 0.8 }), // Orange Red
      new THREE.MeshBasicMaterial({ color: 0x008000, transparent: true, opacity: 0.8 }), // Green
      new THREE.MeshBasicMaterial({ color: 0x4682B4, transparent: true, opacity: 0.8 }), // Steel Blue
      new THREE.MeshBasicMaterial({ color: 0x8B4513, transparent: true, opacity: 0.8 }), // Saddle Brown
      new THREE.MeshBasicMaterial({ color: 0x4B0082, transparent: true, opacity: 0.8 }), // Indigo
      new THREE.MeshBasicMaterial({ color: 0xDC143C, transparent: true, opacity: 0.8 }), // Crimson
      new THREE.MeshBasicMaterial({ color: 0x696969, transparent: true, opacity: 0.8 }), // Dim Gray
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.8 })  // Black (missing)
    ];
    
    // Get the dodecahedron geometry
    const originalDodec = window.dodecahedron;
    const geometry = originalDodec.geometry.clone();
    
    // Create a new geometry for the colored dodecahedron
    const coloredGeometry = new THREE.DodecahedronGeometry(1.05, 0);
    
    // Create a group to hold everything
    const dodecGroup = new THREE.Group();
    
    // Create colored spheres at vertices of the dodecahedron for better visibility
    for (let i = 0; i < 12; i++) {
      // Create a sphere to represent each symbol
      const sphereGeometry = new THREE.SphereGeometry(0.2, 16, 16); 
      const sphereMaterial = materials[i];
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      
      // Position the sphere on a face
      // Calculate position - evenly distributed around the surface
      const theta = Math.acos(-1 + (2 * i) / 12);
      const phi = Math.PI * (1 + Math.sqrt(5)) * i;
      
      sphere.position.x = 1.1 * Math.sin(theta) * Math.cos(phi);
      sphere.position.y = 1.1 * Math.sin(theta) * Math.sin(phi);
      sphere.position.z = 1.1 * Math.cos(theta);
      
      // Add to group
      dodecGroup.add(sphere);
      
      console.log(`Added symbol sphere ${i} at position ${sphere.position.x.toFixed(2)}, ${sphere.position.y.toFixed(2)}, ${sphere.position.z.toFixed(2)}`);
    }
    
    // Add the original dodecahedron
    dodecGroup.add(originalDodec);
    
    // Replace the dodecahedron with our group
    window.scene.remove(originalDodec);
    window.scene.add(dodecGroup);
    window.dodecahedron = dodecGroup;
    
    // Create a special sphere for Depression (inner)
    const depressionGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    const depressionMaterial = new THREE.MeshBasicMaterial({
      color: 0x8B008B, // Dark Magenta
      transparent: true,
      opacity: 0
    });
    
    const depressionSphere = new THREE.Mesh(depressionGeometry, depressionMaterial);
    depressionSphere.name = 'depression_sphere';
    dodecGroup.add(depressionSphere);
    
    // Store the original animate function
    const originalAnimate = window.animate;
    
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
    
    // Override the animation loop to update Depression sphere
    if (typeof requestAnimationFrame !== 'undefined' && window.camera) {
      window.animate = function() {
        window.animationFrameId = requestAnimationFrame(window.animate);
        
        // Call the original animation function if it exists
        if (originalAnimate && typeof originalAnimate === 'function') {
          originalAnimate();
        }
        
        // Update Depression sphere based on camera distance
        const camera = window.camera;
        const distance = camera.position.length();
        
        // Update Depression sphere opacity
        const depressionSphere = dodecGroup.getObjectByName('depression_sphere');
        if (depressionSphere) {
          // Start appearing at distance 8, fully visible at 3
          const depressionOpacity = Math.max(0, Math.min(1, 1 - (distance - 3) / 5));
          depressionSphere.material.opacity = depressionOpacity;
        }
        
        // Update zoom indicator
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
      };
    }
    
    // Display success notification
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
    notification.textContent = 'Colored symbols added - double-click to toggle orbit mode';
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
      notification.style.transition = 'opacity 1s';
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 1000);
    }, 5000);
    
    console.log('Direct symbol application complete - colored spheres added');
  }
})();