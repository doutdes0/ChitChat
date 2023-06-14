import axios from 'axios';
import { APIRoutes } from './APIRoutes';

export default axios.create({
  baseURL: APIRoutes.HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});
