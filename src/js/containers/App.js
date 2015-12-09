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
    const { dispatch, addTeam} = this.props
    var self = this
    this.socket = io()
    this.socket.on('btnPress', function() {
      addTeam('test')
    })
  }
  render() {
    return (
      <MainComponent {...this.props}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    gameActive: state.gameActive,
    menuOpen: state.menuOpen,
    menu: state.menu,
    cardData: state.cardData,
    userMessage: state.userMessage
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PongActions, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
