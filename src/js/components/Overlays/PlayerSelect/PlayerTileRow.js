import React, { Component } from 'react';
import PlayerTileItem from './PlayerTileItem';
import _ from 'underscore';

export default class PlayerTileRow extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { players, highlightSelection, isSelecting, selectingGroup,
          selectingPlayer, game, joinGroup, showSelectionWarning } = this.props;
    const playerTiles = _.map(players, function(player, i) {
      return (
        <PlayerTileItem
          key={i}
          game={game}
          isSelecting={isSelecting}
          selectingGroup={selectingGroup}
          showSelectionWarning={showSelectionWarning}
          selectingPlayer={selectingPlayer}
          player={player}
          joinGroup={joinGroup}
          highlightSelection={highlightSelection}/>
      );
    });
    return (
      <div className="player-tile-row">
        {playerTiles}
      </div>
    );
  }
}

PlayerTileRow.propTypes = {
  players: React.PropTypes.array,
  highlightSelection: React.PropTypes.func,
  isSelecting: React.PropTypes.bool,
  selectingGroup: React.PropTypes.string,
  selectingPlayer: React.PropTypes.string,
  game: React.PropTypes.object,
  joinGroup: React.PropTypes.func,
  showSelectionWarning: React.PropTypes.func
};
