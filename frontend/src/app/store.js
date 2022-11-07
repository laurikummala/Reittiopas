import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import reittiReducer from '../features/reitit/reittiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reitit: reittiReducer,
  },
})

// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from '../features/auth/authSlice'
// import reittiReducer from '../features/reitit/reittiSlice'

// export const store = configureStore({
//     reducer:{
//         auth: authReducer,
//         reitit: reittiReducer
//     },
// })