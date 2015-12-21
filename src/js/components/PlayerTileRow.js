import React, { Component } from 'react'
import classNames from 'classNames'
import PlayerTileItem from './PlayerTileItem'
import _ from 'underscore'

export default class PlayerTileRow extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var { players } = this.props;
    var playerTiles = _.map(players, function(player, i) {
      return (
        <PlayerTileItem
          key={i}
          player={player}/>
      )
    })
    return (
      <div className="player-tile-row">
        {playerTiles}
      </div>
    )
  }
}
