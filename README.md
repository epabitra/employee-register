# Employee Register - Full Stack Application

A proof-of-concept employee management system built with **Spring Boot** backend and **React** frontend. The application allows users to create, view, and manage employee records with pagination.

## Features

- ✅ **Add Employees**: Create new employee records with comprehensive details
- ✅ **View Employees**: Display all employees in a paginated table
- ✅ **Delete Employees**: Remove employee records from the system
- ✅ **Pagination**: Navigate through employee records with easy pagination
- ✅ **Database Migrations**: Automatic database schema creation using Liquibase
- ✅ **Sample Data**: Pre-populated with sample employees on first startup
- ✅ **Clean UI**: Modern, responsive user interface built with React
- ✅ **Form Validation**: Client-side and server-side validation

## Technology Stack

### Backend
- **Java 17**
- **Spring Boot 3.1.5**
- **Spring Data JPA**
- **Liquibase** (Database migrations)
- **H2 Database** (In-memory for POC)
- **Lombok** (Boilerplate reduction)
- **Maven** (Build tool)

### Frontend
- **React 18.2**
- **Axios** (HTTP client)
- **React Router** (Navigation)
- **CSS3** (Responsive styling)
- **npm** (Package manager)

## Project Structure

```
employee-register/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/employee/
│   │   │   │   ├── EmployeeRegisterApplication.java
│   │   │   │   ├── controller/
│   │   │   │   │   └── EmployeeController.java
│   │   │   │   ├── service/
│   │   │   │   │   └── EmployeeService.java
│   │   │   │   ├── repository/
│   │   │   │   │   └── EmployeeRepository.java
│   │   │   │   ├── model/
│   │   │   │   │   └── Employee.java
│   │   │   │   └── dto/
│   │   │   │       └── EmployeeDTO.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── db/
│   │   │           └── changelog/
│   │   │               └── db.changelog-master.xml
│   └── pom.xml
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmployeeForm.jsx
│   │   │   ├── EmployeeList.jsx
│   │   │   └── Pagination.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── employeeService.js
│   │   ├── styles/
│   │   │   ├── Dashboard.css
│   │   │   ├── EmployeeForm.css
│   │   │   ├── EmployeeList.css
│   │   │   ├── Pagination.css
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Java Development Kit (JDK)**: Version 17 or higher
  - Download from: https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html
  
- **Apache Maven**: Version 3.6 or higher
  - Download from: https://maven.apache.org/download.cgi
  
- **Node.js**: Version 16.x or higher (includes npm)
  - Download from: https://nodejs.org/

## Setup Instructions

### 1. Clone or Extract the Project

Extract the project to your desired location:
```bash
cd employee-register
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

#### Install Dependencies with Maven
```bash
mvn clean install
```

This will:
- Download all required dependencies
- Compile the Java code
- Build the project

#### Start the Backend Server
```bash
mvn spring-boot:run
```

The backend will start on `http://localhost:8080/api`

**First Startup Behavior**:
- Liquibase will automatically create the database schema
- Sample employee data will be inserted
- The in-memory H2 database will be initialized

**Expected Output**:
```
Started EmployeeRegisterApplication in X.XXX seconds (JVM running for Y.YYY)
Tomcat initialized with port(s): 8080 (http)
```

#### Access H2 Console (Optional - for debugging)
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:employeedb`
- Username: `sa`
- Password: (leave blank)

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

#### Install Dependencies
```bash
npm install
```

This will install all required Node.js packages.

#### Start the Development Server
```bash
npm start
```

The frontend will automatically open in your default browser at `http://localhost:3000`

**Expected Output**:
```
Compiled successfully!
```

## Usage

Once both servers are running:

### Adding an Employee

1. Fill in the form on the left side with employee details:
   - First Name (required)
   - Last Name (required)
   - Email (required, must be unique)
   - Phone (optional)
   - Position (required)
   - Department (required)
   - Salary (required)
   - Hire Date (required)

2. Click "Add Employee" button

3. You'll see a success message, and the employee list will refresh

### Viewing Employees

- The employee directory displays all employees in a paginated table
- Shows up to 10 employees per page by default
- Use pagination controls to navigate through pages

### Deleting an Employee

1. Click the "Delete" button in the Actions column
2. Confirm the deletion in the popup dialog
3. The employee will be removed from the system

### Managing Pagination

- Navigate between pages using:
  - Previous/Next buttons
  - Direct page number buttons
  - First/Last buttons

## API Endpoints

### Employee Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | Get paginated list of employees |
| GET | `/api/employees/{id}` | Get employee by ID |
| POST | `/api/employees` | Create a new employee |
| PUT | `/api/employees/{id}` | Update an employee |
| DELETE | `/api/employees/{id}` | Delete an employee |

### Query Parameters for GET /api/employees
- `page`: Page number (0-indexed, default: 0)
- `size`: Page size (default: 10)
- `sortBy`: Field to sort by (default: id)
- `direction`: Sort direction - ASC or DESC (default: ASC)

### Example Requests

**Create Employee**:
```bash
curl -X POST http://localhost:8080/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "position": "Developer",
    "department": "Engineering",
    "salary": 100000.00,
    "hireDate": "2024-01-15"
  }'
```

**Get All Employees (Page 0, 10 items)**:
```bash
curl http://localhost:8080/api/employees?page=0&size=10
```

## Database Schema

### Employees Table

| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT |
| first_name | VARCHAR(100) | NOT NULL |
| last_name | VARCHAR(100) | NOT NULL |
| email | VARCHAR(255) | NOT NULL, UNIQUE |
| phone | VARCHAR(20) | NULL |
| position | VARCHAR(100) | NOT NULL |
| department | VARCHAR(100) | NOT NULL |
| salary | DECIMAL(10,2) | NOT NULL |
| hire_date | DATE | NOT NULL |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP |

### Changelog History

The Liquibase changelog includes the following changes:
1. **001-create-employee-table**: Creates the employees table with all columns
2. **002-create-email-index**: Creates an index on email for faster lookups
3. **003-insert-sample-data**: Inserts 3 sample employees for testing

## Troubleshooting

### Backend Issues

**Port 8080 already in use**:
```bash
# Find and kill the process using port 8080
# Windows:
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :8080
kill -9 <PID>
```

**Database connection errors**:
- Ensure H2 database dependencies are in pom.xml
- Check application.properties for correct database URL
- Clear Maven cache: `mvn clean`

### Frontend Issues

**Dependencies installation fails**:
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

**Port 3000 already in use**:
```bash
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :3000
kill -9 <PID>
```

**CORS errors**:
- Ensure backend is running on port 8080
- Verify CORS configuration in EmployeeController
- Clear browser cache

### Both Frontend and Backend

**Unable to communicate**:
1. Verify both services are running
2. Check browser console for errors (F12)
3. Verify API URL in `employeeService.js` is correct
4. Ensure no firewall is blocking ports 3000 and 8080

## Performance Considerations

- The in-memory H2 database is suitable for POC purposes
- For production, migrate to a persistent database (PostgreSQL, MySQL, etc.)
- Implement pagination to handle large datasets
- Add caching for frequently accessed data

## Future Enhancements

- User authentication and authorization
- Edit employee functionality
- Export employee data to CSV/Excel
- Advanced search and filtering
- Dashboard with analytics
- Email notifications
- Department management
- Performance reviews tracking

## License

This is a proof-of-concept application for educational purposes.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check browser developer console for errors
4. Review backend logs for stack traces

---

**Last Updated**: 2024
**Version**: 1.0.0
