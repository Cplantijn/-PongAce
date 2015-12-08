import  {
  ADD_POINT,
  ADD_TEAM,
  SHOW_PLAYER_MODAL,
  HIDE_PLAYER_MODAL
} from '../actions/scores'
import _ from 'underscore'

const initialState = {
  gameActive: false,
  playerModalShown: false,
  cardData: {
    cardOneData: {},
    cardTwoData: {},
  },
  userMessage: {
    active: false,
    messages: []
  }
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case ADD_POINT:
      return {
        ...state
      }
    case ADD_TEAM:
      return {
        ...state,
      }
    case SHOW_PLAYER_MODAL:
      return {
        ...state,
        playerModalShown: true,
      }
    case HIDE_PLAYER_MODAL:
    return {
      ...state,
      playerModalShown: false,
    }
    default:
      return state
  }
}

export default reducer
