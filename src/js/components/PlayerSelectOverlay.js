import React, { Component } from 'react'
import PlayerTileRow from './PlayerTileRow'
import classNames from 'classNames'
import _ from 'underscore'
import { Howl, Howler } from 'howler'
import FontAwesome from 'react-fontawesome'
import PlayerGroup from './PlayerGroup'

export default class PlayerSelectOverlay extends Component {
  constructor(props) {
    super(props);
    this.howler = new Howl({
      urls: ['../sound/smash_theme.mp3', '../sound/smash_theme.ogg']
    });
  }
  componentDidMount() {
    //this.howler.play();
    document.addEventListener('keydown', this._handleKeyDown.bind(this));
  }
  componentWillUnmount() {
    var { hideMessage, endSelection } = this.props;
    hideMessage();
    endSelection();
    //this.howler.stop();
    document.removeEventListener('keydown', this._handleKeyDown.bind(this));
  }
  _resetGroups() {
    var { resetGroups } = this.props;
    resetGroups();
  }
  _handleKeyDown(e) {
    var { playerGroup, playerList, highlightSelection, joinGroup } = this.props;
    var { highlightId, selectingPlayer, selectingGroup, isSelecting } = playerGroup;

    var key = e.which;
    var acceptKeys = [37, 38, 39, 40, 13]; //Left, Up, Right, Down, Enter
    if (isSelecting) {
      if (acceptKeys.indexOf(key) > -1){
        if (key == 13) {
          var player = null;
          for (var i = 0; i < _.size(playerList); i++) {
            if (playerList[i].highlight) {
              player = playerList[i];
            }
          }
          var {id, name, standardPose, winningPose } = player;

          joinGroup(selectingGroup, selectingPlayer, id, name, standardPose, winningPose);
        } else {
          var currentSelectionId = playerGroup.highlightId,
              currentSelectIndex, selectionFound = false;

          if (currentSelectionId == null) {
            for (var i = 0; i < _.size(playerList); i++) {
              if (playerList[i].highlight) {
                currentSelectionId = playerList[i].id;
                highlightSelection(playerList[i].id);
              }
            }
          }

          for (var i = 0; i < _.size(playerList) && !selectionFound; i++) {
              if (playerList[i].id == currentSelectionId) {
                currentSelectIndex = i;
                selectionFound == true;
              }
          }
          //Left key
          if (key == 37 && currentSelectIndex > 0) {
            currentSelectIndex = currentSelectIndex - 1;
          } else if (key == 38 && currentSelectIndex > 9) {
            currentSelectIndex = currentSelectIndex - 10;
          } else if (key == 39 && (_.size(playerList) > currentSelectIndex + 1)) {
            currentSelectIndex = currentSelectIndex + 1;
          } else if (key == 40 && (_.size(playerList) > currentSelectIndex + 10)) {
            currentSelectIndex = currentSelectIndex + 10;
          }
          highlightSelection(playerList[currentSelectIndex].id);
        }
      }
    }
  }
  render() {
    var { startSelection, playerList, playerGroup, highlightSelection,
          playerGroup, selectingGroup, selectingPlayer, joinGroup } = this.props;
    var playerRows = null, playerContainer = null, row = 0;


    if (_.size(playerList) > 0) {
      playerContainer = _.groupBy(playerList, function(player, i) {
        if (i % 10 == 0) {
          row ++;
        }
        return row;
      });
      playerRows = _.map(playerContainer, function(playerRow, j){
        return (
          <PlayerTileRow
            key={j}
            players={playerRow}
            playerGroup={playerGroup}
            joinGroup={joinGroup}
            isSelecting={playerGroup.isSelecting}
            selectingGroup={playerGroup.selectingGroup}
            selectingPlayer={playerGroup.selectingPlayer}
            highlightSelection={highlightSelection} />
        )
      });
    }
    return (
      <div className="player-select-container" onKeyPress={this._handleKeyDown.bind(this)}>
        <div className="header-container">
          <h1>Choose your player</h1>
          <FontAwesome
            size='2x'
            className='refresh-icon'
            onClick={this._resetGroups.bind(this)}
            title="clear selections"
            name='refresh'/>
        </div>
        <div className="roster-container">
          <div className="tile-container">
            {playerRows}
          </div>
        </div>
        <div className="selection-container">
          <PlayerGroup startSelection={startSelection} group={playerGroup.groupOne} groupNumber={1} />
          <div className="player-group-seperator">
            <div className="line-container">
              <div className="line" style={{marginTop: '1em'}}></div>
            </div>
            <div className="logo-container">
            <div className="logo"></div>
            </div>
            <div className="line-container">
              <div className="line" style={{marginBottom: '1em'}}></div>
            </div>
          </div>
          <PlayerGroup startSelection={startSelection} group={playerGroup.groupTwo} groupNumber={2} />
        </div>
      </div>
    )
  }
}
