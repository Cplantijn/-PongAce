import  {
  SHOW_PLAYER_DETAIL
} from '../actions';

export default function showcasedPlayer(state = {}, action) {
  let tPlayer = action.playerInfo;
  switch (action.type) {
    case SHOW_PLAYER_DETAIL:
      return {
        ...tPlayer
      }
    default:
      return state
  }
}
