import axios from 'axios';

// Hapa unaweza kuweka URL ya base yako
const api = axios.create({
  baseURL: 'http://localhost:8000/api/', 
});

// Interceptor kwa ajili ya kuongeza token ya JWT kwenye kila request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');  // Token kutoka localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Token itajumuishwa kwenye header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Hii ni default export ya api
export default api;
