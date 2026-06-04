import React, { useState, useEffect, useCallback } from 'react';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';
import Pagination from '../components/Pagination';
import { employeeService } from '../services/employeeService';
import { useNotification } from '../hooks/useNotification';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy] = useState('id');
  const [sortDirection] = useState('ASC');
  const { successMessage, errorMessage, showSuccess, showError } = useNotification();

  const loadEmployees = useCallback(async () => {
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
    } catch (error) {
      console.error('Error loading employees:', error);
      showError('Failed to load employees. Please try again.');
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, sortBy, sortDirection, showError]);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  const handleAddEmployee = async (employeeData) => {
    try {
      await employeeService.createEmployee(employeeData);
      showSuccess('Employee added successfully!');
      setCurrentPage(0);
      await loadEmployees();
    } catch (error) {
      console.error('Error adding employee:', error);
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to add employee. Please check the data and try again.');
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeService.deleteEmployee(id);
        showSuccess('Employee deleted successfully!');
        await loadEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
        showError('Failed to delete employee. Please try again.');
      }
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Employee Directory</h1>
        <p className="subtitle">Add, view, and manage your team</p>
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
