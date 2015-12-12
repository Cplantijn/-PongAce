import { combineReducers } from 'redux'
import  {
  SHOW_MENU,
  HIDE_MENU,
  SHOW_MESSAGE,
  HIDE_MESSAGE,
  REMOVE_SHAKE
} from '../actions/scores'
import _ from 'underscore'


function pong(state = {}, action) {

}

function menu(state = {
  isOpen: false,
  activeIndex: null,
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
        ...menu
      }
    default:
      return state;
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
      if (tMsg.isShowing == true) {
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
      tMsg.message = '';
      tMsg.type = null;
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
  menu
})

export default pongReducer
