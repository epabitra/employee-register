import React, { useState, useEffect } from 'react';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';
import Pagination from '../components/Pagination';
import { employeeService } from '../services/employeeService';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy] = useState('id');
  const [sortDirection] = useState('ASC');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadEmployees();
  }, [currentPage, pageSize]);

  const loadEmployees = async () => {
    setLoading(true);
    try {
      const response = await employeeService.getAllEmployees(
        currentPage,
        pageSize,
        sortBy,
        sortDirection
      );
      setEmployees(response.data.content);
      setTotalPages(response.data.totalPages);
      setErrorMessage('');
    } catch (error) {
      console.error('Error loading employees:', error);
      setErrorMessage(error.message || 'Failed to load employees. Please try again.');
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async (employeeData) => {
    try {
      await employeeService.createEmployee(employeeData);
      setSuccessMessage('Employee added successfully!');
      setErrorMessage('');
      setCurrentPage(0);
      await loadEmployees();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error adding employee:', error);
      throw error;
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeService.deleteEmployee(id);
        setSuccessMessage('Employee deleted successfully!');
        setErrorMessage('');
        await loadEmployees();
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting employee:', error);
        setErrorMessage(error.message || 'Failed to delete employee. Please try again.');
        setTimeout(() => setErrorMessage(''), 5000);
      }
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Employee Management System</h1>
        <p className="subtitle">Manage your employees with ease</p>
      </div>

      {successMessage && (
        <div className="alert alert-success">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="alert alert-error">
          {errorMessage}
        </div>
      )}

      <div className="dashboard-content">
        <div className="form-section">
          <EmployeeForm onSubmit={handleAddEmployee} />
        </div>

        <div className="list-section">
          <div className="section-header">
            <h2>Employee Directory</h2>
            <span className="employee-count">
              {loading ? 'Loading...' : `${employees.length} employees`}
            </span>
          </div>
          <EmployeeList
            employees={employees}
            onDelete={handleDeleteEmployee}
            loading={loading}
          />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
