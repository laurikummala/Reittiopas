import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import reittiService from './reittiService'

const initialState = {
    reitit: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    Message: ''

}

//Create new goal(reitti)
export const createReitti = createAsyncThunk('reitit/create', async (reittiData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await reittiService.createReitti(reittiData, token)
    } catch (error) {
        const message =                             // sama error kuin authSlicessa
                (error.response && 
                error.response.data && 
                error.response.data.message) ||
                error.message || 
                error.toString()
            return thunkAPI.rejectWithValue(message)
    }
})

//get user goals

export const getReitit = createAsyncThunk(
    'reitit/getAll', 
    async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await reittiService.createReitti(token)
    } catch (error) {
        const message =                             // sama error kuin authSlicessa ja yläpuolella
                (error.response && 
                error.response.data && 
                error.response.data.message) ||
                error.message || 
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Delete goal(reitti)
export const deleteReitti = createAsyncThunk(
    'reitit/delete', 
    async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await reittiService.deleteReitti(id, token)
    } catch (error) {
        const message =                             // sama error kuin authSlicessa
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
        .addCase(createReitti.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createReitti.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.reitit.push(action.payload)                     //vain redux toolkitillä
        })
        .addCase(createReitti.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload             //vain redux toolkitillä
        })
        .addCase(getReitit.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getReitit.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.reitit = action.payload                   //vain redux toolkitillä
        })
        .addCase(getReitit.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload             //vain redux toolkitillä
        })
        .addCase(deleteReitti.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteReitti.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.reitit = state.reitit.filter((reitti) => reitti._id !== 
            action.payload.id)                                              //otetaan pois UIsta
        })
        .addCase(deleteReitti.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload             //vain redux toolkitillä
        })
    },
})


export const {reset} = reittiSlice.actions
export default reittiSlice.reducer
