import React from 'react';
import logo from './logo.svg';
import './App.css';
import Canvas from './component/Canvas';
import { createStore, applyMiddleware } from 'redux';
import mainReducer from './reducer';
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger';
import  createSagaMiddleware  from 'redux-saga'
import rootSaga from './saga';
import Editing from './component/Editing';
import Home from './component/Home';

const logger = createLogger({ collapsed: true })
const sagaMiddleware = createSagaMiddleware()
export const store = createStore(mainReducer, {}, applyMiddleware(logger, sagaMiddleware))
sagaMiddleware.run(rootSaga)
store.dispatch({type: 'TEST'})
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <Canvas /> */}
        <Home/>
      </div>
    </Provider>
  );
}

export default App;
