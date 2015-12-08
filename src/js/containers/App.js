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
    var { gameActive, cardData, userMessage } = this.props
    return (
      <MainComponent {...this.props}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    gameActive: state.gameActive,
    playerModalShown: state.playerModalShown,
    cardData: state.cardData,
    userMessage: state.userMessage
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PongActions, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
