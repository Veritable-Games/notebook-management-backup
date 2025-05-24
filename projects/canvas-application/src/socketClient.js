import { io } from 'socket.io-client';

// Use a fixed server URL during development for reliability
const SERVER_URL = process.env.NODE_ENV === 'production' 
  ? window.location.origin 
  : 'http://localhost:5000';

let socket = null;

export const initializeSocket = () => {
  if (!socket) {
    console.log('Initializing socket connection to:', SERVER_URL);
    
    // Configure socket with connection options
    socket = io(SERVER_URL, {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
      forceNew: true,
      transports: ['websocket', 'polling']
    });
    
    // Add event listeners for connection status
    socket.on('connect', () => {
      console.log('Socket connected successfully with ID:', socket.id);
    });
    
    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
      alert(`Connection error: ${error.message}. Please ensure the server is running.`);
    });
    
    socket.on('disconnect', (reason) => {
      console.warn('Socket disconnected:', reason);
      if (reason === 'io server disconnect') {
        // Reconnect if server disconnected us
        socket.connect();
      }
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initializeSocket();
  }
  return socket;
};

export const joinRoom = (roomId, username) => {
  console.log(`Attempting to join room ${roomId} as ${username}`);
  const socket = getSocket();
  if (socket.connected) {
    socket.emit('join-room', roomId, username);
    console.log('Join room request sent');
  } else {
    console.error('Cannot join room: socket not connected');
    alert('Cannot join room: Not connected to server. Please try again.');
  }
};

export const sendSceneUpdate = (roomId, sceneData) => {
  const socket = getSocket();
  if (socket.connected) {
    socket.emit('scene-update', roomId, sceneData);
  }
};

export const sendPointerUpdate = (roomId, pointerData) => {
  const socket = getSocket();
  if (socket.connected) {
    socket.emit('pointer-update', roomId, pointerData);
  }
};

export const disconnectSocket = () => {
  if (socket) {
    console.log('Disconnecting socket');
    socket.disconnect();
    socket = null;
  }
};