import  { ADD_POINT, ADD_TEAM } from '../actions/scores'
import _ from 'underscore'

const initialState = {
  gameActive: false,
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
    default:
      return state
  }
}

export default reducer
