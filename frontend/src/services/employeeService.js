import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/employees';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const employeeService = {
  createEmployee: (employeeData) =>
    axiosInstance.post('', employeeData),

  getAllEmployees: (page = 0, size = 10, sortBy = 'id', direction = 'ASC') =>
    axiosInstance.get('', {
      params: { page, size, sortBy, direction },
    }),

  getEmployeeById: (id) =>
    axiosInstance.get(`/${id}`),

  updateEmployee: (id, employeeData) =>
    axiosInstance.put(`/${id}`, employeeData),

  deleteEmployee: (id) =>
    axiosInstance.delete(`/${id}`),
};

export default axiosInstance;
