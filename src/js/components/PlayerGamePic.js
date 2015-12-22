import React, { Component } from 'react'

export default class PlayerGamePic extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var {standardPose, winningPose} = this.props;
    var style = {
      backgroundImage: 'url("/player_img/'+ standardPose + '")'
    }
    return (
      <div
        className="player"
        style={style} />
    )
  }
}
