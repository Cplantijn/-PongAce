import React, { Component } from 'react';
import PlayerTileRow from './PlayerTileRow';
import _ from 'underscore';
import FontAwesome from 'react-fontawesome';
import PlayerGroup from './PlayerGroup';

export default class PlayerSelectOverlay extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    document.addEventListener('keydown', this._handleKeyDown.bind(this));
  }
  componentWillUnmount() {
    const { hideMessage, endSelection } = this.props;
    hideMessage();
    endSelection();
    document.removeEventListener('keydown', this._handleKeyDown.bind(this));
  }
  _resetGroups() {
    const { resetGroups } = this.props;
    resetGroups();
  }
  _handleKeyDown(e) {
    const { game, playerList, highlightSelection, joinGroup, showSelectionWarning } = this.props;
    const { selectingPlayer, selectingGroup, isSelecting } = game;

    const key = e.which;
    const acceptKeys = [37, 38, 39, 40, 13]; // Left, Up, Right, Down, Enter
    if (isSelecting) {
      if (acceptKeys.indexOf(key) > -1) {
        if (key === 13) {
          let player = null;
          for (let i = 0; i < _.size(playerList.players); i++) {
            if (playerList.players[i].highlight) {
              player = playerList.players[i];
            }
          }
          const { id, name, standardPose, winningPose } = player;
          if (game.selectedIds.indexOf(id) === -1) {
            joinGroup(selectingGroup, selectingPlayer, id, name, standardPose, winningPose);
          } else {
            showSelectionWarning();
          }
        } else {
          let currentSelectionId = game.highlightId;
          let currentSelectIndex;
          let selectionFound = false;

          if (currentSelectionId === null) {
            for (let i = 0; i < _.size(playerList.players); i++) {
              if (playerList.players[i].highlight) {
                currentSelectionId = playerList.players[i].id;
                highlightSelection(playerList.players[i].id);
              }
            }
          }

          for (let i = 0; i < _.size(playerList.players) && !selectionFound; i++) {
            if (playerList.players[i].id === currentSelectionId) {
              currentSelectIndex = i;
              selectionFound = true;
            }
          }
          // Left key
          if (key === 37 && currentSelectIndex > 0) {
            currentSelectIndex = currentSelectIndex - 1;
          } else if (key === 38 && currentSelectIndex > 9) {
            currentSelectIndex = currentSelectIndex - 10;
          } else if (key === 39 && (_.size(playerList.players) > currentSelectIndex + 1)) {
            currentSelectIndex = currentSelectIndex + 1;
          } else if (key === 40 && (_.size(playerList.players) > currentSelectIndex + 10)) {
            currentSelectIndex = currentSelectIndex + 10;
          }
          highlightSelection(playerList.players[currentSelectIndex].id);
        }
      }
    }
  }

  render() {
    const { startSelection, playerList, game, highlightSelection,
            joinGroup, showSelectionWarning } = this.props;
    let playerRows = null;
    let playerContainer = null;
    let selectionContainer = null;;
    let row = 0;
    let message = 'Create at least two player profiles to play!';
    const hasEnoughPlayers = _.size(playerList.players) > 1;
    if (hasEnoughPlayers) {
      message = 'Choose your players';
    }


    if (hasEnoughPlayers) {
      playerContainer = _.groupBy(playerList.players, function(player, i) {
        if (i % 10 === 0) {
          row ++;
        }
        return row;
      });
      playerRows = _.map(playerContainer, function(playerRow, j) {
        return (
          <PlayerTileRow
            key={j}
            players={playerRow}
            game={game}
            joinGroup={joinGroup}
            isSelecting={game.isSelecting}
            selectingGroup={game.selectingGroup}
            selectingPlayer={game.selectingPlayer}
            highlightSelection={highlightSelection}
            showSelectionWarning={showSelectionWarning} />
        );
      });

      selectionContainer = (
        <div className="selection-container">
          <PlayerGroup
            showSelectionWarning={showSelectionWarning}
            startSelection={startSelection}
            group={game.groupOne}
            groupNumber={1} />
          <div className="player-group-seperator">
            <div className="line-container">
              <div className="line" style={{ marginTop: '1em' }}></div>
            </div>
            <div className="logo-container">
            <div className="logo"></div>
            </div>
            <div className="line-container">
              <div className="line" style={{ marginBottom: '1em' }}></div>
            </div>
          </div>
          <PlayerGroup
            showSelectionWarning={showSelectionWarning}
            startSelection={startSelection}
            group={game.groupTwo}
            groupNumber={2} />
        </div>
      );
    }

    if (game.groupOne.playerOne.active && game.groupTwo.playerOne.active) {
      message = 'Hold your side\'s button to ready up';
    }
    return (
      <div className="player-select-container" onKeyPress={this._handleKeyDown.bind(this)}>
        <div className="header-container">
          <div>
            <h1>{message}</h1>
          </div>
          <FontAwesome
            size="2x"
            className="refresh-icon"
            onClick={this._resetGroups.bind(this)}
            title="clear selections"
            name="refresh"/>
        </div>
        <div className="roster-container">
          <div className="tile-container">
            {playerRows}
          </div>
        </div>
        {selectionContainer}
      </div>
    );
  }
}

PlayerSelectOverlay.propTypes = {
  hideMessage: React.PropTypes.func,
  endSelection: React.PropTypes.func,
  resetGroups: React.PropTypes.func,
  game: React.PropTypes.object,
  playerList: React.PropTypes.object,
  highlightSelection: React.PropTypes.func,
  joinGroup: React.PropTypes.func,
  showSelectionWarning: React.PropTypes.func,
  highlightId: React.PropTypes.number,
  selectingPlayer: React.PropTypes.string,
  selectingGroup: React.PropTypes.string,
  isSelecting: React.PropTypes.bool,
  startSelection: React.PropTypes.func,
};
