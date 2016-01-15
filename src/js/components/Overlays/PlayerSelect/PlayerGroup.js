import React, { Component } from 'react';
import PlayerSelection from './PlayerSelection';
import classNames from 'classNames';

export default class PlayerGroup extends Component {
  constructor(props) {
    super(props);
  }
  _startSelection(group, player) {
    const { startSelection } = this.props;
    startSelection(group, player);
  }
  render() {
    const { group, groupNumber } = this.props;
    const playerOne = group.playerOne;
    const playerTwo = group.playerTwo;
    const groupName = groupNumber === 1 ? 'groupOne' : 'groupTwo';
    const groupCls = groupName === 'groupOne' ? 'group-one' : 'group-two';
    let playerOneName = null;
    let playerTwoName = null;

    const ctnPlayerOneCls = classNames({
      'player-container': true,
      'hidden': false,
      'moved-left': playerOne.active && groupName === 'groupOne'
    });

    const ctnPlayerTwoCls = classNames({
      'player-container': true,
      'hidden': !playerOne.active,
      'moved-right': playerOne.active
    });

    const playerCls = classNames({
      'player-title': true,
      'group-one': groupCls === 'group-one',
      'group-two': groupCls === 'group-two'
    });

    const grpCls = classNames({
      'player-group': true,
      'ready': group.ready
    });

    if (playerOne.active) {
      playerOneName = <div className={playerCls}><span>{playerOne.name}</span></div>;
    }
    if (playerTwo.active) {
      playerTwoName = <div className={playerCls}><span>{playerTwo.name}</span></div>;
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
    );
  }
}

PlayerGroup.propTypes = {
  startSelection: React.PropTypes.func,
  group: React.PropTypes.object,
  groupNumber: React.PropTypes.number,
};
