@echo off
setlocal enabledelayedexpansion

echo === VG-Canvas Launcher ===
echo.
echo Select mode:
echo 1. Single User Mode
echo 2. Collaboration Mode
echo.
set /p choice=Enter choice (1 or 2): 

if "%choice%"=="1" (
    echo Starting VG-Canvas in single user mode...
    npm start
    exit /b
)

if "%choice%"=="2" (
    echo Starting VG-Canvas in collaboration mode...
    
    REM Check if ports are available
    set PORT_CONFLICT=false
    
    netstat -ano | findstr :3000 | findstr LISTENING > nul
    if %errorLevel% == 0 (
        echo WARNING: Port 3000 is in use. The React app may not start correctly.
        set PORT_CONFLICT=true
    )
    
    netstat -ano | findstr :5000 | findstr LISTENING > nul
    if %errorLevel% == 0 (
        echo WARNING: Port 5000 is in use. The collaboration server may not start correctly.
        set PORT_CONFLICT=true
    )
    
    if %PORT_CONFLICT%==true (
        echo Would you like to free these ports? (y/n)
        set /p FREE_PORTS=
        if /i "!FREE_PORTS!"=="y" (
            echo Attempting to free ports...
            for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do (
                taskkill /F /PID %%a > nul 2>&1
            )
            for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000 ^| findstr LISTENING') do (
                taskkill /F /PID %%a > nul 2>&1
            )
            timeout /t 1 > nul
        )
    )
    
    echo Starting collaboration server...
    start "VG-Canvas Server" cmd /c "node server.js > server.log 2>&1"
    timeout /t 2 > nul
    
    echo Starting VG-Canvas app...
    echo Important: When the app loads, click 'Collaborate' button in the top right.
    npm start
    exit /b
)

echo Invalid choice
pause