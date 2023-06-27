import { Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat';
import Login from './pages/Login';
import SignUp from './pages/Sign-up';
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
    </Routes>
  );
};

export default App;
