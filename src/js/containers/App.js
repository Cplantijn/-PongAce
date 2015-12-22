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
    var {game, playerGroup, readyUp } = this.props;
    this.socket = io();
    this.socket.on('btnHold', function(side) {
      if (game.active) {
        //Dock Point from side
      } else {
        if (playerGroup.groupOne.playerOne.active && playerGroup.groupTwo.playerOne.active) {
          readyUp(side);
        }
      }
    });
  }
  render() {
    return (
      <MainComponent {...this.props}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    overlay: state.overlay,
    playerGroup: state.playerGroup,
    game: state.game,
    userMessage: state.userMessage,
    playerList: state.playerList,
    activePlayerDetail: state.activePlayerDetail
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PongActions, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
