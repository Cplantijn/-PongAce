import React, { Component } from 'react'
import _ from 'underscore'
import PlayerSelection from './PlayerSelection'
import classNames from 'classNames'

export default class PlayerGroup extends Component {
  constructor(props) {
    super(props)
  }
  _startSelection(group, player){
    var { startSelection } = this.props;
    startSelection(group, player);
  }
  render() {
    var { group, groupNumber } = this.props;
    var  playerOne = group.playerOne,
         playerTwo = group.playerTwo;
    var groupName = groupNumber == 1 ? 'groupOne': 'groupTwo';
    var groupCls = groupName == 'groupOne' ? 'group-one' : 'group-two';
    var playerOneName = null, playerTwoName = null;

    var ctnPlayerOneCls = classNames({
      'player-container': true,
      'hidden': false,
      'moved-right': playerOne.active && groupName == 'groupOne',
    });

    var ctnPlayerTwoCls = classNames({
      'player-container': true,
      'hidden': !playerOne.active,
      'moved-left': playerOne.active
    });

    var playerCls = classNames({
      'player-title': true,
      'group-one': groupCls == 'group-one',
      'group-two': groupCls == 'group-two'
    });

    console.log(group);
    var grpCls = classNames({
      'player-group': true,
      'ready': group.ready
    });

    if (playerOne.active) {
      playerOneName = <div className={playerCls}><span>{playerOne.name}</span></div>
    }
    if (playerTwo.active) {
      playerTwoName = <div className={playerCls}><span>{playerTwo.name}</span></div>
    }

    return (
      <div className={grpCls}>
        <div className={ctnPlayerOneCls}>
          <PlayerSelection
            startSelection={this._startSelection.bind(this)}
            group={groupName}
            playerType={'playerOne'}
            player={playerOne}
            contracted={false}/>
          {playerOneName}
        </div>
        <div className={ctnPlayerTwoCls}>
          <PlayerSelection
            startSelection={this._startSelection.bind(this)}
            group={groupName}
            playerType={'playerTwo'}
            player={playerTwo}
            contracted={playerTwo.contracted} />
          {playerTwoName}
        </div>
      </div>
    )
  }
}
