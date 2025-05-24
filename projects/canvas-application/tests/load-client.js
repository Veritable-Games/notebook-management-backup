const { io } = require('socket.io-client');
const { v4: uuidv4 } = require('uuid');

// Configuration
const SERVER_URL = 'http://localhost:5000';
const CLIENT_ID = process.argv[2];
const ROOM_ID = process.argv[3] || 'load-test-room';
const UPDATE_INTERVAL = parseInt(process.argv[4]) || 1000;
const TEST_DURATION = parseInt(process.argv[5]) || 30;

// Metrics
let updatesSent = 0;
let updatesReceived = 0;
let connectTime = null;
let disconnectTime = null;

console.log(`Client ${CLIENT_ID} starting`);
console.log(`Connecting to ${SERVER_URL}`);
console.log(`Room ID: ${ROOM_ID}`);
console.log(`Update interval: ${UPDATE_INTERVAL}ms`);
console.log(`Test duration: ${TEST_DURATION}s`);

const startTime = Date.now();
const socket = io(SERVER_URL);

socket.on('connect', () => {
  connectTime = Date.now();
  console.log(`Connected with socket ID: ${socket.id} (took ${connectTime - startTime}ms)`);
  
  // Join the test room
  socket.emit('join-room', ROOM_ID, `LoadClient-${CLIENT_ID}`);
  
  // Send updates periodically
  const intervalId = setInterval(() => {
    // Send scene update
    const sceneData = {
      elements: [{
        id: uuidv4(),
        type: 'rectangle',
        x: Math.floor(Math.random() * 1000),
        y: Math.floor(Math.random() * 600),
        width: Math.floor(Math.random() * 100) + 20,
        height: Math.floor(Math.random() * 100) + 20,
        backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16)
      }],
      version: Date.now()
    };
    
    socket.emit('scene-update', ROOM_ID, sceneData);
    updatesSent++;
    
    // Send pointer update
    const pointerData = {
      x: Math.floor(Math.random() * 1000),
      y: Math.floor(Math.random() * 600)
    };
    
    socket.emit('pointer-update', ROOM_ID, pointerData);
    updatesSent++;
    
  }, UPDATE_INTERVAL);
  
  // End the test after the specified duration
  setTimeout(() => {
    clearInterval(intervalId);
    disconnectTime = Date.now();
    const testDuration = (disconnectTime - connectTime) / 1000;
    
    console.log(`Test completed for client ${CLIENT_ID}`);
    console.log(`Duration: ${testDuration.toFixed(2)}s`);
    console.log(`Updates sent: ${updatesSent}`);
    console.log(`Updates received: ${updatesReceived}`);
    console.log(`Updates per second sent: ${(updatesSent / testDuration).toFixed(2)}`);
    console.log(`Updates per second received: ${(updatesReceived / testDuration).toFixed(2)}`);
    
    socket.disconnect();
    process.exit(0);
  }, TEST_DURATION * 1000);
});

// Count received updates
socket.on('scene-update', () => {
  updatesReceived++;
});

socket.on('pointer-update', () => {
  updatesReceived++;
});

socket.on('error', (err) => {
  console.error(`Error: ${err.message}`);
});

socket.on('disconnect', () => {
  console.log(`Disconnected from server`);
});
