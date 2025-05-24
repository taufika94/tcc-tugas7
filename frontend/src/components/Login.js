import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { BASE_URL } from '../utils';
import api from "../api"

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

   const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      const response = await api.post(
        `${BASE_URL}/login`,
        { email, password },
        { withCredentials: true }
      );

      const accessToken = response?.data.accessToken;
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        navigate('/notes');
      } else {
        setError('Login successful but token is missing.');
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || 'Invalid email or password';
      setError(message);
      console.error('Login error:', err);
    }
  };

  return (
    <LoginContainer>
      <h2 className="title is-2">Login</h2>
      {error && <div className="notification is-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
        </div>
        <div className="field">
          <button type="submit" className="button is-primary is-fullwidth">
            Login
          </button>
        </div>
      </form>
      <p className="has-text-centered">
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </LoginContainer>
  );
};

export default Login;