import { configureStore } from '@reduxjs/toolkit';
import launchesReducer from './features/launches/launchesSlice';
import authReducer from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    launches: launchesReducer,
    auth: authReducer,
  },
});
