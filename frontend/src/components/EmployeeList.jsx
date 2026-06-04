import React from 'react';
import '../styles/EmployeeList.css';

const EmployeeList = ({ employees, onDelete, loading }) => {
  if (loading) {
    return <div className="loading">Loading employees...</div>;
  }

  if (!employees || employees.length === 0) {
    return <div className="no-data">No employees found</div>;
  }

  return (
    <div className="employee-list-container">
      <div className="table-responsive">
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Position</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Hire Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.phone || '-'}</td>
                <td>{employee.position}</td>
                <td>
                  <span className="badge">{employee.department}</span>
                </td>
                <td>${parseFloat(employee.salary).toLocaleString()}</td>
                <td>{new Date(employee.hireDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(employee.id)}
                    title="Delete employee"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
