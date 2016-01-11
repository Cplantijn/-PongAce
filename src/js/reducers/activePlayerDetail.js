import  {
  SHOW_PLAYER_DETAIL,
} from '../actions/scores';


export function activePlayerDetail(state = {}, action) {
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
