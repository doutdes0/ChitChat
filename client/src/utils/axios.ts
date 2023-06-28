import axios from 'axios';
import { APIRoutes } from './APIRoutes';
import { useAppSelector } from '../hooks/useRedux';
import useRefreshToken from '../hooks/useRefreshToken';

export const axiosPublic = axios.create({
  baseURL: APIRoutes.HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosPrivate = axios.create({
  baseURL: APIRoutes.HOST,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = useAppSelector((state) => state.auth.accessToken);
    if (token) {
      config.headers['x-access-token'] = token;
    }
    return config;
  },
  (e) => Promise.reject(e)
);

axiosPrivate.interceptors.response.use(
  (res) => res,
  async (e) => {
    const prevReq = e.config;
    if (e.response.status === 401 && !prevReq._retry) {
      prevReq._retry = true;

      try {
        useRefreshToken();
        return axiosPrivate(prevReq);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(e);
  }
);
