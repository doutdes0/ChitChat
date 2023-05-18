import { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import logo from '../assets/logo.png';

const SignUp: React.FC = () => {
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <AuthContainer>
        <div className="form-wrapper">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="logo-wrapper">
              <img
                src={logo}
                alt="logo"
              />
              <h2>CHITCHAT</h2>
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
            <button type="submit">SUBMIT</button>
            <span>
              Already have an account? <Link to="/login">LOGIN</Link>
            </span>
          </form>
        </div>
      </AuthContainer>
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
  gap: 1rem;
  background: var(--black);
  .logo-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    img {
      height: 5rem;
    }
    h2 {
      color: #ffffff;
    }
  }
  .form-wrapper {
    background-image: url('/src/assets/form-bg.svg');
    /* background by SVGBackgrounds.com */
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 3rem;
    box-shadow: 0px 0px 7px 5px rgba(29, 117, 94, 0.75) inset;
    opacity: 0.999; //keeps backdrop-blur + border-radius from bluring bg inside wrapper
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 3rem 5rem;
    border-radius: 3rem;
    background: rgba(0, 0, 0, 0.25);
    -weblit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
`;
