@echo off
REM Employee Register - Quick Setup Script for Windows
REM This script automates the installation of both backend and frontend

echo.
echo ================================
echo Employee Register Setup Script
echo ================================
echo.

REM Check Java
echo Checking prerequisites...
echo.
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo X Java is not installed. Please install JDK 17 or higher.
    pause
    exit /b 1
) else (
    echo [OK] Java found
    java -version
    echo.
)

REM Check Maven
mvn -version >nul 2>&1
if %errorlevel% neq 0 (
    echo X Maven is not installed. Please install Maven 3.6 or higher.
    pause
    exit /b 1
) else (
    echo [OK] Maven found
    for /f "tokens=3" %%A in ('mvn -version ^| findstr /R "Apache Maven"') do echo Apache Maven %%A
    echo.
)

REM Check Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo X Node.js is not installed. Please install Node.js 16 or higher.
    pause
    exit /b 1
) else (
    echo [OK] Node.js found: 
    node --version
    echo.
)

REM Check npm
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo X npm is not installed.
    pause
    exit /b 1
) else (
    echo [OK] npm found: 
    npm --version
    echo.
)

echo All prerequisites satisfied!
echo.

REM Install backend
echo ================================
echo Installing Backend...
echo ================================
cd backend
echo Running: mvn clean install -DskipTests
call mvn clean install -DskipTests

if %errorlevel% neq 0 (
    echo X Backend installation failed
    pause
    exit /b 1
)

echo [OK] Backend installed successfully
echo.

REM Install frontend
echo ================================
echo Installing Frontend...
echo ================================
cd ..\frontend
echo Running: npm install
call npm install

if %errorlevel% neq 0 (
    echo X Frontend installation failed
    pause
    exit /b 1
)

echo [OK] Frontend installed successfully
echo.

echo ================================
echo Installation Complete!
echo ================================
echo.
echo To start the application:
echo.
echo Command Prompt 1 (Backend):
echo   cd backend
echo   mvn spring-boot:run
echo.
echo Command Prompt 2 (Frontend):
echo   cd frontend
echo   npm start
echo.
echo Backend: http://localhost:8080/api
echo Frontend: http://localhost:3000
echo.
pause
