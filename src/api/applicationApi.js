import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create();

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const getApplications = () => api.get(BASE_URL);

export const createApplication = (payload) => api.post(BASE_URL, payload);

export const updateApplication = (id, payload) => api.put(`${BASE_URL}/${id}`, payload);

export const deleteApplication = (id) => api.delete(`${BASE_URL}/${id}`);