import  {
  ADD_POINT,
  ADD_TEAM,
  SHOW_MENU,
  HIDE_MENU
} from '../actions/scores'
import _ from 'underscore'

const initialState = {
  gameActive: false,
  menuOpen: false,
  menu: {
    activeIndex: null
  },
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
        ...state
      }
    case SHOW_MENU:
      var tMenu = state.menu
      tMenu.activeIndex = action.menuIndex
      return {
        ...state,
        menuOpen: true,
        menu: tMenu
      }
    case HIDE_MENU:
      return {
        ...state,
        menuOpen: false
      }
    default:
      return state
  }
}

export default reducer
