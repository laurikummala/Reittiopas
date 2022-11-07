import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import reittiService from './reittiService'

const initialState = {
  reitit: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new reitti
export const createReitti = createAsyncThunk(
  'reitit/create',
  async (reittiData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await reittiService.createReitti(reittiData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user goals
export const getReitit = createAsyncThunk(
  'reitit/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await reittiService.getreitit(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user goal
export const deleteReitti = createAsyncThunk(
  'reitit/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await reittiService.deleteReitti(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const reittiSlice = createSlice({
  name: 'reitti',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReitti.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createReitti.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.reitit.push(action.payload)
      })
      .addCase(createReitti.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getReitit.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getReitit.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.reitit = action.payload
      })
      .addCase(getReitit.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteReitti.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteReitti.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.reitit = state.reitit.filter(
          (reitti) => reitti._id !== action.payload.id
        )
      })
      .addCase(deleteReitti.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = reittiSlice.actions
export default reittiSlice.reducer

// import axios from 'axios'

// const API_URL = '/api/goals/'

// // Create new goal
// const createGoal = async (goalData, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }

//   const response = await axios.post(API_URL, goalData, config)

//   return response.data
// }

// // Get user goals
// const getGoals = async (token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }

//   const response = await axios.get(API_URL, config)

//   return response.data
// }

// // Delete user goal
// const deleteGoal = async (goalId, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }

//   const response = await axios.delete(API_URL + goalId, config)

//   return response.data
// }

// const goalService = {
//   createGoal,
//   getGoals,
//   deleteGoal,
// }

// export default goalService


// // import axios from 'axios'

// // const API_URL = '/api/reitit/'


// // //create new goal ( reitti)
// // const createReitti = async (reittiData, token) => {
// //     const config = {
// //         headers: {
// //             Authorization: `Bearer ${token}`        // backtics
// //         }
// //     }

// //     const response = await axios.post(API_URL, reittiData, config)

// //     return response.data
// // }
// // //get user goals ( reitti)
// // const getReitit = async (token) => {
// //     const config = {
// //         headers: {
// //             Authorization: `Bearer ${token}`        // backtics
// //         }
// //     }

// //     const response = await axios.get(API_URL, config)

// //     return response.data
// // }

// // //delete reitti
// // const deleteReitti = async (reittiId, token) => {
// //     const config = {
// //         headers: {
// //             Authorization: `Bearer ${token}`        // backtics
// //         },
// //     }

// //     const response = await axios.delete(API_URL + reittiId, config)

// //     return response.data
// // }

// // const reittiService = {
// //     createReitti,
// //     getReitit,
// //     deleteReitti,
// // }

// // export default reittiService