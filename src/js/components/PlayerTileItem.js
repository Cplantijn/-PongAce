import React, { Component } from 'react'
import classNames from 'classNames'
import _ from 'underscore'

export default class PlayerTileItem extends Component {
  constructor(props) {
    super(props);
  }
  _highlightSelection(id) {
    var { highlightSelection, isSelecting } = this.props;
    if (isSelecting) {
      highlightSelection(id);
    }
  }
  _makeSelection() {
    var { playerGroup, selectingGroup, selectingPlayer } = this.props;
    if (playerGroup.isSelecting) {
      console.log(selectingGroup, selectingPlayer);
    }
  }
  render() {
    var { playerGroup, player, selectingGroup } = this.props;
    var style = {
      backgroundImage: 'url("/player_img/'+ player.standard_pose_img_name + '")'
    }
    var cls = classNames({
      'player-tile': true,
      'highlight': player.highlight,
      'group-two': selectingGroup == 'groupTwo',
    });
    return (
      <div
        className={cls}
        style={style}
        onMouseEnter={this._highlightSelection.bind(this, player.id)}
        onClick={this._makeSelection.bind(this)}>
        <div className="player-header">{player.name}</div>
      </div>
    )
  }
}
