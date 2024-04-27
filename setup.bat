@echo off

rem Define directories
set dir1=./Api
set dir2=./Client

rem Install npm dependencies for directory 1
echo Installing npm dependencies for API...
cd %dir1%
npm install

rem Check for npm install error
if %errorlevel% neq 0 (
    echo Error: npm install failed for API.
    pause >nul
    exit /b %errorlevel%
)

rem Install npm dependencies for directory 2
echo Installing npm dependencies for CLIENT...
cd ..
cd %dir2%
npm install

rem Check for npm install error
if %errorlevel% neq 0 (
    echo Error: npm install failed for CLIENT.
    pause >nul
    exit /b %errorlevel%
)

echo npm install completed successfully for both directories.
pause >nul