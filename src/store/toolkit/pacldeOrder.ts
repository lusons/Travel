import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { checkOut } from './shoppingCart'

interface userState {
    loading: boolean;
    error: string | null;
    currentOder: any
}

const defaultState: userState = {
    loading: false,
    error: null,
    currentOder: null
}

export const placeOrder = createAsyncThunk('order/placeOrder', async (orderId: string, thunkAPI)=> {
    let url = `http://123.56.149.216:8080/api/orders/${orderId}/placeOrder`
    const {data} = await axios.post(url, null)
    return data
})

export const orderSlice = createSlice({
    name: 'order',
    initialState: defaultState,
    reducers: {

    },
    extraReducers: {
        [placeOrder.pending.type]: (state)=> {
            state.loading = true
        },
        [placeOrder.fulfilled.type]: (state, action)=> {            
            state.currentOder = action.payload;
            state.loading = false
            state.error = null
        },
        [placeOrder.rejected.type]: (state, action: PayloadAction<string | null>)=> {
            state.error = action.payload
            state.loading = false
        },
        [checkOut.pending.type]: (state)=> {
            state.loading = true
        },
        [checkOut.fulfilled.type]: (state, action)=> {            
            state.currentOder = action.payload;
            state.loading = false
            state.error = null
        },
        [checkOut.rejected.type]: (state, action: PayloadAction<string | null>)=> {
            state.error = action.payload
            state.loading = false
        },
    }
})