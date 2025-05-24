/**
 * VG-Canvas Load Test Script
 * This script simulates multiple connections to the WebSocket server
 * and generates synthetic drawing events to stress test the system.
 */

const { io } = require('socket.io-client');
const { v4: uuidv4 } = require('uuid');

// Configuration
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5000';
const NUM_CLIENTS = process.env.NUM_CLIENTS || 20;
const TEST_DURATION = process.env.TEST_DURATION || 60; // seconds
const ROOM_ID = process.env.ROOM_ID || 'load-test-room';
const EVENT_INTERVAL = process.env.EVENT_INTERVAL || 100; // ms

// Tracking variables
let activeClients = 0;
let totalEvents = 0;
let failedEvents = 0;
const clients = [];

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║                                                            ║');
console.log('║  VG-Canvas WebSocket Load Testing                          ║');
console.log('║                                                            ║');
console.log('╚════════════════════════════════════════════════════════════╝');
console.log();

console.log(`Server URL: ${SERVER_URL}`);
console.log(`Number of clients: ${NUM_CLIENTS}`);
console.log(`Test duration: ${TEST_DURATION} seconds`);
console.log(`Room ID: ${ROOM_ID}`);
console.log(`Event interval: ${EVENT_INTERVAL}ms`);
console.log();

// Helper function to generate random drawing elements
function generateRandomElement() {
  const elementTypes = ['rectangle', 'ellipse', 'line', 'arrow', 'text'];
  const type = elementTypes[Math.floor(Math.random() * elementTypes.length)];
  
  return {
    id: uuidv4(),
    type,
    x: Math.floor(Math.random() * 1000),
    y: Math.floor(Math.random() * 600),
    width: Math.floor(Math.random() * 200) + 50,
    height: Math.floor(Math.random() * 200) + 50,
    angle: Math.random() * Math.PI * 2,
    strokeColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
    backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
    fillStyle: Math.random() > 0.5 ? 'solid' : 'hachure',
    strokeWidth: Math.floor(Math.random() * 5) + 1,
    roughness: Math.floor(Math.random() * 3),
    opacity: Math.random(),
    strokeStyle: Math.random() > 0.5 ? 'solid' : 'dashed',
    timestamp: Date.now()
  };
}

// Helper function for pointer updates
function generatePointerUpdate(clientId) {
  return {
    x: Math.floor(Math.random() * 1000),
    y: Math.floor(Math.random() * 600),
    clientId,
    timestamp: Date.now()
  };
}

// Create and connect clients
function createClient(index) {
  const clientId = `client-${index}`;
  const username = `LoadUser${index}`;
  
  console.log(`Creating client ${clientId}...`);
  
  const socket = io(SERVER_URL, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 3
  });
  
  socket.on('connect', () => {
    console.log(`Client ${clientId} connected with socket ID: ${socket.id}`);
    activeClients++;
    
    // Join the test room
    socket.emit('join-room', ROOM_ID, username);
    
    // Set up event emission interval
    const intervalId = setInterval(() => {
      try {
        // Alternate between scene updates and pointer updates
        if (Math.random() > 0.5) {
          const sceneData = {
            elements: [generateRandomElement()],
            version: Date.now()
          };
          socket.emit('scene-update', ROOM_ID, sceneData);
        } else {
          const pointerData = generatePointerUpdate(clientId);
          socket.emit('pointer-update', ROOM_ID, pointerData);
        }
        totalEvents++;
      } catch (err) {
        failedEvents++;
        console.error(`Error sending event from ${clientId}:`, err.message);
      }
    }, EVENT_INTERVAL);
    
    clients.push({ socket, intervalId, clientId });
  });
  
  socket.on('connect_error', (err) => {
    console.error(`Connection error for ${clientId}:`, err.message);
  });
  
  socket.on('disconnect', (reason) => {
    console.log(`Client ${clientId} disconnected: ${reason}`);
    activeClients--;
  });
  
  socket.on('error', (err) => {
    console.error(`Socket error for ${clientId}:`, err.message);
  });
  
  // Listen for events from server (for metrics)
  socket.on('scene-update', (data) => {
    // Just count these events, no need to process them
  });
  
  socket.on('pointer-update', (data) => {
    // Just count these events, no need to process them
  });
  
  return socket;
}

// Create clients
console.log(`Creating ${NUM_CLIENTS} test clients...`);
for (let i = 0; i < NUM_CLIENTS; i++) {
  createClient(i);
  
  // Stagger connections to avoid overwhelming the server
  const delay = Math.floor(i / 5) * 1000; // Connect 5 clients per second
  if (delay > 0 && i < NUM_CLIENTS - 1) {
    console.log(`Sleeping for ${delay}ms before connecting next batch...`);
  }
}

// Display stats during the test
let startTime = Date.now();
const statsInterval = setInterval(() => {
  const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
  const eventsPerSecond = Math.floor(totalEvents / elapsedSeconds);
  
  console.log(`[${elapsedSeconds}s] Active clients: ${activeClients} | ` +
              `Events sent: ${totalEvents} (${eventsPerSecond}/sec) | ` +
              `Failed: ${failedEvents}`);
  
  // Check if test should end
  if (elapsedSeconds >= TEST_DURATION) {
    endTest();
  }
}, 5000);

// Function to end the test
function endTest() {
  clearInterval(statsInterval);
  
  console.log("\n========== TEST COMPLETE ==========");
  const testDuration = (Date.now() - startTime) / 1000;
  console.log(`Total test duration: ${testDuration.toFixed(2)} seconds`);
  console.log(`Peak active clients: ${activeClients}`);
  console.log(`Total events sent: ${totalEvents}`);
  console.log(`Failed events: ${failedEvents}`);
  console.log(`Events per second: ${(totalEvents / testDuration).toFixed(2)}`);
  console.log(`Success rate: ${((totalEvents - failedEvents) / totalEvents * 100).toFixed(2)}%`);
  
  // Close all client connections
  console.log("Disconnecting all clients...");
  clients.forEach(({ socket, intervalId, clientId }) => {
    clearInterval(intervalId);
    socket.disconnect();
    console.log(`Disconnected client ${clientId}`);
  });
  
  // Exit after all clients are closed
  setTimeout(() => {
    console.log("Load test completed. Exiting.");
    process.exit(0);
  }, 3000);
}

// Handle ctrl+c to gracefully end the test
process.on('SIGINT', () => {
  console.log("\nTest interrupted by user");
  endTest();
});