import axios from 'axios';

const api = axios.create({
  baseURL: '/api',   // <- Use relative paths so Nginx proxy works
  withCredentials: true,
});

export default api;
