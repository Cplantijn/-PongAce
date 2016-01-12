import  {
  SHOW_OVERLAY,
  HIDE_OVERLAY
} from '../actions';


export default function overlay(state = {
  isOpen: false,
  activeIndex: null,
  profilesData: {
    playerList: {}
  }
}, action) {
  let tOverlay = state;
  switch(action.type) {
    case SHOW_OVERLAY:
      tOverlay.activeIndex = action.overlayIndex;
      tOverlay.isOpen = true;
      return {
        ...tOverlay
      }
    case HIDE_OVERLAY:
      tOverlay.isOpen = false;
      return {
        ...tOverlay
      }
    default:
      return state;
  }
}
