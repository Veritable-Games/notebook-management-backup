#!/bin/bash

# Stop Wiki Server
echo "Stopping Constellation Viewer Wiki..."

# Check if server.pid exists
if [ -f "backend/server.pid" ]; then
  PID=$(cat backend/server.pid)
  
  # Check if process is still running
  if ps -p $PID > /dev/null; then
    echo "Found wiki server with PID $PID"
    kill $PID
    echo "Sent kill signal to process $PID"
    
    # Wait a moment and check if it's still running
    sleep 2
    if ps -p $PID > /dev/null; then
      echo "Process is still running. Sending forced kill signal..."
      kill -9 $PID
      sleep 1
    fi
    
    # Final check
    if ps -p $PID > /dev/null; then
      echo "Failed to stop server process. Please check manually."
    else
      echo "Server stopped successfully."
      rm backend/server.pid
    fi
  else
    echo "No running process found with PID $PID"
    rm backend/server.pid
  fi
else
  echo "No server.pid file found. Server may not be running."
  
  # Try to find the process by port
  if command -v netstat &> /dev/null; then
    PID=$(netstat -tunlp 2>/dev/null | grep ":8081" | awk '{print $7}' | cut -d'/' -f1)
    if [ -n "$PID" ]; then
      echo "Found process using port 8081 with PID $PID"
      
      # Check if it's node process running server.js
      if ps -p $PID -o command= | grep -q "node.*server.js"; then
        echo "Process appears to be our wiki server."
        kill $PID
        echo "Sent kill signal to process $PID"
        
        # Wait a moment and check if it's still running
        sleep 2
        if ps -p $PID > /dev/null; then
          echo "Process is still running. Sending forced kill signal..."
          kill -9 $PID
        fi
      else
        echo "Process on port 8081 doesn't appear to be our wiki server."
        echo "Please check manually before starting a new instance."
      fi
    else
      echo "No process found using port 8081."
    fi
  fi
fi

echo "Done."