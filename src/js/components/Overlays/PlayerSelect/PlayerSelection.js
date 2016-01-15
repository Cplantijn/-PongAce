import React, { Component } from 'react';
import classNames from 'classNames';

export default class PlayerSelection extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { startSelection, player, group, playerType, contracted } = this.props;
    const { active, standardPose, selecting } = player;
    const alignment = active ? 'stretch' : 'center';

    const cls = classNames({
      'player': true,
      'player-two': playerType === 'playerTwo',
      'group-two': group === 'groupTwo',
      contracted,
      selecting
    });

    const containerStyle = {
      alignItems: alignment
    };
    const playerStyle = {
      backgroundImage: 'url("/player_img/' + standardPose + '")'
    };

    let playerSelection = <div className="empty" />;
    if (active) {
      playerSelection = <div className="placed" style={playerStyle} />;
    }
    return (
        <div
          className={cls}
          style={containerStyle}
          onClick={startSelection.bind(this, group, playerType)}>
          {playerSelection}
        </div>
    );
  }
}

PlayerSelection.propTypes = {
  startSelection: React.PropTypes.func,
  player: React.PropTypes.object,
  group: React.PropTypes.string,
  playerType: React.PropTypes.string,
  contracted: React.PropTypes.bool
};
