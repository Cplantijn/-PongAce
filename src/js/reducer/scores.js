import { combineReducers } from 'redux'
import  {
  SHOW_OVERLAY,
  HIDE_OVERLAY,
  SHOW_MESSAGE,
  HIDE_MESSAGE,
  REMOVE_SHAKE,
  LIST_PLAYERS,
  CLEAR_PLAYER_LIST,
  SHOW_PLAYER_DETAIL,
  START_SELECTION,
  END_SELECTION,
  HIGHLIGHT_SELECTION
} from '../actions/scores'
import _ from 'underscore'


function overlay(state = {
  isOpen: false,
  activeIndex: null,
  profilesData: {
    playerList: {}
  }
}, action) {
  switch(action.type) {
    case SHOW_OVERLAY:
      var tOverlay = state;
      tOverlay.activeIndex = action.overlayIndex;
      tOverlay.isOpen = true;
      return {
        ...state,
        ...tOverlay
      }
    case HIDE_OVERLAY:
      var tOverlay = state;
      tOverlay.isOpen = false;
      return {
        ...state,
        ...tOverlay
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
    case CLEAR_PLAYER_LIST:
      var tList = {};
      return {
        ...tList
      }
    case START_SELECTION:
      var tList = state;
      var hightlightFound = false;
      for (var i = 0; i < _.size(tList); i++) {
        tList[i].highlight = false;
      }
      for (var i = 0; i < _.size(tList) && !hightlightFound; i++) {
        if (tList[i].selected == false) {
          tList[i].highlight = true;
          hightlightFound = true;
        }
      }
      return {
        ...tList
      }
    case END_SELECTION:
      var tList = state;
      for (var i = 0; i < _.size(tList); i++) {
        tList[i].highlight = false;
        tList[i].selected = false;
      }
      return {
        ...tList
      }
    case HIGHLIGHT_SELECTION:
      var tList = state;
      for (var i = 0; i < _.size(tList); i++) {
        tList[i].highlight = false;
        if (tList[i].id == action.id) {
          tList[i].highlight = true;
        }
      }
      return {
        ...tList
      }
    default:
      return state
  }
}

function game(state = {
  active: false,
  hasFinished: false
}, action) {
  switch (action.type) {
    default:
      return state
  }
}

function playerGroup( state =  {
    groupOne: {
        playerOne:{
          id: null,
          selecting: false,
          active: false,
          name: null,
          standard_pose: null,
          winning_pose: null
        },
        playerTwo:{
          id: null,
          selecting: false,
          active: false,
          name: null,
          standard_pose: null,
          winning_pose: null
        }
    },
    groupTwo: {
        playerOne:{
          id: null,
          active: false,
          selecting: false,
          name: null,
          standard_pose: null,
          winning_pose: null
        },
        playerTwo:{
          id: null,
          active: false,
          selecting: false,
          name: null,
          standard_pose: null,
          winning_pose: null
        }
    },
    isSelecting: false,
    highlightId: null
  }, action) {
  switch (action.type) {
    case START_SELECTION:
      var tPong = state;
      tPong.isSelecting = true;
      tPong.groupOne.playerOne.selecting = false;
      tPong.groupOne.playerTwo.selecting = false;
      tPong.groupTwo.playerOne.selecting = false;
      tPong.groupTwo.playerTwo.selecting = false;
      tPong[action.group][action.player].selecting = true;
      tPong.highlightId = null;
      tPong.selectingGroup = action.group;
      tPong.selectingPlayer = action.player;
      return {
        ...tPong
      }
    case END_SELECTION:
      var tPong = state;
      tPong.isSelecting = false;
      tPong.groupOne.playerOne.selecting = false;
      tPong.groupOne.playerTwo.selecting = false;
      tPong.groupTwo.playerOne.selecting = false;
      tPong.groupTwo.playerTwo.selecting = false;
      tPong.highlightId = null;
      return {
        ...tPong
      }
    case HIGHLIGHT_SELECTION:
      var tPong = state;
      tPong.highlightId = action.id;
      return {
        ...tPong
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
  game,
  playerList,
  playerGroup,
  activePlayerDetail,
  overlay
})

export default pongReducer
