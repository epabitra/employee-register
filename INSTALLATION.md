# INSTALLATION & SETUP GUIDE

## 📋 Table of Contents
1. [System Requirements](#system-requirements)
2. [Installation Steps](#installation-steps)
3. [Starting the Application](#starting-the-application)
4. [Verification](#verification)
5. [Common Issues](#common-issues)

---

## System Requirements

### Minimum Requirements
- **RAM**: 2GB
- **Disk Space**: 500MB
- **OS**: Windows, macOS, or Linux

### Software Requirements

| Software | Version | Download |
|----------|---------|----------|
| Java Development Kit (JDK) | 17+ | https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html |
| Apache Maven | 3.6+ | https://maven.apache.org/download.cgi |
| Node.js (includes npm) | 16+ | https://nodejs.org/ |

---

## Installation Steps

### Step 1: Verify Prerequisites

**Open Command Prompt/Terminal and run:**

```bash
java -version
mvn -version
node --version
npm --version
```

Expected output:
```
java version "17.x.x"
Apache Maven 3.x.x
v16.x.x (or higher)
npm 7.x.x (or higher)
```

### Step 2: Install Backend Dependencies

```bash
cd backend
mvn clean install -DskipTests
```

**What happens**:
- Downloads ~300MB of Maven dependencies
- Compiles Java source code
- Creates build artifacts

**Time**: ~3-5 minutes (varies with internet speed)

**Expected output ends with**:
```
[INFO] BUILD SUCCESS
[INFO] Total time: X.XXs
```

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

**What happens**:
- Installs Node.js packages
- Sets up development environment
- Creates node_modules folder

**Time**: ~2-3 minutes

**Expected output ends with**:
```
added X packages in X.XXs
```

---

## Starting the Application

### Method 1: Sequential Start (Recommended for Beginners)

**Terminal 1 - Start Backend:**
```bash
cd backend
mvn spring-boot:run
```

Wait for:
```
Started EmployeeRegisterApplication in X.XXXs (JVM running for Y.YYYs)
Tomcat started on port(s): 8080 (http)
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm start
```

Wait for:
```
webpack compiled successfully
One of your dependencies, babel-jest, is very old and will stop being supported
You can find more info about this at https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/README.md#troubleshooting
Compiled successfully!
```

Browser should open automatically at `http://localhost:3000`

### Method 2: Build and Run (Production-like)

**Backend:**
```bash
cd backend
mvn clean package -DskipTests
java -jar target/employee-register-1.0.0.jar
```

**Frontend:**
```bash
cd frontend
npm run build
# Serve using a simple HTTP server
npx serve build
```

---

## Verification

### ✅ Backend is Working

1. Open browser: `http://localhost:8080/api/employees`
2. You should see JSON response with employee data

Example response:
```json
{
  "content": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      ...
    }
  ],
  "totalElements": 3,
  "totalPages": 1,
  "currentPage": 0
}
```

### ✅ Frontend is Working

1. Open browser: `http://localhost:3000`
2. You should see the Employee Register dashboard
3. The employee list should display 3 sample employees

### ✅ Database is Initialized

Access H2 Console:
1. Go to: `http://localhost:8080/h2-console`
2. Connection Settings:
   - JDBC URL: `jdbc:h2:mem:employeedb`
   - Username: `sa`
   - Password: (leave empty)
3. Click "Connect"
4. Run query: `SELECT * FROM employees;`
5. Should return 3 sample employees

---

## Common Issues & Solutions

### Issue 1: Port Already in Use

**Error**: "Address already in use" on port 8080 or 3000

**Solution - Windows:**
```bash
# Find process using port 8080
netstat -ano | findstr :8080

# Kill the process (replace XXXX with PID)
taskkill /PID XXXX /F

# For port 3000
netstat -ano | findstr :3000
taskkill /PID XXXX /F
```

**Solution - macOS/Linux:**
```bash
# Find and kill process on port 8080
lsof -i :8080
kill -9 <PID>

# For port 3000
lsof -i :3000
kill -9 <PID>
```

### Issue 2: Maven Dependencies Download Fails

**Error**: "Failed to download..." or "No internet connection"

**Solutions**:
1. Check internet connection
2. Clear Maven cache:
   ```bash
   mvn clean -U
   ```
3. Check proxy settings if behind corporate network
4. Try again with increased timeout:
   ```bash
   mvn -DtcpConnectTimeout=10000 clean install
   ```

### Issue 3: npm install Fails

**Error**: "ERR! code EACCES" or "permission denied"

**Solutions**:
- Windows: Run Command Prompt as Administrator
- macOS/Linux:
  ```bash
  sudo npm install
  ```

Or use npm version manager (nvm):
```bash
# Install nvm from https://github.com/nvm-sh/nvm
nvm use 16
npm install
```

### Issue 4: CORS Errors in Browser

**Error**: "Access to XMLHttpRequest has been blocked by CORS policy"

**Solution**: 
- Ensure backend is running on port 8080
- Check frontend environment file matches backend URL
- Verify `@CrossOrigin` annotation in EmployeeController

### Issue 5: Blank Page on Frontend

**Error**: White screen, no content visible

**Solution**:
1. Check browser console (F12)
2. Verify backend is running: `http://localhost:8080/api/employees`
3. Clear browser cache (Ctrl+Shift+Delete)
4. Restart frontend: Stop (Ctrl+C) and `npm start`

### Issue 6: Database Connection Errors

**Error**: "Cannot get JDBC Connection"

**Solution**:
1. Backend still initializing - wait 5-10 seconds
2. Check H2 database dependency in pom.xml
3. Verify application.properties settings
4. Check Java version: `java -version` (should be 17+)

---

## Application URLs

Once running, access via:

| URL | Purpose |
|-----|---------|
| `http://localhost:3000` | React Frontend |
| `http://localhost:8080/api` | Backend API Base |
| `http://localhost:8080/api/employees` | Get all employees |
| `http://localhost:8080/h2-console` | H2 Database Console |

---

## Stopping the Application

### To Stop Backend
In backend terminal: Press `Ctrl+C`

### To Stop Frontend
In frontend terminal: Press `Ctrl+C`

Select `Y` when prompted to terminate batch job.

---

## Testing the Application

### Manual Testing Checklist

- [ ] Backend starts without errors
- [ ] Frontend loads in browser
- [ ] Employee list shows 3 sample employees
- [ ] Form validation works (try invalid email)
- [ ] Can add new employee
- [ ] Pagination works
- [ ] Can delete employee
- [ ] Deleted employee no longer in list

### API Testing with cURL

```bash
# Get all employees
curl http://localhost:8080/api/employees

# Get specific page
curl "http://localhost:8080/api/employees?page=0&size=10"

# Get specific employee
curl http://localhost:8080/api/employees/1

# Create employee
curl -X POST http://localhost:8080/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "firstName":"Jane",
    "lastName":"Doe",
    "email":"jane@example.com",
    "position":"Manager",
    "department":"Sales",
    "salary":95000,
    "hireDate":"2024-01-01"
  }'

# Delete employee
curl -X DELETE http://localhost:8080/api/employees/1
```

---

## Performance Tips

1. **Increase Java Heap Memory** (if running on low RAM):
   ```bash
   mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xms512m -Xmx1024m"
   ```

2. **Skip Tests During Build** (faster builds):
   ```bash
   mvn clean install -DskipTests
   ```

3. **Use Production Build** (frontend):
   ```bash
   npm run build
   ```

---

## Next Steps

- Explore the code in [README.md](README.md)
- Learn about database changes in [CHANGELOG.md](CHANGELOG.md)
- Review [QUICKSTART.md](QUICKSTART.md) for quick reference

---

## Support

**If something doesn't work**:

1. Check this guide again
2. Review console/terminal output for error messages
3. Check [README.md](README.md) Troubleshooting section
4. Verify ports 3000 and 8080 are not blocked
5. Ensure all prerequisites are installed

---

**Success!** 🎉

Once you see both services running, open `http://localhost:3000` and start managing employees!
