import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import kommenttiReducer from '../features/kommentit/kommenttiSlice'
import reittiReducer from '../features/reitit/reittiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    kommentit: kommenttiReducer,
    reitit: reittiReducer,
  },
});
