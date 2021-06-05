import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


interface searchState {
    loading: boolean;
    error: string | null;
    data: any;
    pagination: any;
}

const defaultState: searchState = {
    loading: true,
    error: null,
    data: null,
    pagination: null
}

export interface keywordsType {
    keywords: string;
    nextPage: string | number;
    pageSize: string | number;
}

export const searchProduct = createAsyncThunk('search/getSearchData', async (params: keywordsType, thunkAPI)=> {
    let url = `http://123.56.149.216:8080/api/touristRoutes?pagenumber=${params.nextPage}&pagesize=${params.pageSize}`
    if(params.keywords) url += `&keyword=${params.keywords}`
    const res = await axios.get(url)
    return {
        data: res.data,
        pagination: JSON.parse(res.headers['x-pagination'])
    }
})

export const searchSlice = createSlice({
    name: 'search',
    initialState: defaultState,
    reducers: {

    },
    extraReducers: {
        [searchProduct.pending.type]: (state)=> {
            state.loading = true
        },
        [searchProduct.fulfilled.type]: (state, action)=> {            
            state.data = action.payload.data;
            state.pagination = action.payload.pagination
            state.loading = false
            state.error = null
        },
        [searchProduct.rejected.type]: (state, action: PayloadAction<string | null>)=> {
            state.error = action.payload
            state.loading = false
        },
    }
})