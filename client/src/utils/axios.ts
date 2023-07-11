import axios from 'axios';
import { APIRoutes } from './APIRoutes';
import refreshToken from './refreshToken';

export const axiosPublic = axios.create({
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
    const token = sessionStorage.getItem('accessToken');
    console.log('in request interceptor', token);
    if (token && !request.headers['X-Access-Token']) {
      request.headers['X-Access-Token'] = token;
      console.log('logging header', request.headers['x-Access-Token']);
    }
    return request;
  },
  (e) => Promise.reject(e)
);

axiosPrivate.interceptors.response.use(
  (res) => res,
  async (e) => {
    const originalReq = e.config;
    if (originalReq.status === 401) {
      try {
        const newToken = await refreshToken();
        console.log('this request took me to response interceptor', newToken);
        originalReq.headers['X-Access-Token'] = newToken;
        return axiosPrivate(originalReq);
      } catch (err) {
        return console.log(err);
      }
    }
    return Promise.reject(e);
  }
);

export { axiosPrivate };
