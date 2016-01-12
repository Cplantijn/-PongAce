import { combineReducers } from 'redux';
import { Howl } from 'howler';
import musicOpts from '../../sound/game_music';
import _ from 'underscore';

// "Sub" reducers...
import overlay from './overlay';
import userMessage from './userMessage';
import playerList from './playerList';
import showcasePlayer from './showcasePlayer';

import  {
  JOIN_GROUP,
  RESET_GROUPS,
  START_SELECTION,
  END_SELECTION,
  HIGHLIGHT_SELECTION,
  READY_UP,
  START_GAME,
  END_GAME,
  MODIFY_POINT,
  CHANGE_GAME_POINT,
  CHANGE_SERVE_INTERVAL,
  FETCH_SETTINGS
} from '../actions/scores';

var howl = new Howl(musicOpts);


const initialGroupState = {
  groupOne: {
      playerOne:{
        id: null,
        active: false,
        selecting: false,
        name: null,
        standardPose: null,
        winningPose: null
      },
      playerTwo:{
        id: null,
        active: false,
        selecting: false,
        contracted: true,
        name: null,
        standardPose: null,
        winningPose: null
      },
      ready: false,
      score: 0,
      rawScore: 0,
      up: false,
      serving: false
  },
  groupTwo: {
      playerOne:{
        id: null,
        active: false,
        selecting: false,
        name: null,
        standardPose: null,
        winningPose: null
      },
      playerTwo:{
        id: null,
        active: false,
        selecting: false,
        contracted: true,
        name: null,
        standardPose: null,
        winningPose: null
      },
      ready: false,
      score: 0,
      rawScore: 0,
      up: false,
      serving: false
  },
  isSelecting: false,
  highlightId: null,
  selectedIds: [],
  game: {
    active: false,
    ended: false,
    gamePoint: 21,
    serveInterval: 5,
    lastSwitchPoint: 0
  },
  winner: null
}

