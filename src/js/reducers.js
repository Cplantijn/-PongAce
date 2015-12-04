import { combineReducers } from 'redux'
import { SCORE_POINT } from './actions'

function scores(state = [], action) {
  switch (action.type) {
    case SCORE_POINT:
      return [
        ...state,
        { player: action.player}
      ]
    default:
      return state
  }
}

const pongApp = combineReducers({
  scores
});

export default pongApp