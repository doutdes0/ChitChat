import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import { setAuth } from '../redux/reducers/authSlice';

type Props = {
  children: JSX.Element;
};

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      dispatch(setAuth(JSON.parse(sessionStorage.getItem('user')!)));
    } else {
      navigate('/login');
    }
  }, [token]);

  return children;
};

export default PrivateRoute;
