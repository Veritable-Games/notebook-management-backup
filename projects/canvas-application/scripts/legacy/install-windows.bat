@echo off
setlocal EnableDelayedExpansion

echo ========================================================
echo        VG-Canvas Installation Script for Windows
echo ========================================================
echo.

REM Check for admin rights
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo This installer doesn't require administrator rights.
    echo.
)

REM Check if Node.js is installed
where node >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: Node.js is not installed or not in your PATH.
    echo Please install Node.js from https://nodejs.org/ (LTS version recommended).
    echo Make sure to check "Add to PATH" during installation.
    echo.
    echo Press any key to exit...
    pause >nul
    exit /b 1
)

REM Check Node.js version
for /f "tokens=*" %%a in ('node -v') do set NODE_VERSION=%%a
echo Detected Node.js !NODE_VERSION!

REM Check if npm is installed
where npm >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: npm is not installed or not in your PATH.
    echo Please reinstall Node.js from https://nodejs.org/
    echo.
    echo Press any key to exit...
    pause >nul
    exit /b 1
)

REM Install dependencies
echo.
echo Installing dependencies...
call npm install
if %errorLevel% neq 0 (
    echo.
    echo ERROR: Failed to install dependencies.
    echo Please check your internet connection and try again.
    echo.
    echo Press any key to exit...
    pause >nul
    exit /b 1
)

REM Create desktop shortcuts
echo.
echo Would you like to create desktop shortcuts? (Y/N)
set /p CREATE_SHORTCUTS=

if /i "!CREATE_SHORTCUTS!"=="Y" (
    echo.
    echo Creating desktop shortcuts...
    
    REM Get current directory
    set "CURRENT_DIR=%~dp0"
    
    REM Remove trailing backslash if it exists
    if %CURRENT_DIR:~-1%==\ set CURRENT_DIR=%CURRENT_DIR:~0,-1%
    
    REM Create single-user shortcut
    echo Set oWS = WScript.CreateObject("WScript.Shell") > "%TEMP%\CreateShortcut.vbs"
    echo sLinkFile = oWS.SpecialFolders("Desktop") ^& "\VG-Canvas.lnk" >> "%TEMP%\CreateShortcut.vbs"
    echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%TEMP%\CreateShortcut.vbs"
    echo oLink.TargetPath = "cmd.exe" >> "%TEMP%\CreateShortcut.vbs"
    echo oLink.Arguments = "/k cd /d %CURRENT_DIR% && npm start" >> "%TEMP%\CreateShortcut.vbs"
    echo oLink.Description = "VG-Canvas Drawing Application" >> "%TEMP%\CreateShortcut.vbs"
    echo oLink.WorkingDirectory = "%CURRENT_DIR%" >> "%TEMP%\CreateShortcut.vbs"
    echo oLink.Save >> "%TEMP%\CreateShortcut.vbs"
    cscript //nologo "%TEMP%\CreateShortcut.vbs"
    del "%TEMP%\CreateShortcut.vbs"
    
    REM Create collaborative shortcut
    echo Set oWS = WScript.CreateObject("WScript.Shell") > "%TEMP%\CreateShortcut.vbs"
    echo sLinkFile = oWS.SpecialFolders("Desktop") ^& "\VG-Canvas Collaborative.lnk" >> "%TEMP%\CreateShortcut.vbs"
    echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%TEMP%\CreateShortcut.vbs"
    echo oLink.TargetPath = "%CURRENT_DIR%\start-collaborative.bat" >> "%TEMP%\CreateShortcut.vbs"
    echo oLink.Description = "VG-Canvas Collaborative Drawing Application" >> "%TEMP%\CreateShortcut.vbs"
    echo oLink.WorkingDirectory = "%CURRENT_DIR%" >> "%TEMP%\CreateShortcut.vbs"
    echo oLink.Save >> "%TEMP%\CreateShortcut.vbs"
    cscript //nologo "%TEMP%\CreateShortcut.vbs"
    del "%TEMP%\CreateShortcut.vbs"
    
    echo Desktop shortcuts created successfully.
)

REM Ask about autostart
echo.
echo Would you like VG-Canvas to start automatically when you log in? (Y/N)
set /p AUTO_START=

if /i "!AUTO_START!"=="Y" (
    echo.
    echo Setting up autostart...
    
    REM Get current directory
    set "CURRENT_DIR=%~dp0"
    
    REM Remove trailing backslash if it exists
    if %CURRENT_DIR:~-1%==\ set CURRENT_DIR=%CURRENT_DIR:~0,-1%
    
    REM Determine which version to autostart
    echo.
    echo Which version would you like to autostart?
    echo 1. Standard version
    echo 2. Collaborative version
    set /p AUTOSTART_VERSION=
    
    if "!AUTOSTART_VERSION!"=="1" (
        echo Set oWS = WScript.CreateObject("WScript.Shell") > "%TEMP%\CreateShortcut.vbs"
        echo sLinkFile = oWS.SpecialFolders("Startup") ^& "\VG-Canvas.lnk" >> "%TEMP%\CreateShortcut.vbs"
        echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%TEMP%\CreateShortcut.vbs"
        echo oLink.TargetPath = "cmd.exe" >> "%TEMP%\CreateShortcut.vbs"
        echo oLink.Arguments = "/k cd /d %CURRENT_DIR% && npm start" >> "%TEMP%\CreateShortcut.vbs"
        echo oLink.Description = "VG-Canvas Drawing Application" >> "%TEMP%\CreateShortcut.vbs"
        echo oLink.WorkingDirectory = "%CURRENT_DIR%" >> "%TEMP%\CreateShortcut.vbs"
        echo oLink.Save >> "%TEMP%\CreateShortcut.vbs"
        cscript //nologo "%TEMP%\CreateShortcut.vbs"
        del "%TEMP%\CreateShortcut.vbs"
    ) else if "!AUTOSTART_VERSION!"=="2" (
        echo Set oWS = WScript.CreateObject("WScript.Shell") > "%TEMP%\CreateShortcut.vbs"
        echo sLinkFile = oWS.SpecialFolders("Startup") ^& "\VG-Canvas Collaborative.lnk" >> "%TEMP%\CreateShortcut.vbs"
        echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%TEMP%\CreateShortcut.vbs"
        echo oLink.TargetPath = "%CURRENT_DIR%\start-collaborative.bat" >> "%TEMP%\CreateShortcut.vbs"
        echo oLink.Description = "VG-Canvas Collaborative Drawing Application" >> "%TEMP%\CreateShortcut.vbs"
        echo oLink.WorkingDirectory = "%CURRENT_DIR%" >> "%TEMP%\CreateShortcut.vbs"
        echo oLink.Save >> "%TEMP%\CreateShortcut.vbs"
        cscript //nologo "%TEMP%\CreateShortcut.vbs"
        del "%TEMP%\CreateShortcut.vbs"
    ) else (
        echo Invalid selection. Skipping autostart setup.
    )
    
    echo Autostart setup complete.
)

REM Installation complete
echo.
echo ========================================================
echo VG-Canvas has been successfully installed!
echo.
echo To start VG-Canvas:
echo 1. Standard version: npm start
echo 2. Collaborative version: start-collaborative.bat
echo.
echo If you created desktop shortcuts, you can also use those.
echo.
echo For more information, see WINDOWS_SETUP.md
echo ========================================================
echo.

echo Press any key to exit...
pause >nul