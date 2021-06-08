// import { createStore, applyMiddleware } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleWare from 'redux-saga'
import { countReducer } from './reducers'
import languageReducer from './reducers/language'
import productReducer from './reducers/product'
import { detailSlice } from './toolkit/detail'
import { searchSlice } from './toolkit/searchSlice'
import { userSlice } from './toolkit/userSlice'
import { shoppingCartSlice } from './toolkit/shoppingCart'
import { orderSlice } from './toolkit/pacldeOrder'
import sagas from './sagas'
import { actionLog } from './middlewares/actionLog'
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import storage from 'redux-persist/lib/storage'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['user'], //要保存哪些store,对应的也有blacklist,
    blacklist: []
}

// 合并多个reducer
const rootReducers = combineReducers({
    count: countReducer,
    language: languageReducer,
    products: productReducer,
    detail: detailSlice.reducer,
    search: searchSlice.reducer,
    user: userSlice.reducer,
    shoppingCart: shoppingCartSlice.reducer,
    order: orderSlice.reducer
})

const peristedReducer = persistReducer(persistConfig, rootReducers)

const Saga = createSagaMiddleWare()
// const store = createStore(rootReducers, {}, composeWithDevTools(applyMiddleware(Saga, actionLog)))

const store = configureStore({
    reducer: peristedReducer,
    // middleware: (getDefaultMiddleware)=> [...getDefaultMiddleware(), actionLog, Saga],
    middleware: getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    })
    .concat([actionLog, Saga]),
    // 启用redux浏览器插件
    devTools: true
})

let persistor = persistStore(store)

// Saga.run一定要在createStore后面，因为是store的一个中间件 
Saga.run(sagas)

// 获取store仓库数据类型接口，定义为类型并返回
export type RootState = ReturnType<typeof store.getState>

const rootStore = { store, persistor }

export default rootStore