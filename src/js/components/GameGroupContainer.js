import React, { Component } from 'react'
import PlayerGamePic from './PlayerGamePic'
import classNames from 'classNames'
import FontAwesome from 'react-fontawesome'
import _ from 'underscore'

export default class GameGroupContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var { activeGroup, group} = this.props;
    var picContainers = null;
    var count = -1;
    var up = null;
    picContainers = _.map(activeGroup, function(val, key) {
      if (key == 'playerOne' || key == 'playerTwo') {
        if (val.active) {
         count++;
          return (
            <PlayerGamePic
              key={count}
              standardPose={val.standardPose}
              winningPose={val.winningPose} />
          )
        }
      } else {
        return false;
      }
    })

    var cls = classNames({
      'group-container': true,
      'group-one': group == 'groupOne',
      'group-two': group == 'groupTwo'
    });

    if (activeGroup.up) {
      up = <FontAwesome
            className="arrow-up"
            name='arrow-up'
            size='2x' />
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
    )
  }
}
