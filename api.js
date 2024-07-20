import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000', 
});

export const getEmployees = () => api.get('/employees');
export const createEmployee = (employee) => api.post('/employees', employee);
export const updateEmployee = (id, employee) => api.put('/employees/<id>', employee);

export default api;
