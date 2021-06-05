import { all } from 'redux-saga/effects'
import countSaga from './count'
import productSaga from './product'

export default function *rootSaga(){
    yield all([
        countSaga(),
        productSaga()
    ])
}