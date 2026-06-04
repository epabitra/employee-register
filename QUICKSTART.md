# Quick Start Guide

Get the Employee Register application running in 5 minutes!

## Prerequisites Check

Verify you have these installed:

```bash
# Check Java
java -version
# Should show Java 17 or higher

# Check Maven
mvn -version
# Should show Maven 3.6 or higher

# Check Node.js and npm
node -version
npm -version
# Should show Node 16+ and npm 7+
```

## Step 1: Start Backend (Terminal 1)

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

**Wait for this message**: `Started EmployeeRegisterApplication`

✅ Backend is ready at: `http://localhost:8080/api`

## Step 2: Start Frontend (Terminal 2)

```bash
cd frontend
npm install
npm start
```

**Wait for**: Browser to open automatically at `http://localhost:3000`

✅ Application is ready!

## Step 3: Try It Out!

1. **Add an Employee**:
   - Fill the form on the left
   - Click "Add Employee"
   - See success message

2. **View Employees**:
   - Check the table on the right
   - Use pagination to browse

3. **Delete an Employee**:
   - Click "Delete" button
   - Confirm deletion

## Ports

- Backend: `http://localhost:8080/api`
- Frontend: `http://localhost:3000`
- H2 Console: `http://localhost:8080/h2-console` (optional)

## Stop the Application

Press `Ctrl+C` in each terminal to stop the servers.

---

**Problems?** Check the main README.md Troubleshooting section.
