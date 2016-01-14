import React, { Component } from 'react'
import classNames from 'classNames'
import PlayerTileItem from './PlayerTileItem'
import _ from 'underscore'

export default class PlayerTileRow extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var { players, highlightSelection, isSelecting, selectingGroup,
          selectingPlayer, game, joinGroup, showSelectionWarning } = this.props;
    var playerTiles = _.map(players, function(player, i) {
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
      )
    })
    return (
      <div className="player-tile-row">
        {playerTiles}
      </div>
    )
  }
}
