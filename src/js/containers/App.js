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
    window.addEventListener('keydown', function(e) {
      if (e.which == 49) {
        modifyPoint('groupOne', 'ADD');
      }else if (e.which == 50) {
        modifyPoint('groupTwo', 'ADD');
      }else if (e.which == 189) {
        if (playerGroup.game.active) {
          modifyPoint('groupOne', 'REMOVE');
        }
        if (playerGroup.groupTwo.ready) {
          toggleReady('groupOne', true);
        } else{
          toggleReady('groupOne', false);
        }
      }else if (e.which == 187) {
        if (playerGroup.game.active) {
          modifyPoint('groupTwo', 'REMOVE');
        }
        if (playerGroup.groupOne.ready) {
          toggleReady('groupTwo', true);
        } else{
          toggleReady('groupTwo', false);
        }
      }
    });
    this.socket.on('btnDown', function(side) {
      if (playerGroup.game.active) {
        modifyPoint(side, 'ADD');
      }
    });

    //Testing override
    document.addEventListener('keydown', function(e) {
      console.log(e)
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
