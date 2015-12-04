'use strict';

import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import pongApp from './reducers'

let store = createStore(pongApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('pong-container')
);