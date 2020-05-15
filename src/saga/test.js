import {put} from 'redux-saga/effects'
function* Test(){
    yield put({type: 'UPDATE_TITLE', payload: "Image Cropper"})
}
export default Test