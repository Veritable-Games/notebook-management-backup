@echo off
setlocal EnableDelayedExpansion

echo Starting VG-Canvas in collaborative mode...
echo.
echo This will open two windows:
echo 1. The WebSocket collaboration server
echo 2. The VG-Canvas application
echo.

REM Check if required ports are available
echo Checking if required ports are available...
set PORT_CONFLICT=false

REM Check port 3000 (React app)
netstat -ano | findstr :3000 | findstr LISTENING > nul
if %errorLevel% == 0 (
    echo [WARNING] Port 3000 is already in use by another application.
    echo This will prevent the VG-Canvas React app from starting.
    echo.
    set PORT_CONFLICT=true
)

REM Check port 5000 (WebSocket server)
netstat -ano | findstr :5000 | findstr LISTENING > nul
if %errorLevel% == 0 (
    echo [WARNING] Port 5000 is already in use by another application.
    echo This will prevent the VG-Canvas collaboration server from starting.
    echo.
    set PORT_CONFLICT=true
)

if %PORT_CONFLICT%==true (
    echo Would you like to attempt to free these ports? (y/n)
    set /p FREE_PORTS=
    if /i "!FREE_PORTS!"=="y" (
        echo Attempting to free ports...
        
        REM Free port 3000
        for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do (
            echo Terminating process with PID: %%a
            taskkill /F /PID %%a > nul 2>&1
        )
        
        REM Free port 5000
        for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000 ^| findstr LISTENING') do (
            echo Terminating process with PID: %%a
            taskkill /F /PID %%a > nul 2>&1
        )
        
        timeout /t 2 > nul
    ) else (
        echo Cannot start VG-Canvas without required ports. Exiting.
        pause
        exit /b 1
    )
)

echo.
echo Please wait...

REM Create a directory for logs if it doesn't exist
if not exist "logs" mkdir logs

REM Start the WebSocket server with logging
echo Starting WebSocket server...
start cmd /k "title VG-Canvas Collaboration Server && npm run server > logs\server.log 2>&1"

REM Give the server time to start
echo Waiting for server to initialize...
timeout /t 5 > nul

REM Check if server is running by checking if port 5000 is now in use
netstat -ano | findstr :5000 | findstr LISTENING > nul
if %errorLevel% neq 0 (
    echo [ERROR] WebSocket server does not appear to be running.
    echo Please check logs\server.log for details.
    pause
    exit /b 1
)

REM Start the React app
echo Starting React application...
start cmd /k "title VG-Canvas Application && npm start"

echo.
echo VG-Canvas should now be running!
echo The application will be available at: http://localhost:3000
echo.
echo To use collaboration features:
echo 1. Click the 'Collaborate' button in the top right
echo 2. Enter your name and create or join a room
echo 3. Share the invite link with others to collaborate
echo.
echo If you encounter any issues:
echo - Check the server logs in logs\server.log
echo - See COLLABORATION_TROUBLESHOOTING.md for solutions to common problems
echo - Make sure both command windows remain open
echo - Restart if either window closes unexpectedly
echo.
echo Press any key to exit this window (the app will continue running)...
pause > nul