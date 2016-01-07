import  {
  SHOW_OVERLAY,
  HIDE_OVERLAY
} from '../actions/scores';


export function overlay(state = {
  isOpen: false,
  activeIndex: null,
  profilesData: {
    playerList: {}
  }
}, action) {
  switch(action.type) {
    case SHOW_OVERLAY:
      let tOverlay = state;
      tOverlay.activeIndex = action.overlayIndex;
      tOverlay.isOpen = true;
      return {
        ...state,
        ...tOverlay
      }
    case HIDE_OVERLAY:
      let tOverlay = state;
      tOverlay.isOpen = false;
      return {
        ...state,
        ...tOverlay
      }
    default:
      return state;
  }
}
