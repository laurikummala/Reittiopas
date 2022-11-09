import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'
import reittiReducer from '../features/reitit/reittiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    reitit: reittiReducer,
  },
});
