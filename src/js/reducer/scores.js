import  { ADD_POINT, ADD_TEAM } from '../actions/scores'
import _ from 'underscore'

const initialState = {
  gameActive: false,
  teamData: {},
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
      let teamData = state.teamData
      let userMessage = state.userMessage

      if (_.size(teamData) < 2) {
        teamData[_.size(teamData)] = {
          id: _.size(teamData),
          name: action.name,
          isServing: false,
          players: [],
          score: 0
        }
      } else {
        userMessage.active = true
        userMessage.messages.push({
          id: userMessage.messages.length,
          type: 'warning',
          content: 'You can\'t have more than two teams playing each other.',
          hideTimeout: 2000
        })

      }
      return {
        ...state,
        teamData: teamData,
        userMessage: userMessage,
      }
    default:
      return state
  }
}

export default reducer
