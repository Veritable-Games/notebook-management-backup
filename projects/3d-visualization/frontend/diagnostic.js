// diagnostic.js - Diagnostics to understand why symbols aren't appearing
// This script will check various aspects of the 3D scene and log detailed information

console.log('===== DIAGNOSTIC SCRIPT LOADED =====');

(function() {
  // Store the original console.log to ensure our diagnostics work
  const originalConsoleLog = console.log;
  console.log = function() {
    // Call original console.log
    originalConsoleLog.apply(console, arguments);
    
    // Also log to our diagnostic panel if it exists
    const diagPanel = document.getElementById('diagnostic-panel');
    if (diagPanel) {
      const args = Array.from(arguments);
      const message = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' ');
      
      const line = document.createElement('div');
      line.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
      diagPanel.appendChild(line);
      
      // Keep only last 20 lines
      while (diagPanel.childNodes.length > 20) {
        diagPanel.removeChild(diagPanel.firstChild);
      }
      
      diagPanel.scrollTop = diagPanel.scrollHeight;
    }
  };
  
  // Create diagnostic panel
  function createDiagnosticPanel() {
    const panel = document.createElement('div');
    panel.id = 'diagnostic-panel';
    panel.style.position = 'fixed';
    panel.style.top = '10px';
    panel.style.left = '10px';
    panel.style.width = '600px';
    panel.style.height = '300px';
    panel.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    panel.style.color = '#00ff00';
    panel.style.padding = '10px';
    panel.style.fontFamily = 'monospace';
    panel.style.fontSize = '12px';
    panel.style.overflow = 'auto';
    panel.style.zIndex = '10000';
    panel.style.border = '1px solid #00ff00';
    document.body.appendChild(panel);
    return panel;
  }
  
  // Main diagnostic function
  function runDiagnostics() {
    console.log('Running scene diagnostics...');
    
    // Create diagnostic panel if it doesn't exist
    let diagPanel = document.getElementById('diagnostic-panel');
    if (!diagPanel) {
      diagPanel = createDiagnosticPanel();
    }
    
    // First check: Is THREE.js loaded?
    const threeLoaded = typeof THREE !== 'undefined';
    console.log(`THREE.js loaded: ${threeLoaded}`);
    if (!threeLoaded) {
      console.log('ERROR: THREE.js is not loaded! Symbols cannot be displayed.');
      return;
    }
    
    // Second check: Is the scene initialized?
    const sceneInitialized = typeof window.scene !== 'undefined';
    console.log(`Scene initialized: ${sceneInitialized}`);
    if (!sceneInitialized) {
      console.log('WARNING: Scene not initialized yet. Will check again in 1 second.');
      setTimeout(runDiagnostics, 1000);
      return;
    }
    
    // Third check: Is dodecahedron present?
    const dodecPresent = typeof window.dodecahedron !== 'undefined';
    console.log(`Dodecahedron present: ${dodecPresent}`);
    if (!dodecPresent) {
      console.log('ERROR: Dodecahedron is not present in the scene!');
    } else {
      // Log details about the dodecahedron
      console.log(`Dodecahedron type: ${window.dodecahedron.constructor.name}`);
      console.log(`Dodecahedron visible: ${window.dodecahedron.visible}`);
      
      if (window.dodecahedron.geometry) {
        console.log(`Geometry type: ${window.dodecahedron.geometry.constructor.name}`);
        console.log(`Vertex count: ${window.dodecahedron.geometry.attributes?.position?.count || 'unknown'}`);
      }
      
      if (window.dodecahedron.material) {
        console.log(`Material type: ${window.dodecahedron.material.constructor.name}`);
        console.log(`Material color: ${window.dodecahedron.material.color?.getHexString() || 'unknown'}`);
        console.log(`Material transparent: ${window.dodecahedron.material.transparent}`);
        console.log(`Material opacity: ${window.dodecahedron.material.opacity}`);
      }
      
      // Check children
      const childCount = window.dodecahedron.children?.length || 0;
      console.log(`Dodecahedron has ${childCount} children`);
      
      // Check position
      console.log(`Position: x=${window.dodecahedron.position.x.toFixed(2)}, y=${window.dodecahedron.position.y.toFixed(2)}, z=${window.dodecahedron.position.z.toFixed(2)}`);
    }
    
    // Fourth check: Is camera present?
    const cameraPresent = typeof window.camera !== 'undefined';
    console.log(`Camera present: ${cameraPresent}`);
    if (cameraPresent) {
      console.log(`Camera type: ${window.camera.constructor.name}`);
      console.log(`Camera position: x=${window.camera.position.x.toFixed(2)}, y=${window.camera.position.y.toFixed(2)}, z=${window.camera.position.z.toFixed(2)}`);
    }
    
    // Fifth check: Is the renderer present?
    const rendererPresent = typeof window.renderer !== 'undefined';
    console.log(`Renderer present: ${rendererPresent}`);
    if (rendererPresent) {
      console.log(`Renderer type: ${window.renderer.constructor.name}`);
      console.log(`Renderer size: ${window.renderer.domElement.width}x${window.renderer.domElement.height}`);
    }
    
    // Sixth check: Is the animation loop running?
    const animationRunning = typeof window.animate === 'function' && typeof window.animationFrameId !== 'undefined';
    console.log(`Animation running: ${animationRunning}`);
    
    // Seventh check: Check THREE.js version
    console.log(`THREE.js version: ${THREE.REVISION || 'unknown'}`);
    
    // Check if our hook for symbols has been called
    console.log('Now attempting to inject visible TEST symbol into scene...');
    
    // Add a VERY visible test object to the scene - this should be impossible to miss
    try {
      // Create a bright red sphere
      const testGeometry = new THREE.SphereGeometry(0.5, 32, 32);
      const testMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const testSphere = new THREE.Mesh(testGeometry, testMaterial);
      testSphere.position.set(0, 0, 2); // Position in front of everything
      testSphere.name = 'diagnostic-test-sphere';
      
      // Remove any previous test sphere
      const prevSphere = window.scene.getObjectByName('diagnostic-test-sphere');
      if (prevSphere) {
        window.scene.remove(prevSphere);
      }
      
      // Add to scene
      window.scene.add(testSphere);
      console.log('TEST SPHERE ADDED TO SCENE - Should be bright red and very visible');
      
      // Create a text sprite
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext('2d');
      
      // Fill with bright green background
      context.fillStyle = '#00ff00';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add text
      context.font = 'bold 36px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillStyle = '#000000';
      context.fillText('TEST', 128, 128);
      
      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ 
        map: texture
      });
      
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(0, 0, -2); // Position behind everything
      sprite.scale.set(1, 1, 1);
      sprite.name = 'diagnostic-test-sprite';
      
      // Remove any previous test sprite
      const prevSprite = window.scene.getObjectByName('diagnostic-test-sprite');
      if (prevSprite) {
        window.scene.remove(prevSprite);
      }
      
      // Add to scene
      window.scene.add(sprite);
      console.log('TEST SPRITE ADDED TO SCENE - Should be bright green with TEST text');
    } catch (error) {
      console.log(`ERROR adding test objects: ${error.message}`);
    }
    
    // Add debug command buttons
    const commandPanel = document.createElement('div');
    commandPanel.style.position = 'fixed';
    commandPanel.style.top = '320px';
    commandPanel.style.left = '10px';
    commandPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    commandPanel.style.border = '1px solid #00ff00';
    commandPanel.style.padding = '10px';
    commandPanel.style.zIndex = '10000';
    document.body.appendChild(commandPanel);
    
    // Add buttons for different tests
    const clearSceneBtn = document.createElement('button');
    clearSceneBtn.textContent = 'Clear Scene';
    clearSceneBtn.onclick = () => {
      if (window.scene) {
        while (window.scene.children.length > 0) {
          window.scene.remove(window.scene.children[0]);
        }
        console.log('SCENE CLEARED');
      }
    };
    commandPanel.appendChild(clearSceneBtn);
    
    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Reset Scene';
    resetBtn.style.marginLeft = '10px';
    resetBtn.onclick = () => {
      window.location.reload();
    };
    commandPanel.appendChild(resetBtn);
    
    const testShakeBtn = document.createElement('button');
    testShakeBtn.textContent = 'Test Shake';
    testShakeBtn.style.marginLeft = '10px';
    testShakeBtn.onclick = () => {
      if (window.dodecahedron) {
        shakeObject(window.dodecahedron);
      }
    };
    commandPanel.appendChild(testShakeBtn);
    
    // Simple shake function for testing
    function shakeObject(object) {
      console.log('Shaking object...');
      if (!object) return;
      
      const originalPosition = object.position.clone();
      const originalRotation = object.rotation.clone();
      
      const posOffset = 0.1;
      const rotOffset = 0.05;
      
      let shakeStep = 0;
      const maxSteps = 10;
      
      function performShake() {
        if (shakeStep >= maxSteps) {
          object.position.copy(originalPosition);
          object.rotation.copy(originalRotation);
          console.log('Shake complete');
          return;
        }
        
        const intensity = 1 - (shakeStep / maxSteps);
        
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
        
        shakeStep++;
        requestAnimationFrame(performShake);
      }
      
      performShake();
    }
    
    console.log('Diagnostic complete - will run again in 5 seconds');
    
    // Run diagnostics again in 5 seconds
    setTimeout(runDiagnostics, 5000);
  }

  // Start diagnostics when window loads
  if (document.readyState === 'complete') {
    runDiagnostics();
  } else {
    window.addEventListener('load', () => {
      // Give page time to initialize
      setTimeout(runDiagnostics, 1000);
    });
  }
})();