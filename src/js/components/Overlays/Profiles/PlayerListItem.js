import React, { Component } from 'react';
import classNames from 'classNames';

export default class PlayerListItem extends Component {
  constructor(props) {
    super(props);
  }
  _fetchPlayerDetails(playerId) {
    const { fetchPlayerDetails } = this.props;
    fetchPlayerDetails(playerId);
  }
  render() {
    const { placement, playerId, playerName, playerImg, wins, losses, active } = this.props;
    const liCls = classNames({
      'even': placement === 'even',
      'odd': placement === 'odd',
      active
    });
    return (
      <li className={liCls}
        onClick={this._fetchPlayerDetails.bind(this, playerId)}>
        <div className="image-container">
          <img src={'/player_img/' + playerImg} />
        </div>
        <div className="detail">
          <div className="player-name">{playerName}</div>
          <div className="quick-stats">
            <div className="score-container">
              <div className="score-component"><span className="score-title">WIN</span></div>
              <div className="score-component"><span>{wins}</span></div>
            </div>
            <div className="score-container">
              <div className="score-component"><span className="score-title">LOSS</span></div>
              <div className="score-component"><span>{losses}</span></div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

PlayerListItem.propTypes = {
  fetchPlayerDetails: React.PropTypes.func,
  placement: React.PropTypes.number,
  playerId: React.PropTypes.number,
  playerName: React.PropTypes.string,
  playerImg: React.PropTypes.string,
  wins: React.PropTypes.number,
  losses: React.PropTypes.number,
  active: React.PropTypes.boolean
};
