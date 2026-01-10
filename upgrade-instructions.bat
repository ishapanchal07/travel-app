@echo off
REM ROAMSTER - Expo SDK 54 Upgrade Script (Windows)
REM This script helps you upgrade from SDK 49 to SDK 54

echo.
echo ========================================
echo   ROAMSTER - Expo SDK 54 Upgrade Script
echo ========================================
echo.

REM Check Node.js version
echo Checking Node.js version...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js 20.19.4 or higher from https://nodejs.org/
    exit /b 1
)

for /f "tokens=2 delims=v" %%v in ('node -v') do set NODE_VERSION=%%v
echo Node.js version: %NODE_VERSION%
echo.

echo Step 1: Removing old dependencies...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del /q package-lock.json
if exist yarn.lock del /q yarn.lock

echo.
echo Step 2: Installing updated dependencies...
call npm install

echo.
echo Step 3: Fixing dependency versions with Expo...
call npx expo install --fix

echo.
echo Step 4: Running expo-doctor to check for issues...
call npx expo-doctor
if %errorlevel% neq 0 (
    echo Warning: expo-doctor found some issues. Please review them above.
)

echo.
echo ========================================
echo   Upgrade process complete!
echo ========================================
echo.
echo Next steps:
echo 1. Run: npm start
echo 2. Test your app thoroughly
echo 3. Check UPGRADE_SDK54.md for any breaking changes
echo.
echo If you encounter issues, see UPGRADE_SDK54.md troubleshooting section.
echo.

