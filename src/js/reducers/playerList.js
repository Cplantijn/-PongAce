import _ from 'underscore';
import {
  LIST_PLAYERS,
  CLEAR_PLAYER_LIST,
  START_SELECTION,
  END_SELECTION,
  HIGHLIGHT_SELECTION,
  SET_PLAYER_LIST_LOADING
} from '../actions';

export default function playerList(state = {
  players: {},
  isLoading: false
}, action) {
  let tList = state;
  switch (action.type) {
    case SET_PLAYER_LIST_LOADING:
      tList.isLoading = true;
      return {
        ...tList
      }
    case LIST_PLAYERS:
      tList.isLoading = false;
      tList.players = action.playerList;
      return {
        ...tList
      }
    case CLEAR_PLAYER_LIST:
      tList.isLoading = false;
      tList.players = {};
      return {
        ...tList
      }
    case START_SELECTION:
      var hightlightFound = false;
      for (var i = 0; i < _.size(tList.players); i++) {
        tList.players[i].highlight = false;
      }
      for (var j = 0; j < _.size(tList.players) && !hightlightFound; j++) {
        if (tList.players[j].selected === false) {
          tList.players[j].highlight = true;
          hightlightFound = true;
        }
      }
      return {
        ...tList
      }
    case END_SELECTION:
      for (var i = 0; i < _.size(tList.players); i++) {
        tList.players[i].highlight = false;
        tList.players[i].selected = false;
      }
      return {
        ...tList
      }
    case HIGHLIGHT_SELECTION:
      for (var i = 0; i < _.size(tList.players); i++) {
        tList.players[i].highlight = false;
        if (tList.players[i].id === action.id) {
          tList.players[i].highlight = true;
        }
      }
      return {
        ...tList
      }
    default:
      return state
  }
}
