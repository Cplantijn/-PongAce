import { combineReducers } from 'redux'
import  {
  ADD_POINT,
  ADD_TEAM,
  SHOW_MENU,
  HIDE_MENU,
  CREATE_NEW_PLAYER,
  CREATING_PLAYER,
  CREATED_PLAYER,
  SHOW_MESSAGE
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
        menu: tMenu
      }
    case HIDE_MENU:
      var tMenu = state;
      tMenu.isOpen = false;
      return {
        ...state,
        menu: tMenu
      }
    default:
      return state;
  }
}

function message(state = {
  isShowing: false,
  type: null,
  message: ''
}, action) {
  switch(action.type) {
    case SHOW_MESSAGE:
      return Object.assign({}, state, {
        isShowing: true,
        type: action.messageType,
        message: action.message
      })
    default:
      return state;
  }
}

const pongReducer = combineReducers({
  message,
  menu
})

export default pongReducer
