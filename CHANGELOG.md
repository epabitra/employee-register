# Database Changelog

This document describes all database changes that are automatically applied when the application starts.

## Liquibase Migrations

All database schema changes are managed through Liquibase changelogs in:
`backend/src/main/resources/db/changelog/db.changelog-master.xml`

### How It Works

1. **First Startup**: Liquibase checks if the changelog table exists
2. **Schema Creation**: All pending changesets are executed
3. **Idempotent**: Changesets are marked as executed and won't run again
4. **Rollback Support**: Each changeset can be rolled back if needed

---

## Change History

### Changeset 001: Create Employee Table (2024)

**Purpose**: Create the employees table with all required columns

**Changes**:
```sql
CREATE TABLE employees (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  position VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  hire_date DATE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

**Columns**:
| Column | Type | Purpose |
|--------|------|---------|
| id | BIGINT | Primary key, auto-increment |
| first_name | VARCHAR(100) | Employee's first name |
| last_name | VARCHAR(100) | Employee's last name |
| email | VARCHAR(255) | Unique email address |
| phone | VARCHAR(20) | Contact phone number |
| position | VARCHAR(100) | Job position/title |
| department | VARCHAR(100) | Department name |
| salary | DECIMAL(10,2) | Annual salary |
| hire_date | DATE | Hiring date |
| created_at | TIMESTAMP | Record creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**Status**: ✅ Executed on first startup

---

### Changeset 002: Create Email Index (2024)

**Purpose**: Improve query performance for email lookups

**Changes**:
```sql
CREATE INDEX idx_employees_email ON employees(email);
```

**Benefits**:
- Faster email uniqueness validation
- Improved search performance
- Better database query optimization

**Status**: ✅ Executed after table creation

---

### Changeset 003: Insert Sample Data (2024)

**Purpose**: Populate database with sample employees for testing

**Sample Data Inserted**:

1. **John Doe**
   - Email: john.doe@example.com
   - Position: Senior Developer
   - Department: Engineering
   - Salary: $120,000
   - Hire Date: 2020-01-15

2. **Jane Smith**
   - Email: jane.smith@example.com
   - Position: Product Manager
   - Department: Product
   - Salary: $110,000
   - Hire Date: 2021-03-20

3. **Michael Johnson**
   - Email: michael.johnson@example.com
   - Position: DevOps Engineer
   - Department: Infrastructure
   - Salary: $115,000
   - Hire Date: 2019-07-10

**Status**: ✅ Executed on first startup

---

## Database Schema Diagram

```
┌─────────────────────────────────────┐
│           EMPLOYEES                 │
├─────────────────────────────────────┤
│ id (PK)           │ BIGINT          │
│ first_name        │ VARCHAR(100)    │
│ last_name         │ VARCHAR(100)    │
│ email (UNIQUE)    │ VARCHAR(255)    │
│ phone             │ VARCHAR(20)     │
│ position          │ VARCHAR(100)    │
│ department        │ VARCHAR(100)    │
│ salary            │ DECIMAL(10,2)   │
│ hire_date         │ DATE            │
│ created_at        │ TIMESTAMP       │
│ updated_at        │ TIMESTAMP       │
├─────────────────────────────────────┤
│ Indexes:                            │
│ • PRIMARY KEY (id)                  │
│ • UNIQUE (email)                    │
│ • idx_employees_email               │
└─────────────────────────────────────┘
```

## Liquibase Tracking Table

Liquibase automatically creates and maintains a `DATABASECHANGELOG` table to track executed changesets:

```
DATABASECHANGELOG:
├── ID                  (Changeset ID)
├── AUTHOR             (Author name)
├── FILENAME           (Changelog file)
├── DATEEXECUTED       (Execution timestamp)
├── ORDEREXECUTED      (Execution order)
├── EXECTYPE           (EXECUTED/SKIPPED/RERAN/etc)
├── DESCRIPTION        (Changeset description)
└── CHECKSUM           (File integrity hash)
```

## Verification

### Check Applied Changesets

Access H2 Console at `http://localhost:8080/h2-console`:

```sql
SELECT * FROM DATABASECHANGELOG;
```

### Check Employee Data

```sql
SELECT * FROM employees;
SELECT COUNT(*) FROM employees;
```

### Check Indexes

```sql
SELECT * FROM INFORMATION_SCHEMA.INDEXES WHERE TABLE_NAME = 'EMPLOYEES';
```

## Future Changes

To add new database changes:

1. Create a new changeset in `db.changelog-master.xml`:
```xml
<changeSet id="004-your-change" author="your-name">
  <!-- Your changes here -->
</changeSet>
```

2. Restart the application
3. Liquibase will automatically apply the new changeset

## Important Notes

- **H2 Database**: This is an in-memory database. Data is lost when the application stops.
- **For Production**: Replace H2 with PostgreSQL, MySQL, or other persistent databases.
- **Backup**: Always backup your database before applying new changesets.
- **Testing**: Test changelog updates in a development environment first.

## Rollback Procedure

To rollback to a previous state (if needed):

1. Stop the application
2. Remove the changeset from the XML file
3. Delete the corresponding row from `DATABASECHANGELOG` table
4. Restart the application

**Note**: For in-memory H2 database, simply restarting will reset the database.

---

**Last Updated**: 2024
**Database**: H2 (POC) | Compatible with: PostgreSQL, MySQL, SQL Server, Oracle
