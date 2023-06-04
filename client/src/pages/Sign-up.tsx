import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { ToastContainer, ToastOptions, toast } from 'react-toastify';
import { login, signup, logout } from '../redux/thunks';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import 'react-toastify/ReactToastify.css';
import spiral from '../assets/logo-spiral.png';
import chatBubble from '../assets/chatbubble.png';

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector((state) => state.auth.loading);

  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleValidation = () => {
    console.log('inside validation');
    const { password, confirmPassword, username, email } = input;
    if (username.length < 3) {
      toast.error('Username should be greater than 3 characters.', toastOptions);
      return false;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
      toast.error('Invalid e-mail.', toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error('Password should be equal or greater than 8 characters.', toastOptions);
      return false;
    } else if (password !== confirmPassword) {
      toast.error('Password confirmation does not match!', toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleValidation()) {
      const data = (({ username, email, password }) => ({ username, email, password }))(input);
      dispatch(signup(data))
        .unwrap()
        .then((status) => {
          if (status === 200) navigate('login');
        });
    }
  };

  const toastOptions: ToastOptions = {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  };

  return (
    <>
      <AuthContainer>
        <form
          //Stop google API from interfering with validation
          noValidate
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="logo-wrapper">
            <img
              src={spiral}
              alt="spiral"
            />
            <img
              className="chat-icon"
              src={chatBubble}
              alt="chat-icon"
            />
            <h1>ChitChAt</h1>
          </div>

          <input
            type="text"
            placeholder="Username"
            name="username"
            value={input.username}
            onChange={(e) => handleChange(e)}
            autoFocus
          />

          <input
            type="email"
            placeholder="E-mail address"
            name="email"
            value={input.email}
            onChange={(e) => handleChange(e)}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={input.password}
            onChange={(e) => handleChange(e)}
          />

          <input
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">CREATE ACCOUNT</button>
          <span>
            Already have an account? <Link to="/login">LOGIN</Link>
          </span>
        </form>
      </AuthContainer>
      <ToastContainer />
    </>
  );
};

export default SignUp;

const AuthContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('/src/assets/form-bg.svg');
  /* background by SVGBackgrounds.com */
  background-repeat: no-repeat;
  background-size: cover;
  .logo-wrapper {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    &:hover > img:first-of-type {
      rotate: 360deg;
    }
    img:first-of-type {
      height: 6rem;
      transition: rotate 3s;
    }
    h1 {
      font-family: var(--ms-family);
      color: #ffffff;
      cursor: default;
    }
    .chat-icon {
      position: absolute;
      height: 2rem;
      left: 38px;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 2.5rem 4.5rem;
    border-radius: 3rem;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(110px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
    input {
      width: 100%;
      color: #ffffff;
      border: 1px solid #64c1bacf;
      padding: 0.5rem 0 0.5rem 1rem;
      border-radius: 0.5rem;
      outline: none;
      background: transparent;
      transition: all 0.5s;
      &::placeholder {
        color: rgba(255, 255, 255, 0.8);
        font-weight: 100;
      }
      &:focus {
        border: 1px solid #ffffff;
      }
    }
    button {
      background-color: var(--light-green);
      color: #ffffff;
      padding: 0.8rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.5rem;
      transition: all 0.5s;
      &:hover {
        background-color: #ffffff;
        color: var(--light-green);
      }
    }
    span {
      color: #ffffff;
      text-align: center;
      a {
        color: var(--light-green);
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;
