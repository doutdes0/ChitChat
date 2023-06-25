import { useAppSelector } from '../hooks/useRedux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type Props = {
  children: JSX.Element;
};

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.accessToken);
  useEffect(() => {
    if (!token) navigate('/login');
  });

  return children;
};

export default PrivateRoute;
