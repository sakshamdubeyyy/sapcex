import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store';
import LaunchesList from './components/LaunchesList';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import Login from './components/Login';
import Signup from './components/Signup';
import { login, logout } from './features/auth/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Provider store={store}>
      <div className="bg-gray-900 text-gray-100 min-h-screen">
        <Router>
          <div className="max-w-5xl mx-auto px-4">
            <header className="flex justify-between items-center py-4">
              <Link to="/launches" className="text-xl font-bold">SpaceX Launches</Link>
              <div>
                {!isAuthenticated && (
                  <>
                    <Link to="/login" className="px-3 py-1 bg-blue-500 text-white rounded mr-2">Login</Link>
                    <Link to="/signup" className="px-3 py-1 bg-blue-500 text-white rounded">Signup</Link>
                  </>
                )}
                {isAuthenticated && (
                  <button onClick={handleLogout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
                )}
              </div>
            </header>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/launches" element={
                <>
                  <SearchBar />
                  <Filter />
                  <LaunchesList />
                </>
              } />
              <Route path="*" element={<Navigate to="/launches" />} />
            </Routes>
          </div>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
