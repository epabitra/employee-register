import axios from 'axios';
import { employeeService } from './employeeService';

jest.mock('axios', () => {
  const instance = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  };
  return {
    create: jest.fn(() => instance),
    __instance: instance,
  };
});

const mockAxios = axios.__instance;

describe('employeeService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const sampleEmployee = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '555-0100',
    position: 'Engineer',
    department: 'Engineering',
    salary: 85000,
    hireDate: '2023-01-15',
  };

  describe('createEmployee', () => {
    it('should POST to the base URL with employee data', async () => {
      mockAxios.post.mockResolvedValue({ data: sampleEmployee });

      const result = await employeeService.createEmployee(sampleEmployee);

      expect(mockAxios.post).toHaveBeenCalledWith('', sampleEmployee);
      expect(result.data).toEqual(sampleEmployee);
    });
  });

  describe('getAllEmployees', () => {
    it('should GET with default pagination params', async () => {
      const pageData = { content: [sampleEmployee], totalPages: 1 };
      mockAxios.get.mockResolvedValue({ data: pageData });

      const result = await employeeService.getAllEmployees();

      expect(mockAxios.get).toHaveBeenCalledWith('', {
        params: { page: 0, size: 10, sortBy: 'id', direction: 'ASC' },
      });
      expect(result.data.content).toHaveLength(1);
    });

    it('should GET with custom pagination params', async () => {
      mockAxios.get.mockResolvedValue({ data: { content: [], totalPages: 0 } });

      await employeeService.getAllEmployees(2, 5, 'name', 'DESC');

      expect(mockAxios.get).toHaveBeenCalledWith('', {
        params: { page: 2, size: 5, sortBy: 'name', direction: 'DESC' },
      });
    });
  });

  describe('getEmployeeById', () => {
    it('should GET the employee by ID', async () => {
      mockAxios.get.mockResolvedValue({ data: sampleEmployee });

      const result = await employeeService.getEmployeeById(1);

      expect(mockAxios.get).toHaveBeenCalledWith('/1');
      expect(result.data).toEqual(sampleEmployee);
    });
  });

  describe('updateEmployee', () => {
    it('should PUT with updated data', async () => {
      const updated = { ...sampleEmployee, firstName: 'Jane' };
      mockAxios.put.mockResolvedValue({ data: updated });

      const result = await employeeService.updateEmployee(1, updated);

      expect(mockAxios.put).toHaveBeenCalledWith('/1', updated);
      expect(result.data.firstName).toBe('Jane');
    });
  });

  describe('deleteEmployee', () => {
    it('should DELETE the employee by ID', async () => {
      mockAxios.delete.mockResolvedValue({ status: 204 });

      const result = await employeeService.deleteEmployee(1);

      expect(mockAxios.delete).toHaveBeenCalledWith('/1');
      expect(result.status).toBe(204);
    });
  });
});
