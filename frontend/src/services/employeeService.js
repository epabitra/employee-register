import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/employees';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { data, status } = error.response;
      const message =
        data?.message ||
        (data?.errors?.length ? data.errors.join(', ') : null) ||
        `Request failed with status ${status}`;

      const enriched = new Error(message);
      enriched.status = status;
      enriched.errors = data?.errors || [];
      return Promise.reject(enriched);
    }

    if (error.request) {
      return Promise.reject(
        new Error('Unable to reach the server. Please check your connection.')
      );
    }

    return Promise.reject(error);
  }
);

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
