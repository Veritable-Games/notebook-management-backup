import * as THREE from 'three';
import { dodecahedron, scene, camera, renderer, rotationMomentum } from './main.js';

// Maximum rotation speed
const maxRotationSpeed = 0.05; // Adjusted max speed

// Create a group to hold the constellation points
const constellationGroup = new THREE.Group();
scene.add(constellationGroup);

// Function to create a random point
function createRandomPoint() {
    const geometry = new THREE.SphereGeometry(0.05, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const point = new THREE.Mesh(geometry, material);

    // Position the point randomly around the dodecahedron
    point.position.set(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5
    );

    // Add user data to store the wiki entry title
    point.userData.title = 'Random Wiki Entry ' + Math.floor(Math.random() * 100);

    return point;
}

// Function to spawn the constellation
function spawnConstellation() {
    for (let i = 0; i < 10; i++) {
        const point = createRandomPoint();
        constellationGroup.add(point);
    }
}

// Function to check rotation speed and spawn constellation
function checkRotationSpeed() {
    const currentSpeed = Math.sqrt(rotationMomentum.x ** 2 + rotationMomentum.y ** 2);
    if (currentSpeed >= maxRotationSpeed) {
        spawnConstellation();
    }
}

// Function to display the wiki entry title
function displayWikiTitle(point) {
    const title = point.userData.title;
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'block';
    tooltip.style.left = `${event.clientX}px`;
    tooltip.style.top = `${event.clientY}px`;
    tooltip.textContent = title;
}

// Function to hide the wiki entry title
function hideWikiTitle() {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'none';
}

// Raycasting for hovering over points
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(constellationGroup.children);
    if (intersects.length > 0) {
        displayWikiTitle(intersects[0].object);
    } else {
        hideWikiTitle();
    }
}
window.addEventListener('mousemove', onMouseMove);

// Enhance the animation loop
function enhancedAnimate() {
    checkRotationSpeed();

    requestAnimationFrame(enhancedAnimate);
    renderer.render(scene, camera);
}
enhancedAnimate();
