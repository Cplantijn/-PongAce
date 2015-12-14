import React, { Component } from 'react'
import config from '../../../config'
import classNames from 'classNames'

export default class PlayerListItem extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    var { placement, playerId, playerName, playerImg, wins, losses } = this.props;
    var liCls = classNames({
      'even': placement === 'even',
      'odd': placement === 'odd'
    });
    return (
      <li className={liCls}>
        <img src={"../img/players/"+playerImg} />
        {playerName}
      </li>
    )
  }
}
