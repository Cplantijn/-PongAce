import { combineReducers } from 'redux';

// "Sub" reducers...
import overlay from './overlay';
import userMessage from './userMessage';
import playerList from './playerList';
import showcasedPlayer from './showcasedPlayer';
import game from './game';

const pongReducer = combineReducers({
  userMessage,
  playerList,
  game,
  showcasedPlayer,
  overlay
});

export default pongReducer;