function playerGroup( state = initialGroupState, action) {
  switch (action.type) {
    case START_SELECTION:
      var tGrp = state;
      tGrp.isSelecting = true;
      tGrp.groupOne.playerOne.selecting = false;
      tGrp.groupOne.playerTwo.selecting = false;
      tGrp.groupTwo.playerOne.selecting = false;
      tGrp.groupTwo.playerTwo.selecting = false;
      tGrp[action.group][action.player].selecting = true;
      tGrp.highlightId = null;
      tGrp.selectingGroup = action.group;
      tGrp.selectingPlayer = action.player;
      if (action.player == 'playerTwo') {
        tGrp[action.group][action.player].contracted = false;
      }
      return {
        ...tGrp
      }
    case END_SELECTION:
      var tGrp = state;
      tGrp.isSelecting = false;
      tGrp.groupOne.playerOne.selecting = false;
      tGrp.groupOne.playerTwo.selecting = false;
      tGrp.groupTwo.playerOne.selecting = false;
      tGrp.groupTwo.playerTwo.selecting = false;
      tGrp.highlightId = null;
      tGrp.selectingGroup = null;
      tGrp.selectingPlayer = null;
      return {
        ...tGrp
      }
    case HIGHLIGHT_SELECTION:
      var tGrp = state;
      tGrp.highlightId = action.id;
      return {
        ...tGrp
      }
    case JOIN_GROUP:
      var tGrp = state;
      tGrp.selectedIds = [];
      tGrp[action.group][action.player].id = action.id;
      tGrp[action.group][action.player].name = action.name;
      tGrp[action.group][action.player].standardPose = action.standardPose;
      tGrp[action.group][action.player].winningPose = action.winningPose;
      tGrp[action.group][action.player].selecting = false;
      tGrp[action.group][action.player].active = true;
      _.each(tGrp, function(group, key) {
        if (key == 'groupOne' || key == 'groupTwo') {
          if (group.playerOne.id) {
            tGrp.selectedIds = tGrp.selectedIds.concat(group.playerOne.id);
          }
          if (group.playerTwo.id) {
            tGrp.selectedIds = tGrp.selectedIds.concat(group.playerTwo.id);
          }
        }
      });
      return {
        ...tGrp
      }
    case RESET_GROUPS:
      var tGrp = state;
      tGrp.groupOne.ready = false;
      tGrp.groupTwo.ready = false;
      tGrp.groupOne.score = 0;
      tGrp.groupTwo.score = 0;
      tGrp.groupOne.rawScore = 0;
      tGrp.groupTwo.rawScore = 0;
      tGrp.groupOne.serving = false;
      tGrp.groupTwo.serving = false;
      tGrp.groupOne.up = false;
      tGrp.groupTwo.up = false;

      tGrp.groupOne.playerOne.active = false;
      tGrp.groupOne.playerOne.id = null;
      tGrp.groupOne.playerOne.name = null;
      tGrp.groupOne.playerOne.standardPose = null;
      tGrp.groupOne.playerOne.winningPose = null;
      tGrp.groupOne.playerOne.selecting = false;

      tGrp.groupOne.playerTwo.active = false;
      tGrp.groupOne.playerTwo.id = null;
      tGrp.groupOne.playerTwo.name = null;
      tGrp.groupOne.playerTwo.standardPose = null;
      tGrp.groupOne.playerTwo.winningPose = null;
      tGrp.groupOne.playerTwo.selecting = false;
      tGrp.groupOne.playerTwo.contracted = true;


      tGrp.groupTwo.playerOne.active = false;
      tGrp.groupTwo.playerOne.id = null;
      tGrp.groupTwo.playerOne.name = null;
      tGrp.groupTwo.playerOne.standardPose = null;
      tGrp.groupTwo.playerOne.winningPose = null;
      tGrp.groupTwo.playerOne.selecting = false;

      tGrp.groupTwo.playerTwo.active = false;
      tGrp.groupTwo.playerTwo.id = null;
      tGrp.groupTwo.playerTwo.name = null;
      tGrp.groupTwo.playerTwo.standardPose = null;
      tGrp.groupTwo.playerTwo.winningPose = null;
      tGrp.groupTwo.playerTwo.selecting = false;
      tGrp.groupTwo.playerTwo.contracted = true;


      tGrp.isSelecting = false;
      tGrp.game.active = false;
      tGrp.game.ended = false;
      tGrp.selectingGroup = null;
      tGrp.selectingPlayer = null;
      tGrp.selectedIds =[];
      tGrp.winner = null;
      return {
        ...tGrp
      }
    case READY_UP:
      var tGrp = state;

      if (!tGrp.groupOne.ready && !tGrp.groupTwo.ready) {
        tGrp[action.side].serving = true;
      }

      tGrp[action.side].ready = !tGrp[action.side].ready;

      if (tGrp.groupOne.ready && tGrp.groupTwo.ready) {
        tGrp.game.active = true;
      }

      return {
        ...tGrp
      }
    case START_GAME:
      var tGrp = state;
      tGrp.game.active = true;
      tGrp.game.ended = false;
      tGrp.game.lastSwitchPoint = 0;
      tGrp.winner = null;
      tGrp.groupOne.score = 0;
      tGrp.groupTwo.score = 0;
      tGrp.groupOne.rawScore = 0;
      tGrp.groupTwo.rawScore = 0;

      return {
        ...tGrp
      }
    case END_GAME:
      var tGrp = state;
      tGrp.game.active = false;
      tGrp.game.ended = true;
      tGrp.groupOne.ready = false;
      tGrp.groupTwo.ready = false;
      tGrp.game.lastSwitchPoint = 0;
      return {
        ...tGrp
      }
    case MODIFY_POINT:
      var tGrp = state;
      var { gamePoint } = tGrp.game;
      var value = action.event == 'ADD' ? 1 : -1;
      var rawScore = tGrp[action.group].rawScore + value;
      tGrp[action.group].rawScore = rawScore > -1 ? rawScore: 0;

      tGrp[action.group].score = tGrp[action.group].rawScore > gamePoint ? gamePoint : tGrp[action.group].rawScore;

      var totalScore = tGrp.groupOne.score + tGrp.groupTwo.score;

      if (action.event == 'ADD') {
        if ((totalScore % tGrp.game.serveInterval == 0) && (totalScore == tGrp.game.lastSwitchPoint + tGrp.game.serveInterval)) {
          howl.play('switch_serve');
          tGrp.groupOne.serving = !tGrp.groupOne.serving;
          tGrp.groupTwo.serving = !tGrp.groupTwo.serving;
          tGrp.game.lastSwitchPoint = totalScore;
        }
      } else {
        if (totalScore == tGrp.game.lastSwitchPoint - 1) {
          //TODO Remove this logic from reducer
          howl.play('switch_serve');
          tGrp.groupOne.serving = !tGrp.groupOne.serving;
          tGrp.groupTwo.serving = !tGrp.groupTwo.serving;
          tGrp.game.lastSwitchPoint = tGrp.game.lastSwitchPoint - tGrp.game.serveInterval;
        }
      }

      //TODO: Please do a better job here, i get it you havnt slept in a while.
      var oneScore = tGrp.groupOne.score;
      var twoScore = tGrp.groupTwo.score;
      var oneRawScore = tGrp.groupOne.rawScore;
      var twoRawScore = tGrp.groupTwo.rawScore;

      var group = action.group;

      if (oneScore == gamePoint - 1) {
        tGrp.groupTwo.serving = true;
        tGrp.groupOne.serving = false;
      } else if (twoScore == gamePoint - 1) {
        tGrp.groupOne.serving = true;
        tGrp.groupTwo.serving = false;
      }

      if (oneRawScore == twoRawScore) {
        tGrp.groupOne.up = false;
        tGrp.groupTwo.up = false;
      }

      if (oneRawScore == twoRawScore + 1 && oneRawScore >= gamePoint) {
        tGrp.groupOne.up = true;
        tGrp.groupTwo.up = false;
        tGrp.groupOne.serving = false;
        tGrp.groupTwo.serving = true;
      }

      if (twoRawScore == oneRawScore + 1 && twoRawScore >= gamePoint) {
        tGrp.groupOne.up = false;
        tGrp.groupTwo.up = true;
        tGrp.groupOne.serving = true;
        tGrp.groupTwo.serving = false;
      }

      if ((oneRawScore >= (twoRawScore + 2)) && oneRawScore >= gamePoint) {
        tGrp.groupOne.up = false;
        tGrp.groupTwo.up = false;
        tGrp.winner = 'groupOne';
        tGrp.game.active = false;
      }

      if ((twoRawScore >= (oneRawScore + 2)) && twoRawScore >= gamePoint) {
        tGrp.groupOne.up = false;
        tGrp.groupTwo.up = false;
        tGrp.winner = 'groupTwo';
        tGrp.game.active = false;
      }

      return {
        ...tGrp
      }
    case CHANGE_GAME_POINT:
      var tGrp = state;
      tGrp.game.gamePoint = action.point;

      return {
        ...tGrp
      }
    case CHANGE_SERVE_INTERVAL:
      var tGrp = state;
      tGrp.game.serveInterval = action.point;

      return {
        ...tGrp
      }
    case FETCH_SETTINGS:
      var tGrp = state;
      tGrp.game.gamePoint = action.settings.gamePoint;
      tGrp.game.serveInterval = action.settings.serveInterval;
      return {
        ...tGrp
      }

    default:
      return state
  }
}

const pongReducer = combineReducers({
  userMessage,
  playerList,
  playerGroup,
  showcasePlayer,
  overlay
})

export default pongReducer
