import axios from 'axios';

import { API_URL } from '../config';
import { createBrowserHistory } from 'history';
import { toast } from 'react-toastify';

const myHistory = createBrowserHistory({ window });

const client = axios.create({
  baseURL: API_URL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (!error.response) {
      throw new Error('Error Connection');
    }
    console.log(error);
    if (error.response.status === 401 || error.response.status === 414) {
      toast.error(error.response.data.message);
      setTimeout(() => {
        window.localStorage.clear();
        myHistory.replace(`/`); // Usage example.
        window.location.reload();
      }, 1000);
    }
    return Promise.reject(error.response.data);
  }
);

export default client;

export const setAuthToken = (token) => {
  client.defaults.headers.common['Authorization'] = '';
  delete client.defaults.headers.common['Authorization'];
  if (token) {
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};
