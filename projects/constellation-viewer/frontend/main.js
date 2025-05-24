// Simplified imports
import './style.css';
import { setupNotebookBrowser } from './notebook-browser.js';

// Define basic THREE mock if module can't be loaded
const THREE = window.THREE || {
    Scene: function() { return { background: { set: () => {} }, add: () => {} }; },
    PerspectiveCamera: function() { return { position: { set: () => {} }, lookAt: () => {} }; },
    WebGLRenderer: function() { return { setSize: () => {}, setClearColor: () => {}, domElement: document.createElement('div') }; },
    Color: function() { return {}; },
    DodecahedronGeometry: function() { return {}; },
    MeshPhongMaterial: function() { return {}; },
    MeshBasicMaterial: function() { return {}; },
    Mesh: function() { return { rotation: { x: 0, y: 0, copy: () => {}, set: () => {} }, position: { set: () => {} } }; },
    AmbientLight: function() { return {}; },
    DirectionalLight: function() { return { position: { set: () => {} } }; },
    Group: function() { return { children: [], add: () => {}, remove: () => {} }; },
    Raycaster: function() { return { setFromCamera: () => {}, intersectObjects: () => [] }; },
    Vector2: function() { return {}; },
    Vector3: function() { return { fromBufferAttribute: () => {}, addVectors: () => ({ add: () => ({ divideScalar: () => ({}) }) }) }; },
    BufferGeometry: function() { return { setAttribute: () => {} }; },
    BufferAttribute: function() { return {}; },
    LineBasicMaterial: function() { return {}; },
    Line: function() { return { position: { x: 0, y: 0, z: 0 }, rotation: { set: () => {} }, userData: {} }; },
    Box3: function() { return { setFromObject: () => {}, getSize: () => new THREE.Vector3() }; }
};

// Define Stats mock 
const Stats = function() {
    return {
        showPanel: () => {},
        dom: document.createElement('div'),
        update: () => {}
    };
};

// Define OrbitControls mock
const OrbitControls = function() {
    return {
        enablePan: true,
        enableDamping: true,
        dampingFactor: 0.05,
        screenSpacePanning: true,
        maxPolarAngle: Math.PI,
        update: () => {}
    };
};

// Define TWEEN mock
const TWEEN = {
    update: () => {}
};

// Global state management to prevent duplication
window.constellationViewerInitialized = false;

// Configuration
const API_BASE_URL = 'http://localhost:3003'; // Updated port to match backend
const MAX_CONSTELLATIONS = 12;

