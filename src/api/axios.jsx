import axios from 'axios';

const api = axios.create({
baseURL:'http://16.16.24.28:2000/',   // <- Use relative paths so Nginx proxy works
  withCredentials: true,
});

export default api;
