import React, { Component } from 'react'
import classNames from 'classNames'
import FontAwesome from 'react-fontawesome'

export default class PlayerSelection extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    var { startSelection, show, player, group, playerType, contracted} = this.props;
    var { active } = player;

    var cls = classNames({
      'player': true,
      'player-two': playerType == 'playerTwo',
      'group-two': group == 'groupTwo',
      'contracted': contracted,
      'hidden': !show,
      'selecting': player.selecting
    });
    var playerSelection = null;
    if (show) {
      if (active) {

      } else {
        playerSelection = <div className="empty"></div>
      }
    }
    return (
        <div
          className={cls}
          onClick={startSelection.bind(this, group, playerType)}>
          {playerSelection}
        </div>
    )
  }
}
