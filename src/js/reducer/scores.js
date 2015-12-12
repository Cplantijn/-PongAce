import  {
  ADD_POINT,
  ADD_TEAM,
  SHOW_MENU,
  HIDE_MENU,
  CREATE_NEW_PLAYER,
  CREATING_PLAYER,
  CREATED_PLAYER,
  SHOW_MESSAGE
} from '../actions/scores'
import _ from 'underscore'

const initialState = {
  gameActive: false,
  menuOpen: false,
  menu: {
    activeIndex: null,
    profilesData: {
    }
  },
  cardData: {
    cardOneData: {},
    cardTwoData: {},
  },
  userMessage: {
    type: null,
    show: false,
    message: null,
    shake: false
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
      var tMenu = state.menu;
      tMenu.activeIndex = action.menuIndex;
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
    case CREATING_PLAYER:
      return {
        ...state,
        isCreatingPlayer: true
      }
    case CREATE_NEW_PLAYER:
      return {
        ...state
      }
    case CREATED_PLAYER:
      return {
        ...state
      }
    case SHOW_MESSAGE:
      var tUserMessage = state.userMessage;
      tUserMessage.message = action.message;
      if (tUserMessage.show == true) {
        tUserMessage.shake = true;
      }
      tUserMessage.type = action.messageType
      tUserMessage.show = true;
      return {
        ...state,
        userMessage: tUserMessage
      }
    default:
      return state
  }
}

export default reducer
