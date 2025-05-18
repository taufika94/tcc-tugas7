import axios from 'axios';
import { BASE_URL } from './utils';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response?.status === 401) {
    // Handle token expiration or unauthorized access
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

export default api;