import { combineReducers } from 'redux';

// "Sub" reducers...
import overlay from './overlay';
import userMessage from './userMessage';
import playerList from './playerList';
import showcasedPlayer from './showcasedPlayer';
import imageSelectModal from './imageSelectModal';
import game from './game';
import history from './history';

const pongReducer = combineReducers({
  userMessage,
  playerList,
  game,
  history,
  showcasedPlayer,
  imageSelectModal,
  overlay
});

export default pongReducer;
