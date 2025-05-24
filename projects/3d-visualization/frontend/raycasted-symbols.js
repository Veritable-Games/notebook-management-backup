// raycasted-symbols.js - Using raycasting to place visible symbols
// A more robust approach with glow effects and face detection

console.log('Raycasted symbols script loaded');

(function() {
  // Wait for the scene to be ready
  function waitForScene(callback) {
    if (window.scene && window.dodecahedron && window.camera) {
      console.log('Scene and dodecahedron ready');
      callback();
    } else {
      console.log('Waiting for scene initialization...');
      setTimeout(() => waitForScene(callback), 100);
    }
  }

  // Initialize when page loads
  window.addEventListener('load', () => {
    console.log('Window loaded, initializing raycasted symbols');
    setTimeout(() => {
      waitForScene(initRaycastedSymbols);
    }, 1000);
  });

  function initRaycastedSymbols() {
    console.log('Initializing raycasted symbols');
    
    // Symbol definitions with colors
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
      { name: 'Loss-Shame', color: '#696969' },       // Dim Gray
      { name: 'Missing Symbol', color: '#000000' }    // Black
    ];
    
    // Create a group to hold everything
    const mainGroup = new THREE.Group();
    window.scene.add(mainGroup);
    
    // Get the original dodecahedron and its properties
    const originalDodec = window.dodecahedron;
    window.scene.remove(originalDodec);
    mainGroup.add(originalDodec);
    
    // Create a more visible slightly larger translucent dodecahedron for raycasting
    const raycastGeometry = new THREE.DodecahedronGeometry(1.02, 0);
    const raycastMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0, // Invisible but raycasted
      side: THREE.DoubleSide
    });
    const raycastDodec = new THREE.Mesh(raycastGeometry, raycastMaterial);
    mainGroup.add(raycastDodec);
    
    // Store faces - use the raycast geometry since it's a dodecahedron
    const positions = raycastGeometry.getAttribute('position');
    const faceCount = positions.count / 3; // Each face has 3 vertices
    const faces = [];
    
    // Extract face information
    for (let i = 0; i < faceCount; i++) {
      const vertexStartIndex = i * 3;
      
      // Get vertices for this face
      const v1 = new THREE.Vector3(
        positions.getX(vertexStartIndex), 
        positions.getY(vertexStartIndex), 
        positions.getZ(vertexStartIndex)
      );
      
      const v2 = new THREE.Vector3(
        positions.getX(vertexStartIndex + 1), 
        positions.getY(vertexStartIndex + 1), 
        positions.getZ(vertexStartIndex + 1)
      );
      
      const v3 = new THREE.Vector3(
        positions.getX(vertexStartIndex + 2), 
        positions.getY(vertexStartIndex + 2), 
        positions.getZ(vertexStartIndex + 2)
      );
      
      // Calculate face center
      const center = new THREE.Vector3().add(v1).add(v2).add(v3).divideScalar(3);
      
      // Calculate face normal
      const edge1 = new THREE.Vector3().subVectors(v2, v1);
      const edge2 = new THREE.Vector3().subVectors(v3, v1);
      const normal = new THREE.Vector3().crossVectors(edge1, edge2).normalize();
      
      // Store face data
      faces.push({
        vertices: [v1, v2, v3],
        center: center,
        normal: normal,
        index: i
      });
    }
    
    // Create a symbol object for each face
    const symbolObjects = [];
    faces.forEach((face, i) => {
      // Symbol index (there are 12 faces and 12 symbols)
      const symbolIndex = i % symbols.length;
      const symbol = symbols[symbolIndex];
      
      // Create a sprite material with text for the symbol
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext('2d');
      
      // Draw circle background
      context.beginPath();
      context.arc(128, 128, 120, 0, Math.PI * 2);
      context.fillStyle = symbol.color;
      context.fill();
      
      // Draw white border
      context.lineWidth = 8;
      context.strokeStyle = '#ffffff';
      context.stroke();
      
      // Draw symbol name
      context.font = 'bold 32px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillStyle = '#ffffff';
      
      // Split text into lines if needed
      const words = symbol.name.split('-');
      if (words.length > 1) {
        context.fillText(words[0], 128, 108);
        context.fillText(words[1], 128, 148);
      } else {
        context.fillText(symbol.name, 128, 128);
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ 
        map: texture,
        color: 0xffffff,
        transparent: true,
        opacity: 0.9
      });
      
      // Create sprite and position it on the face
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.copy(face.center.clone().normalize().multiplyScalar(1.15));
      sprite.scale.set(0.5, 0.5, 0.5);
      mainGroup.add(sprite);
      
      // Store it with the face index
      symbolObjects.push({
        sprite: sprite,
        faceIndex: i,
        symbolName: symbol.name,
        baseOpacity: 0.9
      });
      
      console.log(`Added symbol ${symbol.name} to face ${i}`);
    });
    
    // Create Depression sphere (inner)
    const depressionGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    
    // Create canvas texture for Depression
    const depCanvas = document.createElement('canvas');
    depCanvas.width = 256;
    depCanvas.height = 256;
    const depContext = depCanvas.getContext('2d');
    
    // Draw circle
    depContext.beginPath();
    depContext.arc(128, 128, 120, 0, Math.PI * 2);
    depContext.fillStyle = '#8B008B'; // Dark Magenta
    depContext.fill();
    
    // Add text
    depContext.font = 'bold 36px Arial';
    depContext.textAlign = 'center';
    depContext.textBaseline = 'middle';
    depContext.fillStyle = '#ffffff';
    depContext.fillText('Depression', 128, 128);
    
    const depTexture = new THREE.CanvasTexture(depCanvas);
    const depressionMaterial = new THREE.MeshBasicMaterial({
      map: depTexture,
      transparent: true,
      opacity: 0
    });
    
    const depressionSphere = new THREE.Mesh(depressionGeometry, depressionMaterial);
    depressionSphere.name = 'depression_sphere';
    mainGroup.add(depressionSphere);
    
    // Update window.dodecahedron reference
    window.dodecahedron = mainGroup;
    
    // Track if we're in orbit mode
    let orbitMode = false;
    
    // Create a shake effect for visual feedback
    function shakeObject(object) {
      if (!object) return;
      
      // Store original position/rotation
      const originalPosition = object.position.clone();
      const originalRotation = object.rotation.clone();
      
      // Small random offsets
      const posOffset = 0.1;
      const rotOffset = 0.05;
      
      // Define shake animation
      let shakeStep = 0;
      const maxSteps = 10;
      
      function performShake() {
        if (shakeStep >= maxSteps) {
          // Reset to original at the end
          object.position.copy(originalPosition);
          object.rotation.copy(originalRotation);
          return;
        }
        
        // Calculate shake intensity (diminishing)
        const intensity = 1 - (shakeStep / maxSteps);
        
        // Apply random offsets
        object.position.set(
          originalPosition.x + (Math.random() - 0.5) * posOffset * intensity,
          originalPosition.y + (Math.random() - 0.5) * posOffset * intensity,
          originalPosition.z + (Math.random() - 0.5) * posOffset * intensity
        );
        
        object.rotation.set(
          originalRotation.x + (Math.random() - 0.5) * rotOffset * intensity,
          originalRotation.y + (Math.random() - 0.5) * rotOffset * intensity,
          originalRotation.z + (Math.random() - 0.5) * rotOffset * intensity
        );
        
        // Increment step
        shakeStep++;
        requestAnimationFrame(performShake);
      }
      
      // Start the shake animation
      performShake();
    }
    
    // Create a mode indicator
    function createModeIndicator() {
      const indicator = document.createElement('div');
      indicator.id = 'mode-indicator';
      indicator.style.position = 'absolute';
      indicator.style.top = '60px';
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
    
    // Toggle orbit mode function
    function toggleOrbitMode() {
      orbitMode = !orbitMode;
      
      // Update controls
      if (window.controls) {
        window.controls.enableRotate = true;
        
        if (orbitMode) {
          // In orbit mode
          window.controls.enablePan = false;
          
          // Visual feedback
          shakeObject(mainGroup);
          
          // Update UI
          const modeIndicator = document.getElementById('mode-indicator') || createModeIndicator();
          modeIndicator.textContent = 'ORBIT MODE';
          modeIndicator.style.backgroundColor = 'rgba(0, 100, 255, 0.7)';
          modeIndicator.style.opacity = '1';
        } else {
          // Normal mode
          window.controls.enablePan = false;
          
          // Update UI
          const modeIndicator = document.getElementById('mode-indicator') || createModeIndicator();
          modeIndicator.textContent = 'NORMAL MODE';
          modeIndicator.style.backgroundColor = 'rgba(100, 100, 100, 0.7)';
          
          // Fade out after 2s
          setTimeout(() => {
            modeIndicator.style.opacity = '0';
          }, 2000);
        }
      }
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
    
    // Raycaster to detect which face is facing the camera
    const raycaster = new THREE.Raycaster();
    
    // Store original animation function
    const originalAnimate = window.animate;
    
    // Override animation to update symbols
    window.animate = function() {
      window.animationFrameId = requestAnimationFrame(window.animate);
      
      // Call original animation if available
      if (originalAnimate && typeof originalAnimate === 'function') {
        originalAnimate();
      }
      
      // Get current camera position
      const cameraPosition = window.camera.position.clone();
      const distance = cameraPosition.length();
      
      // Test which face is most facing the camera
      const cameraDirection = cameraPosition.clone().normalize();
      let maxDot = -Infinity;
      let facingFaceIndex = -1;
      
      // Find face most facing the camera
      faces.forEach((face, index) => {
        // Dot product tells us how aligned the face normal is with camera direction
        // For faces pointing toward camera, we negate the camera direction
        const dot = face.normal.dot(cameraDirection.clone().negate());
        if (dot > maxDot) {
          maxDot = dot;
          facingFaceIndex = index;
        }
      });
      
      // Update symbol opacities based on which is facing camera
      symbolObjects.forEach(obj => {
        if (obj.faceIndex === facingFaceIndex) {
          // Pulse effect for the facing symbol
          const time = Date.now() * 0.001;
          const pulse = Math.sin(time * 3) * 0.1 + 1.1; // Pulsing glow
          obj.sprite.material.opacity = Math.min(1.0, obj.baseOpacity * pulse);
          obj.sprite.scale.set(0.6, 0.6, 0.6); // Slightly larger
        } else {
          // Normal opacity for others
          obj.sprite.material.opacity = obj.baseOpacity;
          obj.sprite.scale.set(0.5, 0.5, 0.5); // Normal size
        }
      });
      
      // Update Depression sphere based on camera distance
      const depressionSphere = mainGroup.getObjectByName('depression_sphere');
      if (depressionSphere) {
        // Start appearing at distance 8, fully visible at 3
        const depressionOpacity = Math.max(0, Math.min(1, 1 - (distance - 3) / 5));
        depressionSphere.material.opacity = depressionOpacity;
      }
      
      // Update zoom indicator
      const zoomLevel = Math.round(100 / distance);
      
      // Update zoom indicator based on current state
      if (distance < 8) {
        zoomIndicator.textContent = `ZOOMED IN: ${zoomLevel}%`;
        if (distance < 8) {
          const redIntensity = Math.min(255, Math.round(255 * (1 - (distance - 3) / 5)));
          zoomIndicator.style.backgroundColor = `rgba(${redIntensity}, 0, 0, 0.7)`;
        }
      } else {
        zoomIndicator.textContent = `ZOOM: ${zoomLevel}%`;
        zoomIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      }
    };
    
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
    notification.textContent = 'Symbol sprites active - double-click to toggle orbit mode';
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
      notification.style.transition = 'opacity 1s';
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 1000);
    }, 5000);
    
    console.log('Raycasted symbols initialized');
  }
})();