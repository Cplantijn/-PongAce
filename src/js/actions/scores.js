var actions = exports = module.exports

export const SHOW_MENU = 'SHOW_MENU'
export const HIDE_MENU = 'HIDE_MENU'
export const SHOW_MESSAGE = 'SHOW_MESSAGE'
export const HIDE_MESSAGE = 'HIDE_MESSAGE'
export const REMOVE_SHAKE = 'REMOVE_SHAKE'

const contentType = {
  'accept': 'application/json',
  'content-type': 'application/json'
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

export function createNewPlayer(playerName) {
  return dispatch => {
      clearTimeout(msgTimeout);
      clearTimeout(msgShakeTimeout);
      dispatch(createPlayer);
      if (playerName.trim().length) {
        return fetch('/create/player', {
              method:'POST',
              headers: contentType,
              body: JSON.stringify({
                "name": playerName.trim()
              })
            })
            .then(response => response.json())
            .then(json => dispatch(createPlayer(playerName, json)))
      } else {
        msgTimeout = setTimeout(function() {
          dispatch(hideMessage())
        }, 5000);

        msgShakeTimeout = setTimeout(function() {
          dispatch(removeMsgShake())
        }, 1000);
        dispatch(showMessage('danger', 'Player name is empty. Try again.'))
      }
    }
}

export function hideMenu() {
  return {
    type: actions.HIDE_MENU
  }
}

export function removeMsgShake() {
  return {
    type: actions.REMOVE_SHAKE
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

function createPlayer(playerName, json) {
  return {
    type: actions.CREATING_PLAYER
  }
}
