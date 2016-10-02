import React from 'react';
import { render } from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import pongReducer from './reducers';
import config from '../../config';

let middleware = [thunkMiddleware];

if (config.mode !== 'production') {
  const loggerMiddleware = createLogger();
  middleware = [...middleware, loggerMiddleware]
}

const createStoreWithMiddleWare = applyMiddleware(...middleware)(createStore);

const store = createStoreWithMiddleWare(pongReducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('pong-container')
);
