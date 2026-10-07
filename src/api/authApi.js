import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL.replace('/applications', '/auth');

export const signup = (email, password) => axios.post(`${BASE_URL}/signup`, { email, password });

export const login = (email, password) => axios.post(`${BASE_URL}/login`, { email, password });