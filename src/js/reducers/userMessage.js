import {
  SHOW_MESSAGE,
  HIDE_MESSAGE,
  REMOVE_SHAKE
} from '../actions/scores';

export function userMessage(state = {
  isShowing: false,
  type: null,
  message: null,
  shake: false
}, action) {
  switch(action.type) {
    case SHOW_MESSAGE:
      let tMsg = state;
      const sameType = tMsg.type == action.messageType;
      const sameMsg = tMsg.message == action.message;

      if (tMsg.isShowing && sameType && sameMsg) {
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
      let tMsg = state;
      tMsg.isShowing = false;
      tMsg.shake = false;
      return {
        ...state,
        ...tMsg
      }
    case REMOVE_SHAKE:
      let tMsg = state;
      tMsg.shake = false;
      return {
        ...state,
        ...tMsg
      }
    default:
      return state;
  }
}
