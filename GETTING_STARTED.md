# 🎯 GETTING STARTED - Employee Register Application

Welcome to the **Employee Register** POC application! This file will guide you to get up and running quickly.

---

## 📋 What You'll Get

A complete, production-ready POC application with:
- ✅ Spring Boot REST API backend
- ✅ React frontend with modern UI
- ✅ H2 database with automatic schema creation
- ✅ Liquibase database migrations
- ✅ Employee CRUD operations
- ✅ Pagination support
- ✅ Form validation
- ✅ Responsive design

---

## 🚀 Quick Start (5 Minutes)

### For Windows Users

**Option 1: Automated Setup**
1. Open Command Prompt in the project folder
2. Run: `setup.bat`
3. Follow the prompts

**Option 2: Manual Setup**
```bash
cd backend
mvn clean install -DskipTests
mvn spring-boot:run
```

In another Command Prompt:
```bash
cd frontend
npm install
npm start
```

### For macOS/Linux Users

**Option 1: Automated Setup**
```bash
bash setup.sh
```

**Option 2: Manual Setup**
```bash
cd backend
mvn clean install -DskipTests
mvn spring-boot:run
```

In another terminal:
```bash
cd frontend
npm install
npm start
```

---

## ✅ Verify It's Working

### Backend ✅
- Open browser: `http://localhost:8080/api/employees`
- Should see JSON with employee data

### Frontend ✅
- Browser opens automatically at `http://localhost:3000`
- Should see Employee Register dashboard
- Table should show 3 sample employees

### Database ✅
- Open: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:employeedb`
- Username: `sa`
- Password: (leave empty)
- Run: `SELECT * FROM employees;`

---

## 🎮 Try the Application

### Add an Employee
1. Fill the form on the left side
2. Enter valid data
3. Click "Add Employee"
4. See success message
5. New employee appears in the table

### View Employees
- Table shows all employees with details
- Pagination controls at bottom
- Click page numbers to navigate

### Delete an Employee
- Click "Delete" button
- Confirm deletion
- Employee removed from list

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **README.md** | Complete reference guide |
| **QUICKSTART.md** | 5-minute quick reference |
| **INSTALLATION.md** | Detailed installation steps |
| **CHANGELOG.md** | Database migrations details |
| **PROJECT_SUMMARY.md** | Architecture & structure |

---

## 🛠️ System Requirements

| Software | Version | Status |
|----------|---------|--------|
| Java JDK | 17+ | Required |
| Maven | 3.6+ | Required |
| Node.js | 16+ | Required |
| npm | 7+ | Required |

**Verify installation:**
```bash
java -version
mvn -version
node --version
npm --version
```

---

## 📁 Project Structure

```
employee-register/
├── backend/                    # Spring Boot API
│   └── src/main/java/com/employee/
│       ├── controller/        # REST endpoints
│       ├── service/           # Business logic
│       ├── repository/        # Data access
│       ├── model/             # Entity classes
│       └── dto/               # Data transfer objects
│
├── frontend/                   # React UI
│   └── src/
│       ├── components/        # React components
│       ├── pages/             # Page components
│       ├── services/          # API integration
│       └── styles/            # CSS files
│
└── docs/                       # Documentation
    ├── README.md
    ├── INSTALLATION.md
    ├── QUICKSTART.md
    └── CHANGELOG.md
```

---

## 🌐 Access Points

Once running:

| URL | Purpose |
|-----|---------|
| `http://localhost:3000` | Main Application |
| `http://localhost:8080/api` | Backend API |
| `http://localhost:8080/api/employees` | Employee List (API) |
| `http://localhost:8080/h2-console` | Database Console |

---

## ⚙️ Configuration

### Backend (Spring Boot)
- File: `backend/src/main/resources/application.properties`
- Port: 8080
- Database: H2 (in-memory)
- CORS: Enabled for localhost:3000

### Frontend (React)
- API URL: `http://localhost:8080/api`
- Port: 3000
- File: `frontend/src/services/employeeService.js`

