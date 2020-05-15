import {takeLatest, all} from 'redux-saga/effects'
import Test from './test'
import uploadImages from './uploadImages'

function* actionWatcher(){
    yield takeLatest('TEST', Test)
    yield takeLatest('UPLOAD_IMAGES', uploadImages)
}

function* rootSaga(){
    yield all([
        actionWatcher()
    ])
}
export default rootSaga