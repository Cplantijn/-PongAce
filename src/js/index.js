'use strict';

import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import pongReducer from './reducers'

const loggerMiddleware = createLogger()

const createStoreWithMiddleWare = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore)

let store = createStoreWithMiddleWare(pongReducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('pong-container')
);