---

## 🔄 Common Workflows

### Development

**Terminal 1 - Backend:**
```bash
cd backend
mvn spring-boot:run
# Runs with auto-reload (DevTools)
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# Auto-reload on file changes
```

### Production Build

**Backend:**
```bash
cd backend
mvn clean package
java -jar target/employee-register-1.0.0.jar
```

**Frontend:**
```bash
cd frontend
npm run build
# Static files in build/ folder
```

---

## 🐛 Troubleshooting

### Problem: "Port already in use"
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :8080
kill -9 <PID>
```

### Problem: "CORS error"
- Ensure backend is running
- Verify port 8080 is accessible
- Check API URL in employeeService.js

### Problem: "Cannot download Maven dependencies"
```bash
mvn clean -U install
```

### Problem: "npm packages not installing"
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

---

## 📖 Learn More

### Code Structure

**Employee Model:**
- `backend/src/main/java/com/employee/model/Employee.java`

**REST Controller:**
- `backend/src/main/java/com/employee/controller/EmployeeController.java`

**React Components:**
- `frontend/src/components/EmployeeForm.jsx`
- `frontend/src/components/EmployeeList.jsx`
- `frontend/src/pages/Dashboard.jsx`

---

## 🎓 API Reference

### Create Employee
```bash
POST /api/employees
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "position": "Developer",
  "department": "Engineering",
  "salary": 100000,
  "hireDate": "2024-01-01"
}
```

### Get All Employees
```bash
GET /api/employees?page=0&size=10
```

### Get Single Employee
```bash
GET /api/employees/1
```

### Update Employee
```bash
PUT /api/employees/1
Content-Type: application/json

{
  "firstName": "Jane",
  ...
}
```

### Delete Employee
```bash
DELETE /api/employees/1
```

---

## 💡 Tips & Tricks

1. **Browser DevTools**: Press F12 to see network requests and console errors
2. **H2 Console**: Great for checking database without external tools
3. **Sample Data**: 3 employees are pre-populated in the database
4. **Form Validation**: Try invalid email to see validation in action
5. **Pagination**: Useful for testing with many employees

---

## 🚀 Next Steps

1. ✅ Setup the application (this guide)
2. ✅ Run and verify it works
3. 📖 Read [README.md](README.md) for complete reference
4. 🔍 Explore the code
5. 🎨 Customize UI/styling as needed
6. ✨ Add new features (edit, search, filters)
7. 🐛 Add tests (unit, integration, E2E)
8. 🚀 Deploy to production

---

## 📞 Need Help?

1. Check [INSTALLATION.md](INSTALLATION.md) for detailed steps
2. Review [README.md](README.md) Troubleshooting section
3. Check browser console (F12) for errors
4. Check terminal output for error messages
5. Verify all prerequisites are installed

---

## ✨ What's Included

### Backend
- [x] Spring Boot 3.1.5
- [x] Spring Data JPA
- [x] REST API with CRUD
- [x] H2 Database
- [x] Liquibase migrations
- [x] CORS configuration
- [x] Error handling
- [x] Pagination support

### Frontend
- [x] React 18.2
- [x] Axios HTTP client
- [x] Responsive design
- [x] Form validation
- [x] Pagination
- [x] Success/error notifications
- [x] Loading states
- [x] Clean CSS styling

### Database
- [x] Automatic schema creation
- [x] Sample data
- [x] Indexes for performance
- [x] Timestamp tracking
- [x] Email uniqueness constraint

---

## 🎉 You're All Set!

Now:
1. Run `setup.bat` (Windows) or `bash setup.sh` (Mac/Linux)
2. Or follow manual setup steps above
3. Open `http://localhost:3000`
4. Start managing employees!

---

**Happy Coding! 🚀**

For complete documentation, see [README.md](README.md)

**Version**: 1.0.0  
**Type**: Proof of Concept  
**Last Updated**: 2024
