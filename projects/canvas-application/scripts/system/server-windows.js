// Windows-compatible version of the collaboration server
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// Serve static files from the build directory in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Store rooms and their participants
const rooms = {};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle room creation or joining
  socket.on('join-room', (roomId, username) => {
    console.log(`${username} joined room ${roomId}`);
    
    // Create room if it doesn't exist
    if (!rooms[roomId]) {
      rooms[roomId] = { users: {} };
    }
    
    // Add user to room
    rooms[roomId].users[socket.id] = { 
      username,
      socketId: socket.id 
    };
    
    // Join socket.io room
    socket.join(roomId);
    
    // Broadcast to others in the room
    socket.to(roomId).emit('user-joined', {
      username,
      socketId: socket.id
    });
    
    // Send room info to the new user
    socket.emit('room-info', {
      roomId,
      users: rooms[roomId].users
    });
    
    console.log(`Room ${roomId} has ${Object.keys(rooms[roomId].users).length} users`);
  });

  // Handle scene updates
  socket.on('scene-update', (roomId, sceneData) => {
    // Broadcast scene update to all other users in the room
    socket.to(roomId).emit('scene-update', {
      socketId: socket.id,
      sceneData
    });
  });

  // Handle pointer updates
  socket.on('pointer-update', (roomId, pointerData) => {
    socket.to(roomId).emit('pointer-update', {
      socketId: socket.id,
      pointerData
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Remove user from all rooms they were in
    Object.keys(rooms).forEach(roomId => {
      if (rooms[roomId].users[socket.id]) {
        // Inform others in the room
        socket.to(roomId).emit('user-left', socket.id);
        // Remove user from room
        delete rooms[roomId].users[socket.id];
        // Check if room is empty
        if (Object.keys(rooms[roomId].users).length === 0) {
          delete rooms[roomId];
          console.log(`Room ${roomId} deleted (empty)`);
        } else {
          console.log(`Room ${roomId} has ${Object.keys(rooms[roomId].users).length} users left`);
        }
      }
    });
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open your browser to http://localhost:3000 to use VG-Canvas`);
});