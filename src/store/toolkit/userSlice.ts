import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface userState {
    loading: boolean;
    error: string | null;
    token: string | null
}

const defaultState: userState = {
    loading: false,
    error: null,
    token: null
}

export const Login = createAsyncThunk('user/Login', async ({email, password}: any, thunkAPI)=> {
    let url = `http://123.56.149.216:8080/auth/login`
    const {data: {token}} = await axios.post(url, {
        email: email,
        password: password
    })
    return token
})

export const userSlice = createSlice({
    name: 'user',
    initialState: defaultState,
    reducers: {
        signOut: (state)=> {
            state.token = null
            state.error = null
        }
    },
    extraReducers: {
        [Login.pending.type]: (state)=> {
            state.loading = true
        },
        [Login.fulfilled.type]: (state, action)=> {            
            state.token = action.payload;
            state.loading = false
            state.error = null
        },
        [Login.rejected.type]: (state, action: PayloadAction<string | null>)=> {
            state.error = action.payload
            state.loading = false
        },
    }
})