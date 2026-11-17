import axios from 'axios';
import { clearSession, getSession } from '../helpers/session';

const instance = axios.create({
  baseURL: '/',
});

instance.interceptors.request.use(
  (config) => {
    const session = getSession();

    if (session?.token) {
      config.headers.Authorization = `Bearer ${session.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    const isLoginRequest = error.config?.url?.includes('/auth/');

    if (error.response?.status === 401 && !isLoginRequest) {
      const isAdminArea = window.location.pathname.startsWith('/admin');

      clearSession();
      window.location.href = isAdminArea ? '/admin/login' : '/login';
    }

    return Promise.reject(error);
  }
);

export { instance };
