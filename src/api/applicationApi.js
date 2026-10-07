import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const getApplications = () => axios.get(BASE_URL, authHeader());

export const createApplication = (payload) => axios.post(BASE_URL, payload, authHeader());

export const updateApplication = (id, payload) => axios.put(`${BASE_URL}/${id}`, payload, authHeader());

export const deleteApplication = (id) => axios.delete(`${BASE_URL}/${id}`, authHeader());