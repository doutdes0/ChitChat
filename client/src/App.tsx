import { Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat';
import Login from './pages/Login';
import SignUp from './pages/Sign-up';
import SetAvatar from './pages/SetAvatar';
import PrivateRoute from './components/PrivateRoute';
import './styles/index.css';

const App: React.FC = () => {
  return (
    <Routes>
      <Route
        path="signup"
        element={<SignUp />}
      />
      <Route
        path="login"
        element={<Login />}
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        }
      />
      <Route
        path="setAvatar"
        element={
          <PrivateRoute>
            <SetAvatar />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
