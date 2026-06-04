import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmployeeList from './EmployeeList';

jest.mock('../styles/EmployeeList.css', () => ({}));

describe('EmployeeList', () => {
  const mockOnDelete = jest.fn();

  const sampleEmployees = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '555-0100',
      position: 'Engineer',
      department: 'Engineering',
      salary: 85000,
      hireDate: '2023-01-15',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      phone: null,
      position: 'Manager',
      department: 'Product',
      salary: 95000,
      hireDate: '2024-06-01',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading message when loading', () => {
    render(<EmployeeList employees={[]} onDelete={mockOnDelete} loading={true} />);

    expect(screen.getByText(/loading employees/i)).toBeInTheDocument();
  });

  it('should show no data message when employees list is empty', () => {
    render(<EmployeeList employees={[]} onDelete={mockOnDelete} loading={false} />);

    expect(screen.getByText(/no employees found/i)).toBeInTheDocument();
  });

  it('should show no data message when employees is null', () => {
    render(<EmployeeList employees={null} onDelete={mockOnDelete} loading={false} />);

    expect(screen.getByText(/no employees found/i)).toBeInTheDocument();
  });

  it('should render employee table with data', () => {
    render(<EmployeeList employees={sampleEmployees} onDelete={mockOnDelete} loading={false} />);

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
  });

  it('should render table headers', () => {
    render(<EmployeeList employees={sampleEmployees} onDelete={mockOnDelete} loading={false} />);

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Position')).toBeInTheDocument();
    expect(screen.getByText('Department')).toBeInTheDocument();
    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('Hire Date')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('should display dash for null phone', () => {
    render(<EmployeeList employees={sampleEmployees} onDelete={mockOnDelete} loading={false} />);

    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('should call onDelete when delete button is clicked', () => {
    render(<EmployeeList employees={sampleEmployees} onDelete={mockOnDelete} loading={false} />);

    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it('should render multiple rows for multiple employees', () => {
    render(<EmployeeList employees={sampleEmployees} onDelete={mockOnDelete} loading={false} />);

    const deleteButtons = screen.getAllByText('Delete');
    expect(deleteButtons).toHaveLength(2);
  });

  it('should format salary with dollar sign', () => {
    render(<EmployeeList employees={sampleEmployees} onDelete={mockOnDelete} loading={false} />);

    expect(screen.getByText('$85,000')).toBeInTheDocument();
  });
});
