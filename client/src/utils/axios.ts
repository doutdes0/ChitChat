import axios from 'axios';
import { APIRoutes } from './APIRoutes';

export default axios.create({
  baseURL: APIRoutes.HOST,
});
