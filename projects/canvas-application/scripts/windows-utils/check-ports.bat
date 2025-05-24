@echo off
echo Checking if required ports are available...
echo.

set PORT_CONFLICT=0

REM Check port 3000 (React app)
netstat -ano | findstr :3000 | findstr LISTENING > nul
if %errorLevel% == 0 (
    echo [WARNING] Port 3000 is already in use by another application.
    echo This will prevent the VG-Canvas React app from starting.
    echo.
    echo You can:
    echo 1. Close the application using port 3000
    echo 2. Change the port by setting the PORT environment variable
    echo    Example: set PORT=3001 before running npm start
    echo.
    set PORT_CONFLICT=1
) else (
    echo [OK] Port 3000 is available for the React app.
)

REM Check port 5000 (WebSocket server)
netstat -ano | findstr :5000 | findstr LISTENING > nul
if %errorLevel% == 0 (
    echo [WARNING] Port 5000 is already in use by another application.
    echo This will prevent the VG-Canvas collaboration server from starting.
    echo.
    echo You can:
    echo 1. Close the application using port 5000
    echo 2. Change the server port by editing server-windows.js
    echo    Look for the line: const PORT = process.env.PORT || 5000;
    echo.
    set PORT_CONFLICT=1
) else (
    echo [OK] Port 5000 is available for the WebSocket server.
)

if %PORT_CONFLICT% == 1 (
    echo.
    echo To find and close applications using specific ports:
    echo 1. Run as administrator: netstat -ano ^| findstr :[PORT]
    echo 2. Note the PID (last number on the line)
    echo 3. Run as administrator: taskkill /F /PID [PID]
    echo.
    echo Press any key to continue...
    pause > nul
) else (
    echo.
    echo All required ports are available!
    echo.
    timeout /t 3 > nul
)