import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { BASE_URL } from './utils';

   

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // agar cookie refresh token terkirim saat /token
});

// Middleware Request: Sisipkan token & refresh jika perlu
api.interceptors.request.use(async (config) => {
  let token = localStorage.getItem('accessToken');
  
  if (token) {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      try {
        const response = await axios.get(`${BASE_URL}/token`, {
          withCredentials: true
        });
        token = response.data.accessToken;
        localStorage.setItem('accessToken', token);
      } catch (error) {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// Middleware Response: handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
