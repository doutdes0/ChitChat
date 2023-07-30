import axios from 'axios';
import { APIRoutes } from './APIRoutes';
import refreshToken from './refreshToken';

const axiosPublic = axios.create({
  withCredentials: true,
  baseURL: APIRoutes.HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosPrivate = axios.create({
  baseURL: APIRoutes.HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosPrivate.interceptors.request.use(
  (request) => {
    const { accessToken: token } = JSON.parse(sessionStorage.getItem('user')!);
    if (token) {
      request.headers['x-access-token'] = token;
    }
    return request;
  },
  (e) => Promise.reject(e)
);

axiosPrivate.interceptors.response.use(
  (res) => res,
  async (e) => {
    const originalReq = e.config;
    if (e.request.status === 401 || e.request.status === 403) {
      try {
        const newToken = await refreshToken();
        if (newToken) {
          originalReq.headers['x-access-token'] = newToken;
        } else {
          return Promise.reject(e);
        }
        return axiosPrivate(originalReq);
      } catch (err) {
        return console.log(err);
      }
    }
    return Promise.reject(e);
  }
);

export { axiosPrivate, axiosPublic };
