import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PongActions from '../actions';
import io from 'socket.io-client';
import MainComponent from '../components/MainComponent';

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {game, toggleReady, hideOverlay, modifyPoint, resetGroups } = this.props;
    this.socket = io();
    this.socket.on('btnHold', function(side) {
      if (game.active) {
        modifyPoint(side, 'REMOVE');
      } else if (!game.active && game.ended) {
        if (!game[side].ready) {
          if (side === 'groupOne') {
            if (game.groupTwo.ready) {
              toggleReady(side, true);
            } else {
              toggleReady(side, false);
            }
          } else {
            if (game.groupOne.ready) {
              toggleReady(side, true);
            } else {
              toggleReady(side, false);
            }
          }
        } else {
          toggleReady(side, false);
        }
      } else {
        if (game.groupOne.playerOne.active && game.groupTwo.playerOne.active) {
          if (!game[side].ready) {
            if (side === 'groupOne') {
              if (game.groupTwo.ready) {
                toggleReady(side, true);
              } else {
                toggleReady(side, false);
              }
            } else {
              if (game.groupOne.ready) {
                toggleReady(side, true);
              } else {
                toggleReady(side, false);
              }
            }
          } else {
            toggleReady(side, false);
          }
        }
      }
    });
    this.socket.on('btnDblDown', function() {
      if (!game.active && game.ended) {
        resetGroups();
      }
    });

    this.socket.on('btnDown', function(side) {
      if (game.active) {
        modifyPoint(side, 'ADD');
      }
    });

    window.addEventListener('keydown', function(e) {
      if (e.which === 49) {
        if (game.active) { // Group 1 press, 1
          modifyPoint('groupOne', 'ADD');
        }
      } else if (e.which === 50) { // Group 2 press, 2
        if (game.active) {
          modifyPoint('groupTwo', 'ADD');
        }
      } else if (e.which === 51) { // Double Tap, 3
        if (!game.active && game.ended) {
          resetGroups();
        }
      } else if (e.which === 189) { // Group 1 hold, -
        if (game.active) {
          modifyPoint('groupOne', 'REMOVE');
        } else {
          if (game.groupTwo.ready) {
            toggleReady('groupOne', true);
          } else {
            toggleReady('groupOne', false);
          }
        }
      } else if (e.which === 187) { // Group 2 hold, =
        if (game.active) {
          modifyPoint('groupTwo', 'REMOVE');
        } else {
          if (game.groupOne.ready) {
            toggleReady('groupTwo', true);
          } else {
            toggleReady('groupTwo', false);
          }
        }
      }
    });
  }
  render() {
    return (
      <MainComponent {...this.props}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    overlay: state.overlay,
    game: state.game,
    userMessage: state.userMessage,
    playerList: state.playerList,
    showcasedPlayer: state.showcasedPlayer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PongActions, dispatch);
}
App.propTypes = {
  game: React.PropTypes.object,
  toggleReady: React.PropTypes.func,
  hideOverlay: React.PropTypes.func,
  modifyPoint: React.PropTypes.func,
  resetGroups: React.PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
