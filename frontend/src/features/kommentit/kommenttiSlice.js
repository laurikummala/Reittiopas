import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import kommenttiService from "./kommenttiService"

const initialState = {
  kommentit: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Luo uusi kommentti
export const luoKommentti = createAsyncThunk('kommentit/luo', async (kommenttiData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await kommenttiService.luoKommentti(kommenttiData, token)
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

// Hae käyttäjän kommentit
export const haeKommentit = createAsyncThunk('kommentit/haeKaikki', async (_, thunkAPI) =>  {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await kommenttiService.haeKommentit(token)
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

// Päivitä kommentti

export const paivitaKommentti = createAsyncThunk('kommentit/paivita', async (commentId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await kommenttiService.paivitaKommentti(commentId, token)
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


// Poista käyttäjän kommentti
export const poistaKommentti = createAsyncThunk('kommentit/poista', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await kommenttiService.poistaKommentti(id, token)
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

export const kommenttiSlice = createSlice({
  name: 'kommentti',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(luoKommentti.pending, (state) => {
        state.isLoading = true
      })
      .addCase(luoKommentti.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.kommentit.push(action.payload) 
      })
      .addCase(luoKommentti.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(haeKommentit.pending, (state) => {
        state.isLoading = true
      })
      .addCase(haeKommentit.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.kommentit = action.payload 
      })
      .addCase(haeKommentit.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(paivitaKommentti.pending, (state) => {
        state.isLoading = true
      })
      .addCase(paivitaKommentti.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.kommentit.update(action.payload) 
      })
      .addCase(paivitaKommentti.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(poistaKommentti.pending, (state) => {
        state.isLoading = true
      })
      .addCase(poistaKommentti.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.kommentit = state.kommentit.filter((kommentti) => kommentti._id !== action.payload.id) 
      })
      .addCase(poistaKommentti.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const {reset} = kommenttiSlice.actions
export default kommenttiSlice.reducer