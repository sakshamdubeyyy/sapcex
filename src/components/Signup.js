import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    dispatch(signup({ username, password }));
    setSuccessMessage("Sign up successful");
    setTimeout(() => {
      navigate('/login');
    }, 2000); 
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <form onSubmit={handleSignup} className="flex flex-col space-y-4">
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="px-3 py-2 border rounded bg-gray-800 text-gray-100 placeholder-gray-400"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
