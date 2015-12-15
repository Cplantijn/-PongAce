import { combineReducers } from 'redux'
import  {
  SHOW_MENU,
  HIDE_MENU,
  SHOW_MESSAGE,
  HIDE_MESSAGE,
  REMOVE_SHAKE,
  LIST_PLAYERS,
  SHOW_PLAYER_DETAIL,
} from '../actions/scores'
import _ from 'underscore'


function pong(state = {}, action) {

}

function menu(state = {
  isOpen: false,
  activeIndex: null,
  profilesData: {
    playerList: {}
  }
}, action) {
  switch(action.type) {
    case SHOW_MENU:
      var tMenu = state;
      tMenu.activeIndex = action.menuIndex;
      tMenu.isOpen = true;
      return {
        ...state,
        ...tMenu
      }
    case HIDE_MENU:
      var tMenu = state;
      tMenu.isOpen = false;
      return {
        ...state,
        ...tMenu
      }
    default:
      return state;
  }
}

function playerList(state = {}, action) {
  switch (action.type) {
    case LIST_PLAYERS:
      var tList = action.playerList;
      return {
        ...tList
      }
    default:
      return state
  }
}

function activePlayerDetail(state = {}, action) {
  switch (action.type) {
    case SHOW_PLAYER_DETAIL:
      var tPlayer = action.playerInfo;
      return {
        ...tPlayer
      }
    default:
      return state
  }
}

function userMessage(state = {
  isShowing: false,
  type: null,
  message: '',
  shake: false
}, action) {
  switch(action.type) {
    case SHOW_MESSAGE:
      var tMsg = state;
      if (tMsg.isShowing == true &&
          tMsg.type == action.messageType &&
          tMsg.message == action.message) {
        tMsg.shake = true;
      }
      tMsg.isShowing = true;
      tMsg.message = action.message;
      tMsg.type = action.messageType;
      return {
        ...state,
        ...tMsg
      }
    case HIDE_MESSAGE:
      var tMsg = state;
      tMsg.isShowing = false;
      tMsg.shake = false;
      return {
        ...state,
        ...tMsg
      }
    case REMOVE_SHAKE:
      var tMsg = state;
      tMsg.shake = false;
      return {
        ...state,
        ...tMsg
      }
    default:
      return state;
  }
}

const pongReducer = combineReducers({
  userMessage,
  playerList,
  activePlayerDetail,
  menu
})

export default pongReducer
