import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

interface DetailState {
    loading: boolean;
    data: any;
    error: string | null;
}

export const defaultState: DetailState = {
	loading: true,
	error: null,
	data: null
}

export const getDetail = createAsyncThunk('detail/getDetail', async (id: string, thunkAPI)=> {
	thunkAPI.dispatch(detailSlice.actions.fetchStart());
	const { data } = await axios.get(
		`http://123.56.149.216:8080/api/touristRoutes/${id}`
	);
	thunkAPI.dispatch(detailSlice.actions.fetchSuccess(data));
	// return data //这里返回data会被处理成一个toolkit的promise
})

// redux-toolkit可以直接修改store状态，不必跟传统redux一样写纯函数
// 原因是有个immer
export const detailSlice = createSlice({
	name: 'detail',
	initialState: defaultState,
	reducers: {
		fetchStart: (state)=> {
			state.loading = true
		},
		fetchSuccess: (state, action)=> {
			state.data = action.payload
			state.loading = false
			state.error = null
		},
		fetchFail: (state, action: PayloadAction<string | null>)=> {
			state.loading = false
			state.data = action.payload
		}
	},
	// toolkit会自动映射，不需要自己dispatch，但是getDetail需要返回data
	// 额外的reducer，每当dispatch，就会自动触发
	extraReducers: {
		// [getDetail.pending.type]: (state)=> {
		// 	state.loading = true
		// },
		// [getDetail.fulfilled.type]: (state, action)=> {
		// 	state.data = action.payload
		// 	state.loading = false
		// 	state.error = null
		// },
		// [getDetail.rejected.type]: (state, action: PayloadAction<string | null>)=> {
		// 	state.loading = false
		// 	state.data = action.payload
		// }
	}
})	