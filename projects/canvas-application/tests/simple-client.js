const { io } = require('socket.io-client');
const { v4: uuidv4 } = require('uuid');

// Configuration
const SERVER_URL = 'http://localhost:5000';
const roomId = process.argv[2] || 'test-room';
const username = process.argv[3] || `User-${Math.floor(Math.random() * 1000)}`;

console.log(`Connecting to ${SERVER_URL}`);
console.log(`Room ID: ${roomId}`);
console.log(`Username: ${username}`);

const socket = io(SERVER_URL);

socket.on('connect', () => {
  console.log(`Connected with socket ID: ${socket.id}`);
  
  // Join the test room
  socket.emit('join-room', roomId, username);
  
  // Send test data
  setInterval(() => {
    const sceneData = {
      elements: [{
        id: uuidv4(),
        type: 'rectangle',
        x: Math.floor(Math.random() * 1000),
        y: Math.floor(Math.random() * 600),
        width: 100,
        height: 80,
        backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16)
      }],
      version: Date.now()
    };
    
    socket.emit('scene-update', roomId, sceneData);
    console.log('Sent scene update');
    
    // Also send pointer updates
    const pointerData = {
      x: Math.floor(Math.random() * 1000),
      y: Math.floor(Math.random() * 600)
    };
    
    socket.emit('pointer-update', roomId, pointerData);
    console.log('Sent pointer update');
  }, 2000);
});

socket.on('room-info', (data) => {
  console.log('Received room info:', data);
});

socket.on('user-joined', (data) => {
  console.log('User joined:', data);
});

socket.on('scene-update', (data) => {
  console.log('Received scene update from:', data.socketId);
});

socket.on('pointer-update', (data) => {
  console.log('Received pointer update from:', data.socketId);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

// Keep the process running
process.on('SIGINT', () => {
  console.log('Closing connection...');
  socket.disconnect();
  process.exit(0);
});
