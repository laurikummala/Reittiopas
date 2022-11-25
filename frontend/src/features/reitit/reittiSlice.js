import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reittiService from "./reittiService";

const initialState = {
  reitit: [],
  naytettavat: 'kaikki',
  reittiOlio: null,
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


// Hae kaikki reitit
export const haeReitit = createAsyncThunk('reitit/haeReitit', async (_, thunkAPI) =>  {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await reittiService.haeReitit()
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


export const haeKaikkiReitit = createAsyncThunk('reitit/haeKaikkiReitit', async (_, thunkAPI) =>  {
  try {
    
    return await reittiService.haeKaikkiReitit()
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


export const haeReitti = createAsyncThunk('reitit/haeReitti', async (id, thunkAPI) =>  {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await reittiService.haeReitti(id,token)
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


// paivitaReitti lisätty 23.11.22, ei toimi loppuun saakka, palaan asiaan myöhemmin
export const paivitaReitti = createAsyncThunk('reitit/paivita', async (id, reittiData, thunkAPI) =>  {
  // alert('dummie')
  //console.log('dummie')
  // console.log('reittiSlicessa: ')
  //console.log('reittiSlicessa: ' + id)
  // console.log('reittidata: ' + reittiData)
  // const koe = useParams().reittiData
  // console.log(koe)

  // tähän asti ainakin tulee
  alert('dummie, ei tää toimi')
  try {
    const token = thunkAPI.getState().auth.user.token
    console.log('reittiSlicen tyrcatch')
    // tähän ei ehkä saa laittaa kolmea parametria????? ehkä vois yhdistää id:n tuohon reittiDataan, tai hakea jommankumman statesta
    return await reittiService.paivitaReitti(id, reittiData, token)
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
    reset: (state) => initialState,
    setNaytettavat: (state, action) => {
      state.naytettavat = action.payload
    },
    setReittiOlio: (state, action) => {
      state.reittiOlio = action.payload
    }
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
      .addCase(haeKaikkiReitit.pending, (state) => {
        state.isLoading = true
      })
      .addCase(haeKaikkiReitit.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.reitit = action.payload 
      })
      .addCase(haeKaikkiReitit.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(haeReitti.pending, (state) => {
        state.isLoading = true
      })
      .addCase(haeReitti.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.reittiOlio = action.payload 
      })
      .addCase(haeReitti.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(paivitaReitti.pending, (state) => {
        state.isLoading = true
      })
      .addCase(paivitaReitti.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        //console.log('reittiSlicen addCase fulfilled')
        // mitä tässä pitäs tehdä???? ########################################################
        // ei ainakaan tota allaolevaa
        // mikä tässä on action payload?
        // state.reitit.push(action.payload) 
      })
      .addCase(paivitaReitti.rejected, (state, action) => {
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

export const {reset, setNaytettavat, setReittiOlio} = reittiSlice.actions
export default reittiSlice.reducer