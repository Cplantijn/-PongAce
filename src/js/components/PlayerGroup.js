import React, { Component } from 'react'
import _ from 'underscore'
import PlayerSelection from './PlayerSelection'

export default class PlayerGroup extends Component {
  constructor(props) {
    super(props)
  }
  _startSelection(group, player){
    var { startSelection } = this.props;
    startSelection(group, player);
  }
  render() {
    var { group, groupNumber} = this.props;
    var  playerOne = group.playerOne,
         playerTwo = group.playerTwo;
    var groupName = groupNumber == 1 ? 'groupOne': 'groupTwo';

    return (
      <div className="player-group">
        <PlayerSelection
          startSelection={this._startSelection.bind(this)}
          group={groupName}
          playerType={'playerOne'}
          player={playerOne}
          contracted={false}
          show={true}/>
        <PlayerSelection
          startSelection={this._startSelection.bind(this)}
          group={groupName}
          playerType={'playerTwo'}
          player={playerTwo}
          contracted={playerOne.active}
          show={playerOne.active} />
      </div>
    )
  }
}