// Set up renderer and canvas
document.addEventListener('DOMContentLoaded', () => {
    // Prevent multiple initializations
    if (window.constellationViewerInitialized) {
        console.log('Constellation Viewer already initialized, preventing duplicate initialization');
        return;
    }
    window.constellationViewerInitialized = true;
    
    // Set up notebook browser
    setupNotebookBrowser(API_BASE_URL);
    
    // Set up the canvas container
    const canvasContainer = document.getElementById('canvas-container');
    if (!canvasContainer) {
        console.error('Could not find canvas container!');
        return;
    }
    
    // Clear any existing canvases to prevent duplication
    while (canvasContainer.firstChild) {
        canvasContainer.removeChild(canvasContainer.firstChild);
    }
    
    // Store objects on window to prevent duplication
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    renderer.setClearColor(0x000000);
    canvasContainer.appendChild(renderer.domElement);
    window.renderer = renderer;

    // Initialize stats
    const stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.domElement);
    window.stats = stats;

    // Scene, Camera, Controls setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    window.scene = scene;

    const camera = new THREE.PerspectiveCamera(75, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);
    window.camera = camera;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;
    window.controls = controls;

    // Create a logger
    const logger = createLogger();
    window.logger = logger;
    logger('Constellation Viewer initialized');

    // Raycaster for mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    window.raycaster = raycaster;
    window.mouse = mouse;

    // Main 3D object setup - Use PS2 colors
    const geometry = new THREE.DodecahedronGeometry(1);
    const material = new THREE.MeshPhongMaterial({ 
        color: 0x14418B,  // PS2 blue color
        wireframe: false,
        flatShading: true
    });
    const dodecahedron = new THREE.Mesh(geometry, material);
    scene.add(dodecahedron);
    window.dodecahedron = dodecahedron;
    
    // Set initial position at center
    dodecahedron.position.set(0, 0, 0);
    
    // Create wireframe overlay
    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const wireframe = new THREE.Mesh(geometry, wireframeMaterial);
    scene.add(wireframe);
    window.wireframe = wireframe;
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Constellation group
    const constellationGroup = new THREE.Group();
    scene.add(constellationGroup);
    window.constellationGroup = constellationGroup;

    // Skip font loading for now
    let font = null;

    // Create UI elements for tooltips and info
    createUIElements();

    // Set up key controls with throttling
    const keysPressed = {};
    window.keysPressed = keysPressed;
    window.lastKeyTime = 0;
    
    document.addEventListener('keydown', (event) => {
        keysPressed[event.key.toLowerCase()] = true;
        handleKeyPress(event);
    });
    document.addEventListener('keyup', (event) => {
        keysPressed[event.key.toLowerCase()] = false;
    });

    // Create a key controls guide
    createControlsGuide();

    // Event listeners
    canvasContainer.addEventListener('click', handleMouseClick);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', () => {
        const width = canvasContainer.clientWidth;
        const height = canvasContainer.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        logger('Window resized, adjusting viewport');
    });

    // Single animation frame ID to prevent multiple loops
    let animationFrameId = null;
    window.animationFrameId = animationFrameId;

    // Animation loop
    function animate() {
        // Store the ID globally to prevent multiple loops
        window.animationFrameId = requestAnimationFrame(animate);
        
        // Automatic rotation (slow)
        dodecahedron.rotation.x += 0.001;
        dodecahedron.rotation.y += 0.001;
        
        // Keep wireframe in sync
        wireframe.rotation.copy(dodecahedron.rotation);
        wireframe.position.copy(dodecahedron.position);
        
        // Process key presses with throttling
        const now = Date.now();
        if (!window.lastKeyTime || now - window.lastKeyTime > 100) {
            // WASD key control with momentum
            if (keysPressed['w']) {
                dodecahedron.rotation.x -= 0.03;
                logger('Rotating up (W)');
                window.lastKeyTime = now;
            }
            if (keysPressed['s']) {
                dodecahedron.rotation.x += 0.03;
                logger('Rotating down (S)');
                window.lastKeyTime = now;
            }
            if (keysPressed['a']) {
                dodecahedron.rotation.y -= 0.03;
                logger('Rotating left (A)');
                window.lastKeyTime = now;
            }
            if (keysPressed['d']) {
                dodecahedron.rotation.y += 0.03;
                logger('Rotating right (D)');
                window.lastKeyTime = now;
            }
            if (keysPressed['f']) {
                fitToScreen();
                logger('Fitting to screen (F)');
                window.lastKeyTime = now;
            }
            if (keysPressed['r']) {
                resetView();
                logger('Resetting view (R)');
                window.lastKeyTime = now;
            }
        }
        
        controls.update();
        TWEEN.update();
        renderer.render(scene, camera);
        stats.update();
    }
    
    // Start the animation loop (only once)
    animate();
    
    // Load initial wiki entries
    loadWikiEntries();
    
    // Create logger function for debugging
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
    
    // Create controls guide
    function createControlsGuide() {
        const controlsGuide = document.createElement('div');
        controlsGuide.style.position = 'absolute';
        controlsGuide.style.top = '10px';
        controlsGuide.style.right = '10px';
        controlsGuide.style.backgroundColor = 'rgba(0,0,0,0.7)';
        controlsGuide.style.color = '#fff';
        controlsGuide.style.padding = '10px';
        controlsGuide.style.borderRadius = '5px';
        controlsGuide.style.fontFamily = 'monospace';
        controlsGuide.style.fontSize = '12px';
        controlsGuide.style.zIndex = '1000';
        controlsGuide.innerHTML = 'Controls:<br>WASD: Rotate<br>F: Fit to screen<br>R: Reset view<br>Click point: Show info';
        document.body.appendChild(controlsGuide);
    }
    
    // Fit object to screen
    function fitToScreen() {
        // Get container dimensions
        const width = canvasContainer.clientWidth;
        const height = canvasContainer.clientHeight;
        
        // Calculate the size of the object
        const box = new THREE.Box3().setFromObject(dodecahedron);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        
        // Calculate ideal distance based on field of view and object size
        const fov = camera.fov * (Math.PI / 180);
        const idealDistance = (maxDim / 2) / Math.tan(fov / 2);
        
        // Set camera position to view the object properly
        camera.position.z = idealDistance * 1.5; // Add some margin
        camera.lookAt(dodecahedron.position);
        camera.updateProjectionMatrix();
        
        // Update renderer size
        renderer.setSize(width, height);
        
        logger('Fitted object to screen');
    }
    
    // Reset view
    function resetView() {
        // Reset object position and rotation
        dodecahedron.position.set(0, 0, 0);
        dodecahedron.rotation.set(0, 0, 0);
        wireframe.position.set(0, 0, 0);
        wireframe.rotation.set(0, 0, 0);
        
        // Reset camera
        camera.position.set(0, 0, 5);
        camera.lookAt(scene.position);
        camera.updateProjectionMatrix();
        
        logger('View reset to default');
    }

    // Function to create UI elements
    function createUIElements() {
        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.id = 'tooltip';
        tooltip.style.position = 'absolute';
        tooltip.style.backgroundColor = 'rgba(0,0,0,0.7)';
        tooltip.style.color = 'white';
        tooltip.style.padding = '5px';
        tooltip.style.borderRadius = '5px';
        tooltip.style.display = 'none';
        tooltip.style.zIndex = '1000';
        document.body.appendChild(tooltip);

        // Create info container
        const infoContainer = document.createElement('div');
        infoContainer.id = 'infoContainer';
        infoContainer.style.position = 'fixed';
        infoContainer.style.top = '20px';
        infoContainer.style.right = '20px';
        infoContainer.style.width = '350px';
        infoContainer.style.maxHeight = '80vh';
        infoContainer.style.backgroundColor = '#14418B'; // PS2 blue
        infoContainer.style.color = 'white';
        infoContainer.style.padding = '15px';
        infoContainer.style.borderRadius = '8px';
        infoContainer.style.overflowY = 'auto';
        infoContainer.style.display = 'none';
        infoContainer.style.zIndex = '1000';
        
        // Close button
        const closeButton = document.createElement('button');
        closeButton.textContent = 'X';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '5px';
        closeButton.style.right = '5px';
        closeButton.style.background = 'none';
        closeButton.style.border = 'none';
        closeButton.style.color = 'white';
        closeButton.style.cursor = 'pointer';
        closeButton.onclick = closeInfoContainer;
        infoContainer.appendChild(closeButton);
        
        // Content area
        const pageContent = document.createElement('div');
        pageContent.id = 'pageContent';
        infoContainer.appendChild(pageContent);
        
        document.body.appendChild(infoContainer);
    }
    
    // Load wiki entries from the backend
    function loadWikiEntries() {
        fetch(`${API_BASE_URL}/pages`)
            .then(response => response.json())
            .then(data => {
                logger('Loaded pages: ' + (data.entries ? data.entries.length : 0));
                if (data.entries) {
                    // Clear existing constellation points
                    while (constellationGroup.children.length > 0) {
                        constellationGroup.remove(constellationGroup.children[0]);
                    }
                    
                    // Create new constellation points (limited to avoid overloading)
                    const entries = data.entries.slice(0, MAX_CONSTELLATIONS);
                    entries.forEach(entry => {
                        const point = createRandomPoint(entry.title);
                        constellationGroup.add(point);
                    });
                    
                    logger(`Created ${entries.length} constellation points`);
                }
            })
            .catch(error => {
                logger('Failed to load pages: ' + error.message);
                console.error('Failed to load pages:', error);
            });
    }

    // Create a random constellation point
    function createRandomPoint(title) {
        // Create a triangle geometry for each point
        const geometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([0, 0.1, 0, -0.1, -0.1, 0, 0.1, -0.1, 0]);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        
        // Use PS2 blue color
        const material = new THREE.LineBasicMaterial({ 
            color: 0x14418B,
            linewidth: 2 // May not work on all browsers/GPUs
        });
        const point = new THREE.Line(geometry, material);
        
        // Position points in a sphere around the dodecahedron
        // This creates a constellation effect
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 2.5 + Math.random() * 0.5; // More consistent distance
        
        point.position.x = r * Math.sin(phi) * Math.cos(theta);
        point.position.y = r * Math.sin(phi) * Math.sin(theta);
        point.position.z = r * Math.cos(phi);
        
        // Store the title in userData
        point.userData.title = title;
        
        // Random rotation for variety
        point.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        
        return point;
    }

    // Mouse interaction handlers
    function handleMouseClick(event) {
        // Calculate mouse position in normalized device coordinates
        mouse.x = (event.clientX / canvasContainer.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / canvasContainer.clientHeight) * 2 + 1;
        
        // Update the raycaster
        raycaster.setFromCamera(mouse, camera);
        
        // Find intersections with constellation points
        const intersects = raycaster.intersectObjects(constellationGroup.children);
        
        if (intersects.length > 0) {
            // Display content for the clicked point
            displayContent(intersects[0].object);
            logger(`Clicked on constellation point: ${intersects[0].object.userData.title}`);
        } else {
            // Check if clicked on the dodecahedron
            const objectIntersects = raycaster.intersectObjects([dodecahedron, wireframe]);
            if (objectIntersects.length > 0) {
                // Fit to screen when clicking the main object
                fitToScreen();
                logger('Clicked on main object, fitting to screen');
            }
        }
    }

    function handleMouseMove(event) {
        // Calculate mouse position
        mouse.x = (event.clientX / canvasContainer.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / canvasContainer.clientHeight) * 2 + 1;
        
        // Update the raycaster
        raycaster.setFromCamera(mouse, camera);
        
        // Check for intersections with constellation points
        const intersects = raycaster.intersectObjects(constellationGroup.children);
        
        if (intersects.length > 0) {
            // Show tooltip for hovered point
            displayWikiTitle(intersects[0].object, event);
            
            // Highlight the hovered point (make it larger or change color)
            // This would require storing the original material/scale and restoring it
        } else {
            // Hide tooltip when not hovering over a point
            hideWikiTitle();
        }
    }

    function handleKeyPress(event) {
        // Handle special key presses
        switch (event.key.toLowerCase()) {
            case 'f': 
                // 'F' key already handled in animation loop for fitting to screen
                break;
            case 'r':
                // 'R' key already handled in animation loop for resetting view
                break; 
            case 'n': 
                // 'N' key for spawning new constellation
                spawnConstellation(); 
                logger('Regenerating constellation points (N)');
                break;
            case ' ': 
                // Space for centering view
                fitToScreen();
                logger('Centering view (Space)');
                break;
            case 'escape': 
                // Escape to close info panel
                closeInfoContainer(); 
                logger('Closing info panel (Escape)');
                break;
        }
    }

    // Spawns new constellation points
    function spawnConstellation() {
        loadWikiEntries();
    }

    // Display content in the info container
    function displayContent(point) {
        // Fetch content for the selected point
        fetch(`${API_BASE_URL}/pages/${encodeURIComponent(point.userData.title)}`)
            .then(response => {
                if (!response.ok) throw new Error('Content not found');
                return response.text();
            })
            .then(content => {
                // Display the content in the info panel
                const infoContainer = document.getElementById('infoContainer');
                const pageContent = document.getElementById('pageContent');
                
                // Format the content with title
                pageContent.innerHTML = `
                    <h2>${point.userData.title}</h2>
                    <div class="content">${content}</div>
                `;
                
                // Show the info panel
                infoContainer.style.display = 'block';
                logger(`Displaying content for: ${point.userData.title}`);
            })
            .catch(error => {
                logger(`Failed to fetch page content: ${error.message}`);
                console.error('Failed to fetch page content:', error);
            });
    }

    // Show tooltip with wiki title
    function displayWikiTitle(point, event) {
        const tooltip = document.getElementById('tooltip');
        if (tooltip) {
            // Position and show the tooltip
            tooltip.style.display = 'block';
            tooltip.style.left = `${event.clientX + 15}px`;
            tooltip.style.top = `${event.clientY + 15}px`;
            tooltip.textContent = point.userData.title;
        }
    }

    // Hide the tooltip
    function hideWikiTitle() {
        const tooltip = document.getElementById('tooltip');
        if (tooltip) {
            tooltip.style.display = 'none';
        }
    }

    // Close the info container
    function closeInfoContainer() {
        const infoContainer = document.getElementById('infoContainer');
        if (infoContainer) {
            infoContainer.style.display = 'none';
            logger('Closed info panel');
        }
    }

    // Align text on the nearest face - temporarily disabled
    function alignTextOnNearestFace() {
        logger('Text alignment disabled (font loader issue)');
        // Font loader functionality requires module fixes
    }

    // Find the nearest face on the dodecahedron
    function getNearestFaceIndex() {
        // This function calculates which face of the dodecahedron is nearest to the camera
        const position = dodecahedron.geometry.getAttribute('position');
        const index = dodecahedron.geometry.index;
        let minDistance = Infinity, nearestFaceIndex = -1;
        
        for (let i = 0; i < index.count; i += 3) {
            const a = new THREE.Vector3().fromBufferAttribute(position, index.array[i]);
            const b = new THREE.Vector3().fromBufferAttribute(position, index.array[i + 1]);
            const c = new THREE.Vector3().fromBufferAttribute(position, index.array[i + 2]);
            const centroid = new THREE.Vector3().addVectors(a, b).add(c).divideScalar(3);
            const distance = camera.position.distanceTo(centroid);
            
            if (distance < minDistance) {
                minDistance = distance;
                nearestFaceIndex = i / 3;
            }
        }
        
        return nearestFaceIndex;
    }
});