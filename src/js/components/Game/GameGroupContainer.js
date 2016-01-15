import React, { Component } from 'react';
import PlayerGamePic from './PlayerGamePic';
import classNames from 'classNames';
import FontAwesome from 'react-fontawesome';
import _ from 'underscore';

export default class GameGroupContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { activeGroup, group } = this.props;
    let picContainers = null;
    let count = -1;
    let up = null;
    picContainers = _.map(activeGroup, function(val, key) {
      if (key === 'playerOne' || key === 'playerTwo') {
        if (val.active) {
          count++;
          return (
            <PlayerGamePic
              key={count}
              group={group}
              name={val.name}
              standardPose={val.standardPose}
              winningPose={val.winningPose} />
          );
        }
      } else {
        return false;
      }
    });

    const cls = classNames({
      'group-container': true,
      'group-one': group === 'groupOne',
      'group-two': group === 'groupTwo'
    });

    if (activeGroup.up) {
      up = (<FontAwesome
        className="arrow-up"
        name="arrow-up"
        size="5x" />);
    }

    return (
      <div className={cls}>
        <div className="score-container">
          <div className="score">
            <h1>{activeGroup.score}</h1>
            {up}
          </div>
        </div>
        <div className="player-container">
          {picContainers}
        </div>
      </div>
    );
  }
}

GameGroupContainer.propTypes = {
  activeGroup: React.PropTypes.object,
  group: React.PropTypes.string
};
