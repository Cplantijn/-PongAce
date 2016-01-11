const actions = exports = module.exports;
import {
  Howl
}
from 'howler';
import musicOpts from '../../sound/game_music';
// import { polyfill } from 'es6-promise';
import _ from 'underscore';
export const SHOW_OVERLAY = 'SHOW_OVERLAY';
export const HIDE_OVERLAY = 'HIDE_OVERLAY';
export const SHOW_MESSAGE = 'SHOW_MESSAGE';
export const HIDE_MESSAGE = 'HIDE_MESSAGE';
export const REMOVE_SHAKE = 'REMOVE_SHAKE';
export const LIST_PLAYERS = 'LIST_PLAYERS';
export const CLEAR_PLAYER_LIST = 'CLEAR_PLAYER_LIST';
export const SHOW_PLAYER_DETAIL = 'SHOW_PLAYER_DETAIL';
export const START_SELECTION = 'START_SELECTION';
export const END_SELECTION = 'END_SELECTION';
export const HIGHLIGHT_SELECTION = 'HIGHLIGHT_SELECTION';
export const JOIN_GROUP = 'JOIN_GROUP';
export const RESET_GROUPS = 'RESET_GROUPS';
export const READY_UP = 'READY_UP';
export const START_GAME = 'START_GAME';
export const END_GAME = 'END_GAME';
export const MODIFY_POINT = 'MODIFY_POINT';
export const CHANGE_GAME_POINT = 'CHANGE_GAME_POINT';
export const CHANGE_SERVE_INTERVAL = 'CHANGE_SERVE_INTERVAL';
export const FETCH_SETTINGS = 'FETCH_SETTINGS';

const howl = new Howl(musicOpts);

const contentType = {
  'accept': 'application/json',
  'content-type': 'application/json'
};

let msgTimeout;
let msgShakeTimeout;
let gamePtSaveTimeout;
let serveIntervalTimeout;

export function startGame() {
  howl.play('applause');
  return {
    type: actions.START_GAME
  };
}

export function fetchSettings() {
  return dispatch => {
    return fetch('/fetch/settings/')
      .then(response => response.json())
      .then(function(json) {
        if (json.errno) {
          dispatch(showMessage('danger', 'Something went wrong.'));
          msgTimeout = setTimeout(function() {
            dispatch(hideMessage());
          }, 3000);
        } else {
          dispatch(loadSettings(json));
        }
      });
  };
}

export function changeGamePoint(point) {
  return dispatch => {
    clearTimeout(gamePtSaveTimeout);
    dispatch(gamePointChange(point));
    gamePtSaveTimeout = setTimeout(function() {
      dispatch(saveSetting('game_point', point));
    }, 400);
  };
}

export function changeServeInterval(point) {
  return dispatch => {
    clearTimeout(serveIntervalTimeout);
    dispatch(serveIntervalChange(point));
    serveIntervalTimeout = setTimeout(function() {
      dispatch(saveSetting('serve_interval', point));
    }, 400);
  }
  return {
    type: actions.CHANGE_GAME_POINT,
    point: point
  }
}

export function endSelection() {
  return {
    type: actions.END_SELECTION
  }
}

export function modifyPoint(group, event) {
  return (dispatch, getState) => {
    dispatch(pointModify(group, event));
    const {
      playerGroup
    } = getState();
    if (!playerGroup.game.active) {
      dispatch(gameEnd());
      dispatch(saveStats(playerGroup));
      dispatch(showMessage('info', 'HOLD BUTTON FOR REMATCH / DOUBLE TAP TO QUIT'));
    }
  }
}

export function endGame() {
  howl.play('no_contest', function() {
    setTimeout(function() {
      howl.play('crowd_upset');
    }, 1000)
  })
  return dispatch => {
    clearTimeout(msgTimeout);
    dispatch(showMessage('warning', 'THE GAME HAS ENDED'));
    dispatch(gameEnd());
    dispatch(groupReset());
    msgTimeout = setTimeout(function() {
      dispatch(hideMessage());
    }, 3000);
  }
}

