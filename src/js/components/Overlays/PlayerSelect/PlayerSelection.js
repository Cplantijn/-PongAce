import React, { Component } from 'react'
import classNames from 'classNames'
import FontAwesome from 'react-fontawesome'

export default class PlayerSelection extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    var { startSelection, show, player, 
          group, playerType, contracted} = this.props;
    var { active, standardPose, name, selecting } = player;
    var alignment = active ? 'stretch' : 'center';

    var cls = classNames({
      'player': true,
      'player-two': playerType == 'playerTwo',
      'group-two': group == 'groupTwo',
      'contracted': contracted,
      'selecting': selecting
      });

    var containerStyle = {
      alignItems: alignment
    }
    var playerStyle = {
      backgroundImage: 'url("/player_img/'+ standardPose + '")'
    };

    var playerSelection = null;
      if (active) {
        playerSelection = <div
                            className="placed"
                            style={playerStyle} />
      } else {
        playerSelection = <div className="empty" />;
      }
    return (
        <div
          className={cls}
          style={containerStyle}
          onClick={startSelection.bind(this, group, playerType)}>
          {playerSelection}
        </div>
    )
  }
}
