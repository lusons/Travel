import { Middleware } from 'redux'

// 自定义redux中间件
export const actionLog: Middleware = (store)=> (next)=> (action)=> {
    console.log('当前state', store.getState());
    console.log('被捕获 action', action);
    next(action) // 分发action
    console.log('更新后state', store.getState());
} 