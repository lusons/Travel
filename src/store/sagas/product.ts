import axios from 'axios'
import { createProductAction } from '../actions/product'
import { takeEvery, call, put } from 'redux-saga/effects'

const req = async ()=> {
    return axios.get('http://123.56.149.216:8080/api/productCollections')
}

export default function *productSaga(){
    yield takeEvery('reqProduct', function* (){
        const {data} = yield call(req)
        yield put(createProductAction(data))
    })
    
}