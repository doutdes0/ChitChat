import { axiosPublic } from '../utils/axios';
import { APIRoutes } from '../utils/APIRoutes';

interface RefreshRes {
  data: {
    token: string;
  };
}

const refreshToken = () => {
  const refresh = async (): Promise<string> => {
    const res = await axiosPublic
      .get<any, RefreshRes>(APIRoutes.REFRESH, {
        withCredentials: true,
      })
      .then((res) => res.data.token);
    sessionStorage.setItem('accessToken', res);
    return res;
  };

  return refresh;
};

export default refreshToken;