export function toggleReady(side, gameStart) {
  return (dispatch, getState) => {
    var {
      playerGroup
    } = getState();
    if (!playerGroup[side].ready) {
      howl.play('ready');
    }
    dispatch(readyToggle(side));
    if (gameStart) {
      clearTimeout(msgTimeout);
      dispatch(hideMessage());
      dispatch(fetchSettings());
      dispatch(hideOverlay());
      dispatch(startGame());
    }
  }
}

export function startSelection(group, player) {
  var msgType = group == 'groupOne' ? 'group-one' : 'group-two';
  return dispatch => {
    clearTimeout(msgTimeout);
    dispatch(hideMessage());
    dispatch(showMessage(msgType, 'SELECT A PLAYER'));
    dispatch(selectionStart(group, player));
  }
}

export function showSelectionWarning() {
  return dispatch => {
    clearTimeout(msgTimeout);
    dispatch(showMessage('warning', 'PLAYER ALREADY CHOSEN. PLEASE CHOOSE ANOTHER'));
  }
}

export function resetGroups() {
  return dispatch => {
    clearTimeout(msgTimeout);
    dispatch(hideMessage());
    dispatch(groupReset());
  }
}

export function hideMessage(type, message) {
  return {
    type: actions.HIDE_MESSAGE
  }
}

export function highlightSelection(id) {
  howl.play('player_cursor');
  return {
    type: actions.HIGHLIGHT_SELECTION,
    id: id
  }
}

export function joinGroup(group, player, id, name, standardPose, winningPose) {
  howl.play('chosen');
  var msgType = group == 'groupOne' ? 'group-one' : 'group-two';
  return dispatch => {
    clearTimeout(msgTimeout);
    dispatch(playerJoinGroup(group, player, id, name, standardPose, winningPose));
    dispatch(showMessage(msgType, 'Picked ' + name + '!'));
    dispatch(endSelection());
    msgTimeout = setTimeout(function() {
      dispatch(hideMessage());
    }, 3000)
  }
}

export function showOverlay(overlayIndex) {
  if (overlayIndex == 4) {
    howl.play('smash_theme', function() {
      setTimeout(function() {
        howl.play('choose_character');
      }, 500);
    });
  }
  return dispatch => {
    dispatch(hideMessage());
    dispatch(overlayShow(overlayIndex))
  }
}


export function hideOverlay() {
  return (dispatch, getState) => {
    var {
      overlay
    } = getState();
    if (overlay.activeIndex == 4) {
      howl.stop();
    }
    dispatch(overlayHide());
  }
}

function overlayHide() {
  return {
    type: actions.HIDE_OVERLAY
  }
}

export function fetchPlayerDetails(playerId) {
  return dispatch => {
    return fetch('/fetch/player/' + playerId)
      .then(response => response.json())
      .then(function(json) {
        if (json.errno === 19) {
          dispatch(showMessage('danger', 'Something went wrong.'));
          msgTimeout = setTimeout(function() {
            dispatch(hideMessage())
          }, 3000);
        } else {
          dispatch(loadPlayerInfo(json));
        }
      });
  }
}

export function changePlayerPic(playerId, picType, file, res) {
  var ext = file.name.match(/\.(jpg|png|jpeg)$/i);
  return dispatch => {
    clearTimeout(msgTimeout);
    clearTimeout(msgShakeTimeout);
    if (ext == null) {
      dispatch(showMessage('danger', 'Must be .jpg or .png file'));
    } else {
      var data = new FormData;
      data.append('file', file);
      data.append('picType', picType);
      data.append('id', playerId);
      return fetch('/update/player/picture', {
          method: 'POST',
          body: data
        })
        .then(response => response.json())
        .then(function(json) {
          if (json.errno || json.error) {
            dispatch(showMessage('danger', 'An error has occurred'));
          }
          dispatch(fetchPlayerDetails(playerId));
          //TODO: Do not get value by raw javascript. Maybe use state?
          var currentFilter = document.getElementById('player-profile-filter-input').value;
          dispatch(fetchPlayers(currentFilter, 'updated_on DESC'));
        })
    }
    msgTimeout = setTimeout(function() {
      dispatch(hideMessage())
    }, 3000);
  }
}

