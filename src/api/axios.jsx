import axios from 'axios';

const api = axios.create({
  baseURL: '/api',   // relative path for hosting
  withCredentials: true,
});

export default api;
