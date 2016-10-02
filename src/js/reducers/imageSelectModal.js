import {
  SHOW_IMAGE_SELECT_MODAL,
  CLOSE_IMAGE_SELECT_MODAL,
  SHOW_WEBCAM_UNAVAILABLE,
  SHOW_WEBCAM_AVAILABLE,
  UPLOAD_PLAYER_PIC_COUNTDOWN
} from '../actions';

export default function imageSelectModal(state = {
  isOpen: false,
  isCameraEnabled: false
}, action) {
  let tModal = state;
  switch (action.type) {
    case SHOW_IMAGE_SELECT_MODAL:
      tModal.isOpen = true;
      tModal.picType = action.picType;
      tModal.cameraCountDown = null;
      return {
        ...tModal
      }
    case CLOSE_IMAGE_SELECT_MODAL:
      tModal.isOpen = false;
      tModal.cameraCountDown = null;
      return {
        ...tModal
      }
    case SHOW_WEBCAM_UNAVAILABLE:
      tModal.isCameraEnabled = false;
      tModal.cameraCountDown = null;
      return {
        ...tModal
      }
    case SHOW_WEBCAM_AVAILABLE:
      tModal.isCameraEnabled = true;
      tModal.cameraCountDown = null;
      return {
        ...tModal
      }
    case UPLOAD_PLAYER_PIC_COUNTDOWN:
      tModal.cameraCountDown = action.count;
      return {
        ...tModal
      }
    default:
      return state
  }
}
