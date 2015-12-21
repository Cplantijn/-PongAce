import React, { Component } from 'react'

export default class PlayerTileItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var { player } = this.props;
    var style = {
      backgroundImage: 'url("/player_img/'+ player.standard_pose_img_name + '")'
    }
    return (
      <div className="player-tile" style={style}>
        <div className="player-header">{player.name}</div>
      </div>
    )
  }
}
