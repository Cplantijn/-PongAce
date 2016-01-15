import React, { Component } from 'react';
import classNames from 'classNames';

export default class PlayerGamePic extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { standardPose, name, group } = this.props;
    const style = {
      backgroundImage: 'url("/player_img/' + standardPose + '")'
    };
    const labelCls = classNames({
      'label': true,
      'group-one': group === 'groupOne',
      'group-two': group === 'groupTwo'
    });
    return (
      <div className="player-pic-container">
        <div
          className="player"
          style={style} />
        <h2 className={labelCls}>{name}</h2>
      </div>
    );
  }
}

PlayerGamePic.propTypes ={
  standardPose: React.PropTypes.string,
  name: React.PropTypes.string,
  group: React.PropTypes.string
};
