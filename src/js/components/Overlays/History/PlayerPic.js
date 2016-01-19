import React, { Component } from 'react';

export default class PlayerPic extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { standardPose, name } = this.props;
    const style = {
      backgroundImage: 'url("/player_img/' + standardPose + '")'
    };
    return (
      <div
        className="player-pic"
        title={name}
        style={style} />
    );
  }
}

PlayerPic.propTypes = {
  standardPose: React.PropTypes.string,
  name: React.PropTypes.string
};
