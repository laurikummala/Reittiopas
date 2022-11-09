import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reittiService from "./reittiService";

const initialState = {
  reitit: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Luo uusi reitti
export const luoReitti = createAsyncThunk('reitit/luo', async (reittiData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await reittiService.luoReitti(reittiData, token)
  } catch (error) {
    const message = 
      (error.response && 
        error.response.data && 
        error.response.data.message) || 
      error.message || 
      error.toString()
    return thunkAPI.rejectWithValue(message)   
  }
})

// Hae käyttäjän reitit
export const haeReitit = createAsyncThunk('reitit/haeKaikki', async (_, thunkAPI) =>  {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await reittiService.haeReitit(token)
  } catch (error) {
    const message = 
      (error.response && 
        error.response.data && 
        error.response.data.message) || 
      error.message || 
      error.toString()
    return thunkAPI.rejectWithValue(message)  
  }
})

// Poista käyttäjän reitti
export const poistaReitti = createAsyncThunk('reitit/poista', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await reittiService.poistaReitti(id, token)
  } catch (error) {
    const message = 
      (error.response && 
        error.response.data && 
        error.response.data.message) || 
      error.message || 
      error.toString()
    return thunkAPI.rejectWithValue(message)   
  }
})

export const reittiSlice = createSlice({
  name: 'reitti',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(luoReitti.pending, (state) => {
        state.isLoading = true
      })
      .addCase(luoReitti.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.reitit.push(action.payload) 
      })
      .addCase(luoReitti.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(haeReitit.pending, (state) => {
        state.isLoading = true
      })
      .addCase(haeReitit.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.reitit = action.payload 
      })
      .addCase(haeReitit.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(poistaReitti.pending, (state) => {
        state.isLoading = true
      })
      .addCase(poistaReitti.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.reitit = state.reitit.filter((reitti) => reitti._id !== action.payload.id) 
      })
      .addCase(poistaReitti.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const {reset} = reittiSlice.actions
export default reittiSlice.reducer