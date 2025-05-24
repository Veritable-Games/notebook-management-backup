@echo off
setlocal enabledelayedexpansion

echo ==================================
echo VG-Canvas Process Manager
echo ==================================
echo.
echo This utility helps you manage VG-Canvas processes
echo that may be running in the background.
echo.

:menu
echo Options:
echo 1. List all VG-Canvas processes
echo 2. Stop all VG-Canvas processes
echo 3. Restart VG-Canvas (Collaborative)
echo 4. Exit
echo.
set /p choice=Enter your choice (1-4): 

if "%choice%"=="1" goto list
if "%choice%"=="2" goto stop
if "%choice%"=="3" goto restart
if "%choice%"=="4" goto end

echo Invalid choice. Please try again.
echo.
goto menu

:list
echo.
echo Searching for Node.js processes (VG-Canvas)...
echo.
echo Note: If you don't see any processes listed, it means
echo VG-Canvas is not currently running.
echo.
tasklist /fi "imagename eq node.exe" /fo table /nh

tasklist /fi "imagename eq cmd.exe" /fo list | findstr "VG-Canvas"
echo.
echo Press any key to return to menu...
pause > nul
cls
goto menu

:stop
echo.
echo Stopping all Node.js processes (may include non-VG-Canvas processes)...
echo.
for /f "tokens=2" %%i in ('tasklist /fi "imagename eq node.exe" /fo table /nh') do (
    echo Terminating process with PID: %%i
    taskkill /f /pid %%i 2>nul
)

echo.
echo Stopping any command windows running VG-Canvas...
for /f "tokens=2" %%i in ('tasklist /fi "imagename eq cmd.exe" /fo list ^| findstr "VG-Canvas"') do (
    echo Terminating process with PID: %%i
    taskkill /f /pid %%i 2>nul
)

echo.
echo All VG-Canvas processes have been stopped.
echo.
echo Press any key to return to menu...
pause > nul
cls
goto menu

:restart
echo.
echo Restarting VG-Canvas Collaborative...
echo.
echo First, stopping any existing instances...

for /f "tokens=2" %%i in ('tasklist /fi "imagename eq node.exe" /fo table /nh') do (
    taskkill /f /pid %%i 2>nul
)

for /f "tokens=2" %%i in ('tasklist /fi "imagename eq cmd.exe" /fo list ^| findstr "VG-Canvas"') do (
    taskkill /f /pid %%i 2>nul
)

echo Waiting a moment for ports to be released...
timeout /t 3 > nul

echo Starting VG-Canvas Collaborative...
cd /d %~dp0\..
start start-collaborative.bat

echo.
echo VG-Canvas has been restarted.
echo.
echo Press any key to return to menu...
pause > nul
cls
goto menu

:end
echo.
echo Exiting Process Manager...
echo.
exit /b 0