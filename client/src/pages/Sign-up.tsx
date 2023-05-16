import { useState } from 'react';

const SignUp: React.FC = () => {
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ [name]: value, ...input });
  };
  return (
    <>
      <div className="card-form">
        <span className="icon">
          <i className="fa-solid fa-dove fa-beat-fade fa-4x"></i>
        </span>
        <h2>ChitChat</h2>
        <form className="form">
          <div className="form-item">
            <input
              className="input"
              type="text"
              placeholder="Username"
              name="username"
              value={input.username}
              onChange={(e) => handleChange(e)}
              autoFocus
            />
          </div>
          <div className="form-item">
            <input
              className="input"
              type="email"
              placeholder="E-mail address"
              name="email"
              value={input.email}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-item">
            <input
              className="input"
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-item">
            <input
              className="input"
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-item btn-wrapper">
            <button
              className="btn"
              type="submit"
            >
              SIGN UP
            </button>
          </div>
        </form>
        <p>ⓒBark, bork, bjork</p>
      </div>
    </>
  );
};

export default SignUp;
