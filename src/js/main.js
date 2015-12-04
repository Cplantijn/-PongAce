import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'

class PongContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(<div></div>)
  }
}

render(
  <PongContainer/>,
  document.getElementById('pong-container')
);