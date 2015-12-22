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
    var {playerGroup, toggleReady, hideOverlay, modifyPoint } = this.props;
    this.socket = io();
    this.socket.on('btnHold', function(side) {
      if (playerGroup.game.active) {
        //Dock Point from side
        modifyPoint(side, 'REMOVE');
      } else {
        if (playerGroup.groupOne.playerOne.active && playerGroup.groupTwo.playerOne.active) {
          if (!playerGroup[side].ready) {
            if (side == 'groupOne') {
              if (playerGroup.groupTwo.ready) {
                toggleReady(side, true);
              } else{
                toggleReady(side, false);
              }
            } else {
              if (playerGroup.groupOne.ready) {
                toggleReady(side, true);
              } else{
                toggleReady(side, false);
              }
            }
          } else {
            toggleReady(side, false);
          }
        }
      }
    });

    this.socket.on('btnDown', function(side) {
      if (playerGroup.game.active) {
        modifyPoint(side, 'ADD');
      }
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
