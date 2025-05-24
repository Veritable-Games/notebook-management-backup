import React, { useState, useEffect } from 'react';
import { 
  initializeSocket, 
  joinRoom,
  sendSceneUpdate,
  sendPointerUpdate,
  disconnectSocket,
  getSocket
} from '../socketClient';

const CollaborationPanel = ({ excalidrawAPI }) => {
  const [isCollaborating, setIsCollaborating] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem('vg-canvas-username') || '');
  const [roomId, setRoomId] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [activeRoom, setActiveRoom] = useState(null);
  const [collaborators, setCollaborators] = useState({});
  const [connectionStatus, setConnectionStatus] = useState('disconnected'); // 'disconnected', 'connecting', 'connected'
  const [errorMessage, setErrorMessage] = useState('');

  // Keep track of when the excalidrawAPI changes
  useEffect(() => {
    console.log("Excalidraw API updated:", excalidrawAPI ? "available" : "not available");
  }, [excalidrawAPI]);

  // Monitor socket connection status
  useEffect(() => {
    if (!isCollaborating) return;

    setConnectionStatus('connecting');
    const socket = getSocket();
    
    const handleConnect = () => {
      console.log('Socket connected!');
      setConnectionStatus('connected');
      setErrorMessage('');
      
      // If we have an active room but weren't connected, try to rejoin
      if (activeRoom && connectionStatus !== 'connected') {
        joinRoom(activeRoom, username);
      }
    };
    
    const handleConnectError = (error) => {
      console.error('Connection error:', error);
      setConnectionStatus('disconnected');
      setErrorMessage(`Unable to connect to server: ${error.message || 'Unknown error'}`);
    };
    
    const handleDisconnect = (reason) => {
      console.log('Socket disconnected:', reason);
      setConnectionStatus('disconnected');
      setErrorMessage(`Disconnected: ${reason}`);
    };
    
    socket.on('connect', handleConnect);
    socket.on('connect_error', handleConnectError);
    socket.on('disconnect', handleDisconnect);
    
    // Check if socket is already connected
    if (socket.connected) {
      handleConnect();
    }
    
    return () => {
      socket.off('connect', handleConnect);
      socket.off('connect_error', handleConnectError);
      socket.off('disconnect', handleDisconnect);
    };
  }, [isCollaborating, activeRoom, username, connectionStatus]);

  // Set up socket event listeners when collaboration is active
  useEffect(() => {
    if (!isCollaborating || !activeRoom) return;
    if (!excalidrawAPI) {
      console.log("Waiting for Excalidraw API to be available");
      return;
    }
    if (connectionStatus !== 'connected') {
      console.log("Waiting for socket connection to be established");
      return;
    }

    console.log("Setting up collaboration with API and room:", activeRoom);
    const socket = getSocket();
    
    // When we receive room info after joining
    const handleRoomInfo = (roomData) => {
      console.log('Room info received:', roomData);
      setCollaborators(roomData.users || {});
      
      // Make the room ID easily copyable
      localStorage.setItem('vg-canvas-room', roomData.roomId);
      
      // Notify the user
      alert(`Connected to room: ${roomData.roomId}\nUsers: ${Object.values(roomData.users).map(u => u.username).join(', ')}`);
    };
    
    // When another user joins
    const handleUserJoined = (userData) => {
      console.log('User joined:', userData);
      setCollaborators(prev => ({
        ...prev,
        [userData.socketId]: userData
      }));
    };
    
    // When a user leaves
    const handleUserLeft = (socketId) => {
      console.log('User left:', socketId);
      setCollaborators(prev => {
        const newState = {...prev};
        delete newState[socketId];
        return newState;
      });
    };

    // When we receive scene updates from other users
    const handleSceneUpdate = (data) => {
      if (!excalidrawAPI) return;
      try {
        excalidrawAPI.updateScene(data.sceneData);
      } catch (error) {
        console.error('Error updating scene:', error);
      }
    };

    // Set up all event listeners
    socket.on('room-info', handleRoomInfo);
    socket.on('user-joined', handleUserJoined);
    socket.on('user-left', handleUserLeft);
    socket.on('scene-update', handleSceneUpdate);

    // Excalidraw change handler to broadcast updates
    const handleChange = (elements, appState) => {
      if (activeRoom) {
        sendSceneUpdate(activeRoom, { elements, appState });
      }
    };

    // If excalidrawAPI has a callback for changes, set it up
    if (excalidrawAPI && excalidrawAPI.onChange) {
      excalidrawAPI.onChange = handleChange;
    }

    // Clean up event listeners when unmounting or when collaboration stops
    return () => {
      socket.off('room-info', handleRoomInfo);
      socket.off('user-joined', handleUserJoined);
      socket.off('user-left', handleUserLeft);
      socket.off('scene-update', handleSceneUpdate);
    };
  }, [isCollaborating, excalidrawAPI, activeRoom, connectionStatus, username]);

  // Handle collaboration toggle
  const toggleCollaboration = () => {
    if (isCollaborating) {
      // Disconnect from the room
      disconnectSocket();
      setActiveRoom(null);
      setIsCollaborating(false);
      setCollaborators({});
      localStorage.removeItem('vg-canvas-room');
      alert('Disconnected from collaboration session');
    } else {
      setShowDialog(true);
    }
  };

  // Handle joining an existing room
  const handleJoinRoom = () => {
    if (!username || !roomId) {
      setErrorMessage('Please enter both a username and room ID');
      return;
    }

    // Clear any previous errors
    setErrorMessage('');
    
    // Save username for next time
    localStorage.setItem('vg-canvas-username', username);
    
    // Try to connect to the server and join the room
    try {
      const socket = initializeSocket();
      if (!socket) {
        setErrorMessage('Failed to initialize socket connection');
        return;
      }
      
      // Set UI state first (optimistic update)
      setConnectionStatus('connecting');
      setActiveRoom(roomId);
      setIsCollaborating(true);
      setShowDialog(false);
      
      // Try to join the room (the connection status effect will handle connection errors)
      joinRoom(roomId, username);
      
      // Set a timeout to check if we got a room-info response
      setTimeout(() => {
        if (Object.keys(collaborators).length === 0 && connectionStatus === 'connected') {
          console.log('No room info received within timeout period');
          setErrorMessage('Joined room but no confirmation received from server');
        }
      }, 5000);
    } catch (error) {
      console.error('Error joining room:', error);
      setErrorMessage(`Error joining room: ${error.message}`);
    }
  };

  // Handle creating a new room
  const handleCreateRoom = () => {
    if (!username) {
      setErrorMessage('Please enter a username');
      return;
    }
    
    // Clear any previous errors
    setErrorMessage('');
    
    // Save username for next time
    localStorage.setItem('vg-canvas-username', username);
    
    // Generate a random room ID
    const timestamp = new Date().getTime().toString().slice(-6);
    const newRoomId = `room-${timestamp}`;
    
    // Try to connect to the server and create a room
    try {
      const socket = initializeSocket();
      if (!socket) {
        setErrorMessage('Failed to initialize socket connection');
        return;
      }
      
      // Set UI state first (optimistic update)
      setConnectionStatus('connecting');
      setRoomId(newRoomId);
      setActiveRoom(newRoomId);
      setIsCollaborating(true);
      setShowDialog(false);
      
      // Try to join/create the room (the connection status effect will handle connection errors)
      joinRoom(newRoomId, username);
      
      // Set a timeout to check if we got a room-info response
      setTimeout(() => {
        if (Object.keys(collaborators).length === 0 && connectionStatus === 'connected') {
          console.log('No room info received within timeout period');
          setErrorMessage('Created room but no confirmation received from server');
        }
      }, 5000);
    } catch (error) {
      console.error('Error creating room:', error);
      setErrorMessage(`Error creating room: ${error.message}`);
    }
  };

  // Copy room ID to clipboard for easy sharing
  const copyRoomId = () => {
    if (activeRoom) {
      navigator.clipboard.writeText(activeRoom)
        .then(() => alert(`Room ID copied to clipboard: ${activeRoom}`))
        .catch(err => console.error('Failed to copy:', err));
    }
  };

  // Get color based on connection status
  const getConnectionColor = () => {
    switch (connectionStatus) {
      case 'connected': return '#4CAF50'; // Green
      case 'connecting': return '#FF9800'; // Orange
      case 'disconnected': return '#F44336'; // Red
      default: return '#2196F3'; // Blue
    }
  };

  // Get status text
  const getStatusText = () => {
    if (!isCollaborating) return '';
    
    switch (connectionStatus) {
      case 'connected': return 'Connected';
      case 'connecting': return 'Connecting...';
      case 'disconnected': return 'Disconnected';
      default: return '';
    }
  };

  // Get icon based on connection status
  const getConnectionIcon = () => {
    if (!isCollaborating) return '🔄';
    
    switch (connectionStatus) {
      case 'connected': return '🟢';
      case 'connecting': return '🟠';
      case 'disconnected': return '🔴';
      default: return '🔄';
    }
  };

  return (
    <>
      <button 
        className="collaborate-button"
        onClick={toggleCollaboration}
        style={{ backgroundColor: isCollaborating ? getConnectionColor() : '#2196F3' }}
      >
        <span role="img" aria-label="Connection status">{getConnectionIcon()}</span> 
        {isCollaborating ? 'End Collaboration' : 'Start Collaboration'}
      </button>

      {isCollaborating && (
        <>
          <button onClick={copyRoomId} className="collaborate-button">
            <span role="img" aria-label="Copy">📋</span> Copy Room Code
          </button>
          <span className="collaboration-status">
            <span role="img" aria-label="Status" className="status-icon">{getConnectionIcon()}</span> 
            <span className="status-value">{getStatusText()}</span> | 
            <span role="img" aria-label="Room">🔑</span> 
            <span className="room-id">{activeRoom}</span> | 
            <span role="img" aria-label="Users">👥</span> 
            <span className="user-count">{Object.values(collaborators).length}</span>
          </span>
          
          {errorMessage && (
            <div className="error-message">
              {errorMessage}
              <button onClick={() => setErrorMessage('')}>✕</button>
            </div>
          )}
        </>
      )}

      {showDialog && (
        <div className="collaboration-dialog">
          <div className="dialog-content">
            <h2>Start Collaboration</h2>
            {errorMessage && (
              <div className="error-message dialog-error">
                {errorMessage}
                <button onClick={() => setErrorMessage('')}>✕</button>
              </div>
            )}
            <input
              type="text"
              placeholder="Your Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Room ID (to join existing room)"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
            <div className="dialog-buttons">
              <button onClick={handleCreateRoom}>Create New Room</button>
              <button onClick={handleJoinRoom}>Join Room</button>
              <button onClick={() => {
                setShowDialog(false);
                setErrorMessage('');
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CollaborationPanel;