import _ from 'underscore';
import {
  LIST_PLAYERS,
  CLEAR_PLAYER_LIST,
  START_SELECTION,
  END_SELECTION,
  HIGHLIGHT_SELECTION
} from '../actions';

export default function playerList(state = {}, action) {
  let tList = action.playerList;
  switch (action.type) {
    case LIST_PLAYERS:
      return {
        ...tList
      }
    case CLEAR_PLAYER_LIST:
      tList = {};
      return {
        ...tList
      }
    case START_SELECTION:
      var hightlightFound = false;
      for (var i = 0; i < _.size(tList); i++) {
        tList[i].highlight = false;
      }
      for (var j = 0; j < _.size(tList) && !hightlightFound; j++) {
        if (tList[j].selected == false) {
          tList[j].highlight = true;
          hightlightFound = true;
        }
      }
      return {
        ...tList
      }
    case END_SELECTION:
      for (var i = 0; i < _.size(tList); i++) {
        tList[i].highlight = false;
        tList[i].selected = false;
      }
      return {
        ...tList
      }
    case HIGHLIGHT_SELECTION:
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
