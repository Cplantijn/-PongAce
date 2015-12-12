import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as PongActions from '../actions/scores'
import io from 'socket.io-client'
import MainComponent from '../components/MainComponent'

class App extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    var self = this;
    this.socket = io();
  }
  render() {
    return (
      <MainComponent {...this.props}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    menu: state.menu,
    userMessage: state.userMessage
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PongActions, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
