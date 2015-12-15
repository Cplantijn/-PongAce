import React, { Component } from 'react'
import config from '../../../config'
import classNames from 'classNames'
import FontAwesome from 'react-fontawesome'

export default class PlayerListItem extends Component {
  constructor(props) {
    super(props)
  }
  _fetchPlayerDetails(playerId) {
    var { fetchPlayerDetails } = this.props;
    fetchPlayerDetails(playerId);
  }
  render() {
    var { placement, playerId, playerName, playerImg, wins, losses, active } = this.props;
    var liCls = classNames({
      'even': placement === 'even',
      'odd': placement === 'odd',
      'active': active
    });
    return (
      <li className={liCls}
          onClick={this._fetchPlayerDetails.bind(this, playerId)}>
        <div className="image-container">
          <img src={"../img/players/"+playerImg} />
        </div>
        <div className="detail">
          <div className="player-name">{playerName}</div>
          <div className="quick-stats">
            <div className="score-container">
              <div className="score-component"><span className="score-title">WINS</span></div>
              <div className="score-component"><span>{wins}</span></div>
            </div>
            <div className="score-container">
              <div className="score-component"><span className="score-title">LOSSES</span></div>
              <div className="score-component"><span>{losses}</span></div>
            </div>
          </div>
        </div>
      </li>
    )
  }
}
