var actions = exports = module.exports
export const SHOW_MENU = 'SHOW_MENU'
export const HIDE_MENU = 'HIDE_MENU'
export const SHOW_MESSAGE = 'SHOW_MESSAGE'
export const HIDE_MESSAGE = 'HIDE_MESSAGE'
export const REMOVE_SHAKE = 'REMOVE_SHAKE'
export const LIST_PLAYERS = 'LIST_PLAYERS'
export const SHOW_PLAYER_DETAIL = 'SHOW_PLAYER_DETAIL'

const contentType = {
  'accept': 'application/json',
  'content-type': 'application/json'
}

const imageContentType = {
  'content-type': 'text/plain'
}
var msgTimeout, msgShakeTimeout;

export function addPoint(index) {
  return {
    type: actions.ADD_POINT,
    teamIndex: index
  }
}

export function addTeam(index, name) {
  return {
    type: actions.ADD_TEAM,
    cardIndex: index,
    name: name
  }
}

export function showMenu(menuIndex) {
  return {
    type: actions.SHOW_MENU,
    menuIndex: menuIndex
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
                }, 4600);
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
        dispatch(fetchPlayers(currentFilter));
      })
    }
    msgTimeout = setTimeout(function() {
      dispatch(hideMessage())
    }, 4600);
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
      }, 4600)
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
        }, 4600);
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
          }, 4600);
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
                  dispatch(fetchPlayers(''));
                }
                msgTimeout = setTimeout(function() {
                  dispatch(hideMessage())
                }, 4600);
              })
        }
      } else {
        msgTimeout = setTimeout(function() {
          dispatch(hideMessage())
        }, 4600);

        msgShakeTimeout = setTimeout(function() {
          dispatch(removeMsgShake())
        }, 1000);
        dispatch(showMessage('danger', 'Player name is empty. Try again.'))
      }
    }
}

export function fetchPlayers(filter) {
  return dispatch => {
    return fetch('/fetch/players', {
      method:'POST',
      headers: contentType,
      body: JSON.stringify({
        "filter": filter.trim()
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
  }
}

function loadPlayerInfo(playerInfo) {
  return {
    type: actions.SHOW_PLAYER_DETAIL,
    playerInfo: playerInfo
  }
}

export function hideMenu() {
  return {
    type: actions.HIDE_MENU
  }
}

function removeMsgShake() {
  return {
    type: actions.REMOVE_SHAKE
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

function hideMessage(type, message) {
  return {
    type: actions.HIDE_MESSAGE
  }
}
