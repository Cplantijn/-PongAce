import _ from 'underscore';
import { Howl } from 'howler';
import musicOpts from '../../sound/pong_music';

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
} from '../actions';

const howl = new Howl(musicOpts);

const initGameState = {
  active: false,
  ended: false,
  gamePoint: 21,
  serveInterval: 5,
  lastSwitchPoint: 0,
  winner: null,
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
  selectedIds: []
}

export default function game( state = initGameState, action) {
  switch (action.type) {
    case START_SELECTION:
      var tGame = state;
      tGame.isSelecting = true;
      tGame.groupOne.playerOne.selecting = false;
      tGame.groupOne.playerTwo.selecting = false;
      tGame.groupTwo.playerOne.selecting = false;
      tGame.groupTwo.playerTwo.selecting = false;
      tGame[action.group][action.player].selecting = true;
      tGame.highlightId = null;
      tGame.selectingGroup = action.group;
      tGame.selectingPlayer = action.player;
      if (action.player == 'playerTwo') {
        tGame[action.group][action.player].contracted = false;
      }
      return {
        ...tGame
      }
    case END_SELECTION:
      var tGame = state;
      tGame.isSelecting = false;
      tGame.groupOne.playerOne.selecting = false;
      tGame.groupOne.playerTwo.selecting = false;
      tGame.groupTwo.playerOne.selecting = false;
      tGame.groupTwo.playerTwo.selecting = false;
      tGame.highlightId = null;
      tGame.selectingGroup = null;
      tGame.selectingPlayer = null;
      return {
        ...tGame
      }
    case HIGHLIGHT_SELECTION:
      var tGame = state;
      tGame.highlightId = action.id;
      return {
        ...tGame
      }
    case JOIN_GROUP:
      var tGame = state;
      tGame.selectedIds = [];
      tGame[action.group][action.player].id = action.id;
      tGame[action.group][action.player].name = action.name;
      tGame[action.group][action.player].standardPose = action.standardPose;
      tGame[action.group][action.player].winningPose = action.winningPose;
      tGame[action.group][action.player].selecting = false;
      tGame[action.group][action.player].active = true;
      _.each(tGame, function(group, key) {
        if (key == 'groupOne' || key == 'groupTwo') {
          if (group.playerOne.id) {
            tGame.selectedIds = tGame.selectedIds.concat(group.playerOne.id);
          }
          if (group.playerTwo.id) {
            tGame.selectedIds = tGame.selectedIds.concat(group.playerTwo.id);
          }
        }
      });
      return {
        ...tGame
      }
    case RESET_GROUPS:
      var tGame = state;
      tGame.groupOne.ready = false;
      tGame.groupTwo.ready = false;
      tGame.groupOne.score = 0;
      tGame.groupTwo.score = 0;
      tGame.groupOne.rawScore = 0;
      tGame.groupTwo.rawScore = 0;
      tGame.groupOne.serving = false;
      tGame.groupTwo.serving = false;
      tGame.groupOne.up = false;
      tGame.groupTwo.up = false;

      tGame.groupOne.playerOne.active = false;
      tGame.groupOne.playerOne.id = null;
      tGame.groupOne.playerOne.name = null;
      tGame.groupOne.playerOne.standardPose = null;
      tGame.groupOne.playerOne.winningPose = null;
      tGame.groupOne.playerOne.selecting = false;

      tGame.groupOne.playerTwo.active = false;
      tGame.groupOne.playerTwo.id = null;
      tGame.groupOne.playerTwo.name = null;
      tGame.groupOne.playerTwo.standardPose = null;
      tGame.groupOne.playerTwo.winningPose = null;
      tGame.groupOne.playerTwo.selecting = false;
      tGame.groupOne.playerTwo.contracted = true;


      tGame.groupTwo.playerOne.active = false;
      tGame.groupTwo.playerOne.id = null;
      tGame.groupTwo.playerOne.name = null;
      tGame.groupTwo.playerOne.standardPose = null;
      tGame.groupTwo.playerOne.winningPose = null;
      tGame.groupTwo.playerOne.selecting = false;

      tGame.groupTwo.playerTwo.active = false;
      tGame.groupTwo.playerTwo.id = null;
      tGame.groupTwo.playerTwo.name = null;
      tGame.groupTwo.playerTwo.standardPose = null;
      tGame.groupTwo.playerTwo.winningPose = null;
      tGame.groupTwo.playerTwo.selecting = false;
      tGame.groupTwo.playerTwo.contracted = true;


      tGame.isSelecting = false;
      tGame.active = false;
      tGame.ended = false;
      tGame.selectingGroup = null;
      tGame.selectingPlayer = null;
      tGame.selectedIds =[];
      tGame.winner = null;
      return {
        ...tGame
      }
    case READY_UP:
      var tGame = state;

      if (!tGame.groupOne.ready && !tGame.groupTwo.ready) {
        tGame[action.side].serving = true;
      }

      tGame[action.side].ready = !tGame[action.side].ready;

      if (tGame.groupOne.ready && tGame.groupTwo.ready) {
        tGame.active = true;
      }

      return {
        ...tGame
      }
    case START_GAME:
      var tGame = state;
      tGame.active = true;
      tGame.ended = false;
      tGame.lastSwitchPoint = 0;
      tGame.winner = null;
      tGame.groupOne.score = 0;
      tGame.groupTwo.score = 0;
      tGame.groupOne.rawScore = 0;
      tGame.groupTwo.rawScore = 0;

      return {
        ...tGame
      }
    case END_GAME:
      var tGame = state;
      tGame.active = false;
      tGame.ended = true;
      tGame.groupOne.ready = false;
      tGame.groupTwo.ready = false;
      tGame.lastSwitchPoint = 0;
      return {
        ...tGame
      }
    case MODIFY_POINT:
      var tGame = state;
      var { gamePoint } = tGame;
      var value = action.event == 'ADD' ? 1 : -1;
      var rawScore = tGame[action.group].rawScore + value;
      tGame[action.group].rawScore = rawScore > -1 ? rawScore: 0;

      tGame[action.group].score = tGame[action.group].rawScore > gamePoint ? gamePoint : tGame[action.group].rawScore;

      var totalScore = tGame.groupOne.score + tGame.groupTwo.score;

      if (action.event == 'ADD') {
        if ((totalScore % tGame.serveInterval == 0) && (totalScore == tGame.lastSwitchPoint + tGame.serveInterval)) {
          howl.play('switch_serve');
          tGame.groupOne.serving = !tGame.groupOne.serving;
          tGame.groupTwo.serving = !tGame.groupTwo.serving;
          tGame.lastSwitchPoint = totalScore;
        }
      } else {
        if (totalScore == tGame.lastSwitchPoint - 1) {
          //TODO Remove this logic from reducer
          howl.play('switch_serve');
          tGame.groupOne.serving = !tGame.groupOne.serving;
          tGame.groupTwo.serving = !tGame.groupTwo.serving;
          tGame.lastSwitchPoint = tGame.lastSwitchPoint - tGame.serveInterval;
        }
      }

      //TODO: Please do a better job here, i get it you havnt slept in a while.
      var oneScore = tGame.groupOne.score;
      var twoScore = tGame.groupTwo.score;
      var oneRawScore = tGame.groupOne.rawScore;
      var twoRawScore = tGame.groupTwo.rawScore;

      var group = action.group;

      if (oneScore == gamePoint - 1) {
        tGame.groupTwo.serving = true;
        tGame.groupOne.serving = false;
      } else if (twoScore == gamePoint - 1) {
        tGame.groupOne.serving = true;
        tGame.groupTwo.serving = false;
      }

      if (oneRawScore == twoRawScore) {
        tGame.groupOne.up = false;
        tGame.groupTwo.up = false;
      }

      if (oneRawScore == twoRawScore + 1 && oneRawScore >= gamePoint) {
        tGame.groupOne.up = true;
        tGame.groupTwo.up = false;
        tGame.groupOne.serving = false;
        tGame.groupTwo.serving = true;
      }

      if (twoRawScore == oneRawScore + 1 && twoRawScore >= gamePoint) {
        tGame.groupOne.up = false;
        tGame.groupTwo.up = true;
        tGame.groupOne.serving = true;
        tGame.groupTwo.serving = false;
      }

      if ((oneRawScore >= (twoRawScore + 2)) && oneRawScore >= gamePoint) {
        tGame.groupOne.up = false;
        tGame.groupTwo.up = false;
        tGame.winner = 'groupOne';
        tGame.active = false;
      }

      if ((twoRawScore >= (oneRawScore + 2)) && twoRawScore >= gamePoint) {
        tGame.groupOne.up = false;
        tGame.groupTwo.up = false;
        tGame.winner = 'groupTwo';
        tGame.active = false;
      }

      return {
        ...tGame
      }
    case CHANGE_GAME_POINT:
      var tGame = state;
      tGame.gamePoint = action.point;

      return {
        ...tGame
      }
    case CHANGE_SERVE_INTERVAL:
      var tGame = state;
      tGame.serveInterval = action.point;

      return {
        ...tGame
      }
    case FETCH_SETTINGS:
      var tGame = state;
      tGame.gamePoint = action.settings.gamePoint;
      tGame.serveInterval = action.settings.serveInterval;
      return {
        ...tGame
      }

    default:
      return state
  }
}
