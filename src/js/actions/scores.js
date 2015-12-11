var actions = exports = module.exports

export const ADD_POINT = 'ADD_POINT'
export const ADD_TEAM = 'ADD_TEAM'
export const SHOW_MENU = 'SHOW_MENU'
export const HIDE_MENU = 'HIDE_MENU'
export const CREATE_NEW_PLAYER = 'CREATE_NEW_PLAYER'
export const CREATING_PLAYER = 'CREATING_PLAYER'
export const CREATED_PLAYER = 'CREATED_PLAYER'

const contentType = {
  'accept': 'application/json',
  'content-type': 'application/json'
}
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
  if (playerName.length) {
    return dispatch => {
      dispatch(insertPlayer)
      return fetch('/create/player', {
            method:'POST',
            headers: contentType,
            body: JSON.stringify({
              "name": playerName
            })
          })
          .then(response => response.json())
          .then(json => dispatch(createPlayer(playerName, json)))
    }
  } else {
    alert('not long enough, bruh!')
  }
}

export function hideMenu() {
  return {
    type: actions.HIDE_MENU
  }
}

function createPlayer(playerName, json) {
  if (json.errno && json.errno == 19) {
    alert('Name exists already!')
  }
  return {
    type: actions.CREATED_PLAYER
  }
}

function insertPlayer(playerName) {
  return {
    type: actions.CREATING_PLAYER
  }
}
