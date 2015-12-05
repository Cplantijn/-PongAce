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
    const { dispatch, addPoint, addTeam } = this.props
    var self = this
    this.socket = io()
    this.socket.on('btnPress', function() {
      addTeam('test')
    })
  }
  render() {
    return (
      <MainComponent props={this.props}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    gameActive: state.gameActive,
    teamData: state.teamData,
    userMessage: state.userMessage
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PongActions, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
