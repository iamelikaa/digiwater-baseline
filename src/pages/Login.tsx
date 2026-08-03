import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/overview');
  };

  const handleForgotPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };

  return (
    <div className="login-page">
      <Card className="login-card">
        <header className="login-header">
          <div className="login-logo">
            <div className="app-mark" aria-hidden="true">DW</div>
            <span className="app-wordmark">DigiWater</span>
          </div>
          <h1 className="login-title">Water Network Monitoring System</h1>
          <p className="login-subtitle">Authorized access for operators and analysts</p>
        </header>

        <hr className="login-divider" />

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              USERNAME
            </label>
            <div className="input-wrapper">
              <span className="input-icon" aria-hidden="true">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="11" cy="11" r="11" fill="#94A3B8" />
                  <circle cx="11" cy="8.5" r="3.2" fill="white" />
                  <path
                    d="M5.5 17.8C6.5 15.3 8.6 14.5 11 14.5C13.4 14.5 15.5 15.3 16.5 17.8"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <input
                id="username"
                name="username"
                type="text"
                className="form-input"
                placeholder="Type here..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              PASSWORD
            </label>
            <div className="input-wrapper">
              <span className="input-icon" aria-hidden="true">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3.5"
                    y="8.5"
                    width="13"
                    height="9"
                    rx="2.5"
                    stroke="#94A3B8"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M6.5 8.5V6C6.5 4.067 8.067 2.5 10 2.5C11.933 2.5 13.5 4.067 13.5 6V8.5"
                    stroke="#94A3B8"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <input
                id="password"
                name="password"
                type="password"
                className="form-input"
                placeholder="Type here..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="login-submit-btn">
            Sign in
          </button>
        </form>

        <div className="login-footer">
          <a
            href="#forgot-password"
            onClick={handleForgotPassword}
            className="forgot-password-link"
          >
            Forgot password?
          </a>
        </div>
      </Card>
    </div>
  );
};

export default Login;
