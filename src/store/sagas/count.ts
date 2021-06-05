import { takeEvery } from 'redux-saga/effects'

export default function *countSaga(){
    yield takeEvery('aaa', function aaa() {
        console.log('aaa');
        
    })
    
}