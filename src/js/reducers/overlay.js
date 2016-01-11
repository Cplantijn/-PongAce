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
        ...tOverlay
      }
    case HIDE_OVERLAY:
      let tOverlay = state;
      tOverlay.isOpen = false;
      return {
        ...tOverlay
      }
    default:
      return state;
  }
}
