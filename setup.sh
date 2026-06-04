#!/bin/bash
# Employee Register - Quick Setup Script
# This script automates the installation of both backend and frontend

echo "================================"
echo "Employee Register Setup Script"
echo "================================"
echo ""

# Check prerequisites
echo "Checking prerequisites..."
echo ""

# Check Java
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install JDK 17 or higher."
    exit 1
else
    java_version=$(java -version 2>&1 | grep "java version" | awk -F '"' '{print $2}')
    echo "✅ Java found: $java_version"
fi

# Check Maven
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven is not installed. Please install Maven 3.6 or higher."
    exit 1
else
    mvn_version=$(mvn -version | head -1)
    echo "✅ Maven found: $mvn_version"
fi

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16 or higher."
    exit 1
else
    node_version=$(node -v)
    echo "✅ Node.js found: $node_version"
fi

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
else
    npm_version=$(npm -v)
    echo "✅ npm found: $npm_version"
fi

echo ""
echo "All prerequisites satisfied!"
echo ""

# Install backend
echo "================================"
echo "Installing Backend..."
echo "================================"
cd backend
echo "Running: mvn clean install -DskipTests"
mvn clean install -DskipTests

if [ $? -ne 0 ]; then
    echo "❌ Backend installation failed"
    exit 1
fi

echo "✅ Backend installed successfully"
echo ""

# Install frontend
echo "================================"
echo "Installing Frontend..."
echo "================================"
cd ../frontend
echo "Running: npm install"
npm install

if [ $? -ne 0 ]; then
    echo "❌ Frontend installation failed"
    exit 1
fi

echo "✅ Frontend installed successfully"
echo ""

echo "================================"
echo "Installation Complete! ✅"
echo "================================"
echo ""
echo "To start the application:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend"
echo "  mvn spring-boot:run"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd frontend"
echo "  npm start"
echo ""
echo "Backend: http://localhost:8080/api"
echo "Frontend: http://localhost:3000"
echo ""