export function changePlayerQuote(playerId, text) {
  text = text.trim();
  return dispatch => {
    clearTimeout(msgTimeout);
    clearTimeout(msgShakeTimeout);
    if (!text.length) {
      dispatch(showMessage('danger', 'Quote cannot be empty'));
      msgTimeout = setTimeout(function() {
        dispatch(hideMessage())
      }, 3000)
    } else {
      return fetch('/update/player/quote', {
          method: 'POST',
          headers: contentType,
          body: JSON.stringify({
            "quote": text,
            "id": playerId
          })
        })
        .then(response => response.json())
        .then(function(json) {
          if (json.errno) {
            console.log(json);
            dispatch(showMessage('danger', 'An error occurred. Try again'))
            msgShakeTimeout = setTimeout(function() {
              dispatch(removeMsgShake())
            }, 1000);
          } else {
            dispatch(showMessage('success', 'Quote has been updated'));
            dispatch(fetchPlayerDetails(playerId));
          }
          msgTimeout = setTimeout(function() {
            dispatch(hideMessage())
          }, 3000);
        })
    }
  }
}


export function createNewPlayer(playerName) {
  return dispatch => {
    clearTimeout(msgTimeout);
    clearTimeout(msgShakeTimeout);
    if (playerName.trim().length) {
      if (playerName.trim().length > 21) {
        dispatch(showMessage('danger', 'Player Name is too long.'));
        msgTimeout = setTimeout(function() {
          dispatch(hideMessage())
        }, 3000);
      } else {
        return fetch('/create/player', {
            method: 'POST',
            headers: contentType,
            body: JSON.stringify({
              "name": playerName.trim()
            })
          })
          .then(response => response.json())
          .then(function(json) {
            if (json.errno === 19) {
              dispatch(showMessage('danger', playerName + '  is already a player'));
              msgShakeTimeout = setTimeout(function() {
                dispatch(removeMsgShake())
              }, 1000);
            } else {
              dispatch(showMessage('success', 'Player created: ' + playerName));
              dispatch(fetchPlayers('', 'updated_on DESC'));
            }
            msgTimeout = setTimeout(function() {
              dispatch(hideMessage())
            }, 3000);
          })
      }
    } else {
      msgTimeout = setTimeout(function() {
        dispatch(hideMessage())
      }, 3000);

      msgShakeTimeout = setTimeout(function() {
        dispatch(removeMsgShake())
      }, 1000);
      dispatch(showMessage('danger', 'Player name is empty. Try again.'))
    }
  }
}

export function fetchPlayers(filter, sort) {
  clearTimeout(msgTimeout);
  clearTimeout(msgShakeTimeout);
  return dispatch => {
    dispatch(clearPlayerList());
    return fetch('/fetch/players', {
        method: 'POST',
        headers: contentType,
        body: JSON.stringify({
          "filter": filter.trim(),
          "sort": sort
        })
      })
      .then(response => response.json())
      .then(function(json) {
        if (json.errno) {
          console.log(json);
          dispatch(showMessage('danger', 'Something\'s up with the database. Check it out bruh.'))
        } else {
          dispatch(showPlayerList(json));
        }
      })
    msgTimeout = setTimeout(function() {
      dispatch(hideMessage())
    }, 3000);
    msgShakeTimeout = setTimeout(function() {
      dispatch(removeMsgShake())
    }, 1000);
  }
}


