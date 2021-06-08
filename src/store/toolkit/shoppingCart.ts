import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface userState {
    loading: boolean;
    error: string | null;
    items: any[]
}

const defaultState: userState = {
    loading: false,
    error: null,
    items: []
}

export const getShoppingCart = createAsyncThunk('shoppingCart/getShoppingCart', async (token: string, thunkAPI)=> {
    let url = `http://123.56.149.216:8080/api/shoppingCart`
    const {data} = await axios.get(url)
    return data.shoppingCartItems
})

export const checkOut = createAsyncThunk('shoppingCart/checkOut', async (token: string, thunkAPI)=> {
    let url = `http://123.56.149.216:8080/api/shoppingCart/checkout`
    const {data} = await axios.post(url, null)
    return data
})

export const addShoppingCart = createAsyncThunk('shoppingCart/addShoppingCart', async (params: {token: string, touristRouteId: any}, thunkAPI)=> {
    let url = `http://123.56.149.216:8080/api/shoppingCart/items`
    const {data} = await axios.post(url, 
        {
            touristRouteId: params.touristRouteId
        }
     )
    return data.shoppingCartItems
})

export const clearShoppingCart = createAsyncThunk('shoppingCart/clearShoppingCart', async (params: {token: string, itemIDs: any[]}, thunkAPI)=> {
    let url = `http://123.56.149.216:8080/api/shoppingCart/items/(${params.itemIDs.join(",")})`
    const  {data} = await axios.delete(url)
    return data
})

export const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState: defaultState,
    reducers: {
        signOut: (state)=> {
            state.items = []
            state.error = null
        }
    },
    extraReducers: {
        [getShoppingCart.pending.type]: (state)=> {
            state.loading = true
        },
        [getShoppingCart.fulfilled.type]: (state, action)=> {            
            state.items = action.payload;
            state.loading = false
            state.error = null
        },
        [getShoppingCart.rejected.type]: (state, action: PayloadAction<string | null>)=> {
            state.error = action.payload
            state.loading = false
        },
        [addShoppingCart.pending.type]: (state)=> {
            state.loading = true
        },
        [addShoppingCart.fulfilled.type]: (state, action)=> {            
            state.items = action.payload;
            state.loading = false
            state.error = null
        },
        [addShoppingCart.rejected.type]: (state, action: PayloadAction<string | null>)=> {
            state.error = action.payload
            state.loading = false
        },
        [clearShoppingCart.pending.type]: (state)=> {
            state.loading = true
        },
        [clearShoppingCart.fulfilled.type]: (state)=> {            
            state.items = [];
            state.loading = false
            state.error = null
        },
        [clearShoppingCart.rejected.type]: (state, action: PayloadAction<string | null>)=> {
            state.error = action.payload
            state.loading = false
        },
        [checkOut.pending.type]: (state)=> {
            state.loading = true
        },
        [checkOut.fulfilled.type]: (state, action)=> {            
            state.items = [];
            state.loading = false
            state.error = null
        },
        [checkOut.rejected.type]: (state, action: PayloadAction<string | null>)=> {
            state.error = action.payload
            state.loading = false
        },
    }
})