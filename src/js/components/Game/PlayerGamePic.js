import React, { Component } from 'react'
import classNames from 'classNames'

export default class PlayerGamePic extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var {standardPose, winningPose, name, group} = this.props;
    var style = {
      backgroundImage: 'url("/player_img/'+ standardPose + '")'
    }
    var labelCls = classNames({
      'label': true,
      'group-one' : group == 'groupOne',
      'group-two' : group == 'groupTwo'
    })
    return (
      <div className="player-pic-container">
        <div
          className="player"
          style={style} />
        <h2 className={labelCls}>{name}</h2>
      </div>
    )
  }
}
