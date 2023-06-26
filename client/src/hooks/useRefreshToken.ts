import { useAppDispatch } from './useRedux';
import { setAccessToken } from '../redux/reducers/authSlice';
import { axiosPublic } from '../utils/axios';
import { APIRoutes } from '../utils/APIRoutes';

const useRefreshToken = () => {
  const dispatch = useAppDispatch();

  const token = async () => {
    const res = await axiosPublic.get(APIRoutes.REFRESH, {
      withCredentials: true,
    });
    return res.data.token;
  };
  dispatch(setAccessToken(token));
};

export default useRefreshToken;
