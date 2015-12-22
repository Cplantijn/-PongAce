var actions = exports = module.exports
import { polyfill } from 'es6-promise'
export const SHOW_OVERLAY = 'SHOW_OVERLAY'
export const HIDE_OVERLAY = 'HIDE_OVERLAY'
export const SHOW_MESSAGE = 'SHOW_MESSAGE'
export const HIDE_MESSAGE = 'HIDE_MESSAGE'
export const REMOVE_SHAKE = 'REMOVE_SHAKE'
export const LIST_PLAYERS = 'LIST_PLAYERS'
export const CLEAR_PLAYER_LIST = 'CLEAR_PLAYER_LIST'
export const SHOW_PLAYER_DETAIL = 'SHOW_PLAYER_DETAIL'
export const START_SELECTION = 'START_SELECTION'
export const END_SELECTION = 'END_SELECTION'
export const HIGHLIGHT_SELECTION = 'HIGHLIGHT_SELECTION'
export const JOIN_GROUP = 'JOIN_GROUP'
export const RESET_GROUPS = 'RESET_GROUPS'
export const READY_UP = 'READY_UP'

const contentType = {
  'accept': 'application/json',
  'content-type': 'application/json'
}

const imageContentType = {
  'content-type': 'text/plain'
}
var msgTimeout, msgShakeTimeout;

export function endSelection() {
  return {
    type: actions.END_SELECTION
  }
}

export function readyUp(side) {
 return {
   type: actions.READY_UP,
   side: side
 }
}

export function startSelection(group, player) {
  var msgType = group == 'groupOne' ? 'group-one': 'group-two';
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
  return {
    type: actions.HIGHLIGHT_SELECTION,
    id: id
  }
}

export function addPoint(index) {
  return {
    type: actions.ADD_POINT,
    teamIndex: index
  }
}

export function joinGroup(group, player, id, name, standardPose, winningPose) {
  var msgType = group == 'groupOne' ? 'group-one': 'group-two';
  return dispatch => {
      clearTimeout(msgTimeout);
      dispatch(playerJoinGroup(group, player, id, name, standardPose, winningPose));
      dispatch(showMessage(msgType, 'Picked ' + name + '!'));
      dispatch(endSelection());
      msgTimeout = setTimeout(function(){
        dispatch(hideMessage());
      }, 3000)
    }
}

export function showOverlay(overlayIndex) {
  return {
    type: actions.SHOW_OVERLAY,
    overlayIndex:overlayIndex
  }
}


export function hideOverlay() {
  return {
    type: actions.HIDE_OVERLAY
  }
}


export function fetchPlayerDetails(playerId) {
  return dispatch => {
    return fetch('/fetch/player/'+playerId)
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
      dispatch(showMessage('danger','Must be .jpg or .png file'));
    } else {
      var data = new FormData;
      data.append('file', file);
      data.append('picType', picType);
      data.append('id', playerId);
      return fetch('/update/player/picture',{
        method:'POST',
        body: data
      })
      .then(response => response.json())
      .then(function(json) {
        if(json.errno || json.error) {
          dispatch(showMessage('danger','An error has occurred'));
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
      dispatch(showMessage('danger','Quote cannot be empty'));
      msgTimeout = setTimeout(function() {
        dispatch(hideMessage())
      }, 3000)
    } else {
      return fetch('/update/player/quote', {
        method:'POST',
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
                method:'POST',
                headers: contentType,
                body: JSON.stringify({
                  "name": playerName.trim()
                })
              })
              .then(response => response.json())
              .then(function(json) {
                if (json.errno === 19) {
                  dispatch(showMessage('danger', playerName +'  is already a player'));
                  msgShakeTimeout = setTimeout(function() {
                    dispatch(removeMsgShake())
                  }, 1000);
                } else {
                  dispatch(showMessage('success', 'Player created: ' + playerName));
                  dispatch(fetchPlayers('','updated_on DESC'));
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
      method:'POST',
      headers: contentType,
      body: JSON.stringify({
        "filter": filter.trim(),
        "sort" : sort
      })
    })
    .then(response => response.json())
    .then(function(json) {
      if (json.errno) {
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

function loadPlayerInfo(playerInfo) {
  return {
    type: actions.SHOW_PLAYER_DETAIL,
    playerInfo: playerInfo
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

function selectionStart(group, player){
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
