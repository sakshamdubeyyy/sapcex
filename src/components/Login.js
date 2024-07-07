import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login action (could involve API call in real scenario)
    if (username === auth.user.username && password === auth.user.password) {
      dispatch(login({ username, password }));
      setSuccessMessage('Login successful');
      setTimeout(() => {
        navigate('/');
      }, 2000); // Redirect after 2 seconds
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-3 py-2 border rounded bg-gray-800 text-gray-100 placeholder-gray-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-3 py-2 border rounded bg-gray-800 text-gray-100 placeholder-gray-400"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
