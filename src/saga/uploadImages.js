import {takeLatest, put} from 'redux-saga/effects'
import { imageUploader } from '../utils/imageUploader';
function* uploadImages({payload}){
    yield put({type: 'SET_IS_LOADING', payload: true})
    const promiseStack = []
    payload.forEach(image => {
        const promise = imageUploader({image})
        promiseStack.push(promise)
    });
    const data = yield Promise.all(promiseStack)
    yield put({type: 'SET_IS_LOADING', payload: false})
    yield put({type: 'SET_VIEW_ID', payload: data.join("-")})
}

export default uploadImages