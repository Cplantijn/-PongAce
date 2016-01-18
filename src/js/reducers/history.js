import  {
  SHOW_GAME_HISTORY,
} from '../actions';


export default function history(state = {}, action) {
  let tHistory = state;
  switch(action.type) {
    case SHOW_GAME_HISTORY:
      tHistory = action.history;
      return {
        ...tHistory
      }
    default:
      return state;
  }
}
