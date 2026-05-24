@echo off
chcp 65001
cls
echo ============================================
echo    MONETIXRA - Netlify Deployment Tool
echo ============================================
echo.

:: Check if Netlify CLI is installed
netlify --version >nul 2>&1
if errorlevel 1 (
    echo [INFO] Netlify CLI not found. Installing...
    npm install -g netlify-cli
)

:: Check if user is logged in
netlify status >nul 2>&1
if errorlevel 1 (
    echo [INFO] Please login to Netlify first...
    netlify login
)

:: Check if site is linked
echo [INFO] Checking site link...
netlify link 2>nul

echo.
echo ============================================
echo    Choose Deployment Type:
echo ============================================
echo.
echo 1. Production Deploy (monetixrap.netlify.app)
echo 2. Draft Deploy (preview URL)
echo 3. Build and Deploy
echo 4. Exit
echo.
set /p choice="Enter choice (1-4): "

if "%choice%"=="1" goto prod
if "%choice%"=="2" goto draft
if "%choice%"=="3" goto build
if "%choice%"=="4" goto end

:prod
echo.
echo [DEPLOYING] Production deployment starting...
netlify deploy --prod --dir="." --site=monetixrap.netlify.app
if errorlevel 1 (
    echo.
    echo [ERROR] Production deploy failed!
    echo [INFO] Trying to create new site...
    netlify deploy --prod --dir="."
)
goto end

:draft
echo.
echo [DEPLOYING] Draft deployment starting...
netlify deploy --dir="."
goto end

:build
echo.
echo [BUILD] No build needed for static site
echo [DEPLOYING] Deploying to production...
netlify deploy --prod --dir="."
goto end

:end
echo.
echo ============================================
echo    Deployment Complete!
echo ============================================
echo.
echo [INFO] Your site should be live at:
echo https://monetixrap.netlify.app
echo.
pause
