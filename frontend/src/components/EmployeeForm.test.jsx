import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EmployeeForm from './EmployeeForm';

// Mock the CSS import
jest.mock('../styles/EmployeeForm.css', () => ({}));

describe('EmployeeForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all form fields', () => {
    render(<EmployeeForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/position/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/department/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/salary/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/hire date/i)).toBeInTheDocument();
  });

  it('should render with initial data when provided', () => {
    const initialData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '555-0100',
      position: 'Engineer',
      department: 'Engineering',
      salary: '85000',
      hireDate: '2023-01-15',
    };

    render(<EmployeeForm onSubmit={mockOnSubmit} initialData={initialData} />);

    expect(screen.getByDisplayValue('John')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
  });

  it('should show error when submitting with empty required fields', async () => {
    render(<EmployeeForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: /add employee/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please fill in all required fields/i)).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should show error for invalid email', async () => {
    render(<EmployeeForm onSubmit={mockOnSubmit} />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/email/i), 'invalid-email');
    await user.type(screen.getByLabelText(/position/i), 'Engineer');
    await user.selectOptions(screen.getByLabelText(/department/i), 'Engineering');
    await user.type(screen.getByLabelText(/salary/i), '85000');
    await user.type(screen.getByLabelText(/hire date/i), '2023-01-15');

    const submitButton = screen.getByRole('button', { name: /add employee/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('should show error for invalid salary', async () => {
    render(<EmployeeForm onSubmit={mockOnSubmit} />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/position/i), 'Engineer');
    await user.selectOptions(screen.getByLabelText(/department/i), 'Engineering');
    await user.type(screen.getByLabelText(/salary/i), '-100');
    await user.type(screen.getByLabelText(/hire date/i), '2023-01-15');

    const submitButton = screen.getByRole('button', { name: /add employee/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid salary/i)).toBeInTheDocument();
    });
  });

  it('should call onSubmit with form data on valid submission', async () => {
    mockOnSubmit.mockResolvedValue();
    render(<EmployeeForm onSubmit={mockOnSubmit} />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/phone/i), '555-0100');
    await user.type(screen.getByLabelText(/position/i), 'Engineer');
    await user.selectOptions(screen.getByLabelText(/department/i), 'Engineering');
    await user.type(screen.getByLabelText(/salary/i), '85000');
    await user.type(screen.getByLabelText(/hire date/i), '2023-01-15');

    const submitButton = screen.getByRole('button', { name: /add employee/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
        })
      );
    });
  });

  it('should reset form after successful submission', async () => {
    mockOnSubmit.mockResolvedValue();
    render(<EmployeeForm onSubmit={mockOnSubmit} />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/position/i), 'Engineer');
    await user.selectOptions(screen.getByLabelText(/department/i), 'Engineering');
    await user.type(screen.getByLabelText(/salary/i), '85000');
    await user.type(screen.getByLabelText(/hire date/i), '2023-01-15');

    const submitButton = screen.getByRole('button', { name: /add employee/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByLabelText(/first name/i)).toHaveValue('');
    });
  });

  it('should show error message when onSubmit throws', async () => {
    mockOnSubmit.mockRejectedValue(new Error('Server error'));
    render(<EmployeeForm onSubmit={mockOnSubmit} />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/position/i), 'Engineer');
    await user.selectOptions(screen.getByLabelText(/department/i), 'Engineering');
    await user.type(screen.getByLabelText(/salary/i), '85000');
    await user.type(screen.getByLabelText(/hire date/i), '2023-01-15');

    const submitButton = screen.getByRole('button', { name: /add employee/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/server error/i)).toBeInTheDocument();
    });
  });

  it('should update form field values on change', async () => {
    render(<EmployeeForm onSubmit={mockOnSubmit} />);

    const user = userEvent.setup();
    const firstNameInput = screen.getByLabelText(/first name/i);
    await user.type(firstNameInput, 'Alice');

    expect(firstNameInput).toHaveValue('Alice');
  });
});
