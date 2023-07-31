import { axiosPublic } from '../utils/axios';
import { APIRoutes } from '../utils/APIRoutes';
import { AuthState } from '../redux/reducers/authSlice';

interface RefreshRes {
  data: {
    accessToken: string;
  };
}

const refreshToken = async (): Promise<string> => {
  const res = await axiosPublic
    .get<any, RefreshRes>(APIRoutes.REFRESH)
    .then((res) => res.data.accessToken);
  const user: AuthState = JSON.parse(sessionStorage.getItem('user') as string);
  user.accessToken = res;
  sessionStorage.setItem('user', JSON.stringify(user));
  return res;
};

export default refreshToken;
