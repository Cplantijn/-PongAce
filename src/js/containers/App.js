import React, { Component } from 'react'
import io from 'socket.io-client'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: this.props.message
    }
  }
  componentDidMount() {
    var self = this;
    this.socket = io();
    this.socket.on('btnPress', function(msg) {
      self.setState({message: msg });
    });
  }
  render() {
    return (
      <div><h1>{this.state.message}</h1></div>
    )
  }
}