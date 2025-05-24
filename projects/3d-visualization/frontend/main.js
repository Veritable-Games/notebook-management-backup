import * as THREE from 'three';
import './style.css';

// Import Stats.js (needed for performance monitoring)
const Stats = function() {
  // Simple Stats.js implementation
  return {
    dom: document.createElement('div'),
    update: function() {}
  };
};

// Handle window resize
function onWindowResize() {
  const container = document.getElementById('cube');
  if (!container) return;
  
  const width = container.clientWidth;
  const height = container.clientHeight;
  
  if (window.camera) {
    window.camera.aspect = width / height;
    window.camera.updateProjectionMatrix();
  }
  
  if (window.renderer) {
    window.renderer.setSize(width, height);
  }
  
  // Log resize event if logger exists
  if (window.logger) {
    window.logger('Window resized, adjusting viewport');
  }
}

// Global state management to prevent duplication
window.sceneInitialized = false;
window.keysPressed = {};
window.lastKeyTime = 0;
window.animationFrameId = null;

// Dynamically import the OrbitControls module
import('./OrbitControls.js').then((module) => {
  // Prevent multiple initializations
  if (window.sceneInitialized) {
    console.log('Scene already initialized, preventing duplicate initialization');
    return;
  }
  window.sceneInitialized = true;
  
  const OrbitControls = module.OrbitControls;

  // Create the scene
  const scene = new THREE.Scene();
  
  // Create a realistic night sky with varied stars
  
  // Create a simpler but still realistic starfield
  const createRealisticStarfield = () => {
    // Use 3000 stars for good performance
    const starCount = 3000;
    
    // Arrays to store star attributes
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    
    // Star color types - simplified
    const starColors = [
      { color: new THREE.Color(0xaabfff), size: 0.08, prob: 0.05 }, // Blue
      { color: new THREE.Color(0xf8f7ff), size: 0.06, prob: 0.15 }, // White
      { color: new THREE.Color(0xfff4ea), size: 0.05, prob: 0.25 }, // Yellow-white 
      { color: new THREE.Color(0xfff2a1), size: 0.05, prob: 0.25 }, // Yellow
      { color: new THREE.Color(0xffaa88), size: 0.04, prob: 0.30 }  // Red
    ];
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      
      // Pick a star type
      const rand = Math.random();
      let colorType = starColors[starColors.length - 1]; // Default to last type
      let probSum = 0;
      
      for (const starType of starColors) {
        probSum += starType.prob;
        if (rand < probSum) {
          colorType = starType;
          break;
        }
      }
      
      // Set the size
      sizes[i] = colorType.size * (0.8 + Math.random() * 0.4);
      
      // Set the color
      colorType.color.toArray(colors, i3);
      
      // Position stars in a sphere around the scene
      const distance = 30 + Math.random() * 70;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = distance * Math.sin(phi) * Math.cos(theta);
      positions[i3+1] = distance * Math.sin(phi) * Math.sin(theta);
      positions[i3+2] = distance * Math.cos(phi);
    }
    
    // Create the geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    return geometry;
  };
  
  // Create the geometry
  const starGeometry = createRealisticStarfield();
  
  // Store original star sizes for reference
  const originalSizes = new Float32Array(starGeometry.attributes.size.array);
  window.starSizes = originalSizes;
  
  // Create a simple point material for stars
  const starMaterial = new THREE.PointsMaterial({
    size: 0.05,
    sizeAttenuation: true,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    transparent: true,
    alphaTest: 0.1
  });
  
  // No texture needed for the simple point material
  
  // Create the starfield
  const starfield = new THREE.Points(starGeometry, starMaterial);
  scene.add(starfield);
  window.starfield = starfield;
  
  // Basic twinkling effect
  const twinkleStars = () => {
    if (!window.starfield) return;
    
    const sizes = starfield.geometry.attributes.size;
    
    for (let i = 0; i < sizes.count; i++) {
      // Random subtle size change for 1% of stars each frame
      if (Math.random() < 0.01) {
        const originalSize = window.starSizes[i];
        sizes.array[i] = originalSize * (0.8 + Math.random() * 0.4);
      }
    }
    
    sizes.needsUpdate = true;
  };
  
  // Add twinkle function to animation loop
  window.twinkleStars = twinkleStars;
  
  window.scene = scene;

  // Create the camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 4;
  window.camera = camera;

  // Create the renderer
  const container = document.getElementById('cube');
  if (!container) {
    console.error('Container element not found');
    return;
  }
  
  // Clear any existing canvases to prevent duplication
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  // Create renderer with proper space background
  const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true
  });
  renderer.setClearColor(0x000000, 1); // Pure black background
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio); // Sharper rendering
  container.appendChild(renderer.domElement);
  window.renderer = renderer;

  // Create stats for performance monitoring
  const stats = new Stats();
  document.body.appendChild(stats.dom);
  window.stats = stats;
  
  // Create logger function
  const logger = createLogger();
  window.logger = logger;
  logger('3D Visualization Started');
  
  // Create the geometry and material
  const geometry = new THREE.DodecahedronGeometry(1, 0); // The second parameter (detail) can affect shape
  window.geometry = geometry;
  
  // Use a more sophisticated material with lighting and reflections
  const material = new THREE.MeshStandardMaterial({ 
    color: 0x14418B,  // PS2 blue color
    metalness: 0.3,
    roughness: 0.4,
    wireframe: false,
    flatShading: false,  // Smooth shading for nicer look
    envMapIntensity: 0.5
  });
  window.material = material;
  
  // Create the main 3D object - always at center of scene
  const dodecahedron = new THREE.Mesh(geometry, material);
  dodecahedron.position.set(0, 0, 0); // Explicitly set to center
  scene.add(dodecahedron);
  window.dodecahedron = dodecahedron;
  
  // We don't need the wireframe at all - remove it completely
  
  // Add enhanced lighting to create a space-like scene
  
  // Subtle ambient light (like distant stars)
  const ambientLight = new THREE.AmbientLight(0x202030, 0.4); 
  scene.add(ambientLight);
  
  // Main "sun" directional light
  const sunLight = new THREE.DirectionalLight(0xffffee, 1.0);
  sunLight.position.set(5, 3, 5);
  scene.add(sunLight);
  
  // Secondary "reflected" light (like from a nearby planet)
  const reflectedLight = new THREE.DirectionalLight(0x8080ff, 0.3); // Blue tint
  reflectedLight.position.set(-3, -2, -3);
  scene.add(reflectedLight);
  
  // Subtle rim light to enhance the silhouette
  const rimLight = new THREE.PointLight(0xffffff, 0.4, 8);
  rimLight.position.set(-2, 5, -3);
  scene.add(rimLight);
  
  // Handle window resize events
  window.addEventListener('resize', onWindowResize);

  // Create camera controls - only enable with right mouse button
  // This creates an orbit where the CAMERA moves around a fixed center point (like planets)
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;    // Original value
  controls.enableZoom = true;       // Allow zooming for better object inspection
  controls.autoRotate = false;      // No automatic rotation
  controls.enablePan = false;       // Disable panning to keep object centered
  controls.screenSpacePanning = true;
  controls.minDistance = 2;         // Don't allow zooming too close
  controls.maxDistance = 10;        // Don't allow zooming too far
  controls.target = new THREE.Vector3(0, 0, 0); // Always orbit around the center
  controls.mouseButtons = {
    RIGHT: THREE.MOUSE.ROTATE,     // Only rotate with right mouse button
    MIDDLE: THREE.MOUSE.DOLLY,     // Zoom with middle mouse button
    LEFT: THREE.MOUSE.NONE         // No action with left mouse button
  };
  window.controls = controls;

  // Create UI elements
  createControlsGuide();
  
  // Set up key controls with event listeners
  document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    
    // Only process if the key isn't already pressed (prevents repeat key events)
    if (!window.keysPressed[key]) {
      window.keysPressed[key] = true;
      
      // For special keys that trigger immediate actions, process them here
      // This handles one-time actions vs. continuous actions like rotation
      if (key === 'r') {
        // Reset is a one-time action
        resetView();
        logger('Resetting view (R key press)');
      }
      else if (key === 'f') {
        // Fit to screen is a one-time action
        fitToScreen();
        logger('Fitting to screen (F key press)');
      }
      else if (key === ' ') {
        // Space bar also fits to screen
        fitToScreen();
        logger('Centering view (Space key press)');
      }
      // Removed Ctrl+W wireframe toggle as it's no longer needed
    }
  });
  
  document.addEventListener('keyup', (event) => {
    window.keysPressed[event.key.toLowerCase()] = false;
  });
  
  // Remove click handler - object should always stay centered
  
  // Add mouse event listeners for visual feedback during orbit
  // Initialize orbit tracking
  window.isOrbiting = false;
  
  renderer.domElement.addEventListener('mousedown', (event) => {
    // Change cursor on right-click and track orbiting state
    if (event.button === 2) {
      window.isOrbiting = true;
      renderer.domElement.style.cursor = 'move';
      logger('Orbit mode active (right mouse button)');
    }
  });
  
  renderer.domElement.addEventListener('mouseup', (event) => {
    // Reset cursor when releasing right button
    if (event.button === 2) {
      window.isOrbiting = false;
      renderer.domElement.style.cursor = 'auto';
      logger('Orbit mode ended');
    }
  });
  
  // Handle case where mouse up happens outside the canvas
  window.addEventListener('mouseup', (event) => {
    if (event.button === 2 && window.isOrbiting) {
      window.isOrbiting = false;
      renderer.domElement.style.cursor = 'auto';
    }
  });
  
  // Prevent context menu on right-click
  renderer.domElement.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });

  // Animation loop - single instance to prevent duplication
  function animate() {
    // Store animation frame ID to prevent multiple loops
    window.animationFrameId = requestAnimationFrame(animate);
    
    // Gentle automatic rotation when not using orbit controls
    if (!window.isOrbiting) {
      dodecahedron.rotation.x += 0.002;
      dodecahedron.rotation.y += 0.002;
    }
    
    // No wireframe to keep in sync anymore
    
    // Always ensure object stays at center of scene
    scene.position.set(0, 0, 0);
    
    // Apply star twinkling effect
    if (window.twinkleStars) {
      window.twinkleStars();
    }
    
    // Rotate starfield very slowly for subtle movement
    if (window.starfield) {
      starfield.rotation.y += 0.0001;
    }
    
    // Handle key controls for smooth rotation
    // WASD for smooth rotation - apply every frame when keys are pressed
    if (window.keysPressed['w']) {
      dodecahedron.rotation.x -= 0.015;
    }
    if (window.keysPressed['s']) {
      dodecahedron.rotation.x += 0.015;
    }
    if (window.keysPressed['a']) {
      dodecahedron.rotation.y -= 0.015;
    }
    if (window.keysPressed['d']) {
      dodecahedron.rotation.y += 0.015;
    }
    
    // Log rotation once per second at most to avoid spam
    const now = Date.now();
    if (window.keysPressed['w'] || window.keysPressed['a'] || 
        window.keysPressed['s'] || window.keysPressed['d']) {
      if (!window.lastKeyTime || now - window.lastKeyTime > 1000) {
        window.lastKeyTime = now;
        if (window.keysPressed['w']) logger('Rotating up (W)');
        if (window.keysPressed['s']) logger('Rotating down (S)');
        if (window.keysPressed['a']) logger('Rotating left (A)');
        if (window.keysPressed['d']) logger('Rotating right (D)');
      }
    }
    
    // Function keys are now handled in the keydown event
    // This keeps only continuous actions (WASD) in the animation loop
    // One-time actions (R, F, Space) are triggered on keydown only
    
    // Update controls and render
    controls.update();
    renderer.render(scene, camera);
    stats.update();
  }
  
  // Fit object to screen, keeping it centered relative to camera
  function fitToScreen() {
    // Get current container dimensions
    const container = document.getElementById('cube');
    if (!container) return;
    
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Calculate the size of the object
    const box = new THREE.Box3().setFromObject(dodecahedron);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    
    // Calculate ideal distance based on field of view and object size
    const fov = camera.fov * (Math.PI / 180);
    const idealDistance = (maxDim / 2) / Math.tan(fov / 2);
    
    // Reset camera position while maintaining current orbit angle
    const currentPosition = camera.position.clone().normalize();
    camera.position.copy(currentPosition.multiplyScalar(idealDistance * 1.5));
    
    // Ensure camera is looking at the center
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    camera.updateProjectionMatrix();
    
    // Reset controls target to center
    controls.target.set(0, 0, 0);
    controls.update();
    
    // Update renderer size to fill container
    renderer.setSize(width, height);
    
    logger('Object fitted to screen and centered');
  }
  
  // Reset view to default state
  function resetView() {
    // Reset object rotation (position should always be at center)
    dodecahedron.rotation.set(0, 0, 0);
    
    // Reset camera to default position
    camera.position.set(0, 0, 4);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    camera.updateProjectionMatrix();
    
    // Reset controls to default
    controls.target.set(0, 0, 0);
    controls.update();
    
    logger('View reset to default state');
  }
  
  // Creates a UI control guide
  function createControlsGuide() {
    // Create controls guide
    const controls = document.createElement('div');
    controls.style.position = 'absolute';
    controls.style.top = '10px';
    controls.style.right = '10px';
    controls.style.backgroundColor = 'rgba(0,0,0,0.7)';
    controls.style.color = '#fff';
    controls.style.padding = '10px';
    controls.style.borderRadius = '5px';
    controls.style.fontFamily = 'monospace';
    controls.style.fontSize = '12px';
    controls.style.zIndex = '1000';
    controls.innerHTML = 'Controls:<br>' +
      'WASD: Rotate object<br>' +
      'F/Space: Fit to screen<br>' +
      'R: Reset view<br>' +
      'Right-click + drag: Orbit camera';
    document.body.appendChild(controls);
  }
  
  // Removed wireframe toggle function as it's no longer needed
  
  // Create logger for debugging and user feedback
  function createLogger() {
    const logDiv = document.createElement('div');
    logDiv.style.position = 'absolute';
    logDiv.style.bottom = '10px';
    logDiv.style.left = '10px';
    logDiv.style.backgroundColor = 'rgba(0,0,0,0.7)';
    logDiv.style.color = '#fff';
    logDiv.style.padding = '10px';
    logDiv.style.borderRadius = '5px';
    logDiv.style.fontFamily = 'monospace';
    logDiv.style.fontSize = '12px';
    logDiv.style.maxHeight = '200px';
    logDiv.style.overflow = 'auto';
    logDiv.style.maxWidth = '400px';
    logDiv.style.zIndex = '1000';
    document.body.appendChild(logDiv);
    
    return function(message) {
      const line = document.createElement('div');
      line.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
      logDiv.appendChild(line);
      // Keep only last 20 lines
      while (logDiv.childNodes.length > 20) {
        logDiv.removeChild(logDiv.firstChild);
      }
      logDiv.scrollTop = logDiv.scrollHeight;
    };
  }

  // Initial fit to screen
  fitToScreen();
  
  // Start the animation loop (only once)
  animate();
});