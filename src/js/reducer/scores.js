import  { ADD_POINT } from '../actions/scores'

const initialState = {
  score: 0
}

function scores(state = initialState, action) {
  switch(action.type) {
    case ADD_POINT:
      console.log(state);
      return {
        ...state,
        score: state.score + 1
      }
    default:
      return state
  }
}

export default scores
