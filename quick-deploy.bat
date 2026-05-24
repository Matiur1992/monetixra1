@echo off
echo ============================================================
echo           MONETIXRA - QUICK DEPLOYMENT
echo ============================================================
echo.

REM Check if PowerShell is available
where powershell >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: PowerShell not found!
    pause
    exit /b 1
)

REM Run the deployment script
echo Running deployment script...
powershell -ExecutionPolicy Bypass -File deploy.ps1

pause
