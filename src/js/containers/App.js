import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as PongActions from '../actions/scores'
import io from 'socket.io-client'

class App extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { dispatch, addPoint } = this.props
    console.log(this.props)
    var self = this
    this.socket = io()
    this.socket.on('btnPress', function() {
      addPoint()
    })
  }
  render() {
    return (
      <div>{this.props.score}</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    score: state.score
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PongActions, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
