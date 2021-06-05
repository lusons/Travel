// import { createStore, applyMiddleware } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleWare from 'redux-saga'
import { countReducer } from './reducers'
import languageReducer from './reducers/language'
import productReducer from './reducers/product'
import { detailSlice } from './toolkit/detail'
import { searchSlice } from './toolkit/searchSlice'
import sagas from './sagas'
import { actionLog } from './middlewares/actionLog'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

// 合并多个reducer
const rootReducers = combineReducers({
    count: countReducer,
    language: languageReducer,
    products: productReducer,
    detail: detailSlice.reducer,
    search: searchSlice.reducer
})

const Saga = createSagaMiddleWare()
// const store = createStore(rootReducers, {}, composeWithDevTools(applyMiddleware(Saga, actionLog)))

const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware)=> [...getDefaultMiddleware(), actionLog, Saga],
    // 启用redux浏览器插件
    devTools: true
})

// Saga.run一定要在createStore后面，因为是store的一个中间件
Saga.run(sagas)

// 获取store仓库数据类型接口，定义为类型并返回
export type RootState = ReturnType<typeof store.getState>
export default store