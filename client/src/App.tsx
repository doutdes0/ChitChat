import { Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat';
import Login from './pages/Login';
import SignUp from './pages/Sign-up';

const App: React.FC = () => {
  return (
    <Routes>
      <Route
        path="sign-up"
        element={<SignUp />}
      />
      <Route
        path="login"
        element={<Login />}
      />
      <Route
        path="/"
        element={<Chat />}
      />
    </Routes>
  );
};

export default App;
