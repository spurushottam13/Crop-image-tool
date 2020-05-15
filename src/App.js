import React from 'react';
import './App.css';
import { createStore, applyMiddleware } from 'redux';
import mainReducer from './reducer';
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger';
import  createSagaMiddleware  from 'redux-saga'
import rootSaga from './saga';
import Home from './component/Home';
import Header from './component/Header';

const logger = createLogger({ collapsed: true })
const sagaMiddleware = createSagaMiddleware()
export const store = createStore(mainReducer, {}, applyMiddleware(logger, sagaMiddleware))
sagaMiddleware.run(rootSaga)
store.dispatch({type: 'TEST'})
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header/>
        <Home/>
      </div>
    </Provider>
  );
}

export default App;
