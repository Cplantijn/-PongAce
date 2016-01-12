import {
  SHOW_MESSAGE,
  HIDE_MESSAGE,
  REMOVE_SHAKE
} from '../actions/scores';

export default function userMessage(state = {
  isShowing: false,
  type: null,
  message: null,
  shake: false
}, action) {
  let tMsg = state;
  switch(action.type) {
    case SHOW_MESSAGE:
      const sameType = tMsg.type == action.messageType;
      const sameMsg = tMsg.message == action.message;

      if (tMsg.isShowing && sameType && sameMsg) {
        tMsg.shake = true;
      }
      tMsg.isShowing = true;
      tMsg.message = action.message;
      tMsg.type = action.messageType;
      return {
        ...tMsg
      }
    case HIDE_MESSAGE:
      tMsg.isShowing = false;
      tMsg.shake = false;
      return {
        ...tMsg
      }
    case REMOVE_SHAKE:
      tMsg.shake = false;
      return {
        ...tMsg
      }
    default:
      return state;
  }
}