function saveSetting(column, value) {
  return dispatch => {
    return fetch('/save/setting', {
        method: 'POST',
        headers: contentType,
        body: JSON.stringify({
          'column': column,
          'value': value,
        })
      })
      .then(response => response.json())
      .then(function(json) {
        if (json.errno) {
          console.log('something went wrong', json);
        }
      })
  }
}

function saveStats(playerGroup) {
  var {
    groupOne, groupTwo, winner
  } = playerGroup;
  var loser = winner == 'groupOne' ? 'groupTwo' : 'groupOne';
  var winnerClip = winner == 'groupOne' ? 'blue_team' : 'red_team';

  howl.play('game_end', function() {
    setTimeout(function() {
      howl.play('winner_screen', function() {
        setTimeout(function() {
          howl.play('winner', function() {
            setTimeout(function() {
              howl.play(winnerClip, function() {
                howl.play('cheer');
              }, 500);
            }, 1600);
          });
        }, 1000);
      });
    }, 1000);
  });


  var gameType = 'singles';
  var winnerIds = [];
  var loserIds = [];
  if (groupOne.playerOne.active && groupOne.playerTwo.active ||
    groupTwo.playerOne.active && groupTwo.playerTwo.active) {
    gameType = 'doubles';
  }
  //Get Winner Ids
  _.each(playerGroup[winner], function(player, key) {
    if (key == 'playerOne' || key == 'playerTwo') {
      if (player.active) {
        winnerIds.push(player.id);
      }
    }
  });
  //Get Loser Ids
  _.each(playerGroup[loser], function(player, key) {
    if (key == 'playerOne' || key == 'playerTwo') {
      if (player.active) {
        loserIds.push(player.id);
      }
    }
  });
  return dispatch => {
    return fetch('/save/winloss', {
        method: 'POST',
        headers: contentType,
        body: JSON.stringify({
          'winningIds': winnerIds.join(','),
          'losingIds': loserIds.join(','),
          'gameType': gameType
        })
      })
      .then(response => response.json())
      .then(function(json) {
        if (json.errno) {
          console.log('an error has occured', json)
        }
      })
  }
}

function loadPlayerInfo(playerInfo) {
  return {
    type: actions.SHOW_PLAYER_DETAIL,
    playerInfo: playerInfo
  }
}

function overlayShow(overlayIndex) {
  return {
    type: actions.SHOW_OVERLAY,
    overlayIndex: overlayIndex
  }
}

function removeMsgShake() {
  return {
    type: actions.REMOVE_SHAKE
  }
}

function clearPlayerList() {
  return {
    type: actions.CLEAR_PLAYER_LIST
  }
}

function showPlayerList(playerList) {
  return {
    type: actions.LIST_PLAYERS,
    playerList: playerList
  }
}

function showMessage(type, message) {
  return {
    type: actions.SHOW_MESSAGE,
    message: message,
    messageType: type
  }
}

function selectionStart(group, player) {
  return {
    type: actions.START_SELECTION,
    group: group,
    player: player,
  }
}

function groupReset() {
  return {
    type: actions.RESET_GROUPS
  }
}

function readyToggle(side) {
  return {
    type: actions.READY_UP,
    side: side
  }
}

function loadSettings(settings) {
  return {
    type: actions.FETCH_SETTINGS,
    settings: settings
  }
}

function gameEnd() {
  return {
    type: actions.END_GAME
  }
}


function pointModify(group, event) {
  return {
    type: actions.MODIFY_POINT,
    event: event,
    group: group
  }
}

function gamePointChange(point) {
  return {
    type: actions.CHANGE_GAME_POINT,
    point: point
  }
}

function serveIntervalChange(point) {
  return {
    type: actions.CHANGE_SERVE_INTERVAL,
    point: point
  }
}

function playerJoinGroup(group, player, id, name, standardPose, winningPose) {
  return {
    type: actions.JOIN_GROUP,
    group: group,
    player: player,
    id: id,
    name: name,
    standardPose: standardPose,
    winningPose: winningPose
  }
}
