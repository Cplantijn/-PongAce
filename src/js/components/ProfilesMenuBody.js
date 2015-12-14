import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import config from '../../../config'
import PlayerListItem from './PlayerListItem'
import _ from 'underscore'

export default class ProfilesMenuBody extends Component {
  constructor(props) {
    super(props)
  }
  _changePlayerName(e) {
    var { updateNewPlayerName } = this.props;
    if (e.type === 'keyup') {
      if (e.which === 13) {
        this._submitNewPlayer()
      }
    }
  }
  _submitNewPlayer() {
    var { createNewPlayer } = this.props;
    createNewPlayer(this.refs.playerNameInput.value);
    this.refs.playerNameInput.value = '';
  }
  _filterPlayerList() {
    var { fetchPlayers } = this.props;
    fetchPlayers(this.refs.playerFilterInput.value.toLowerCase());
  }
  render() {
    var { menuOpen, menu, playerList} = this.props, players;
    if (_.size(playerList) > 0) {
      players = _.map(playerList, function(player, i) {
        var placement = (i % 2 === 0 || i === 0) ? 'even' : 'odd';
        return (
          <PlayerListItem
            key={player.id}
            playerId={player.id}
            placement={placement}
            playerImg={player.standard_pose_img_name}
            playerName={player.name}
            wins={player.solo_wins + player.doubles_wins}
            losses={player.solo_losses + player.doubles_losses}/>
        )
      });
    } else {
      players = null;
    }
    return (
      <div className="menu-content">
        <div className="player-add-container">
          <h2 className="header" >Create</h2>
          <div className="player-add-form-container">
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter Player Name"
                ref="playerNameInput"
                onKeyUp={this._changePlayerName.bind(this)}/>
            </div>
            <div className="input-group">
              <button
                type="button"
                className="btn btn-block btn-primary add-player-btn"
                onClick={this._submitNewPlayer.bind(this)}>
                Add Player
              </button>
            </div>
          </div>
        </div>
        <div className="spacer left-spacer"></div>
        <div className="spacer mid-spacer">
          <div className="line"></div>
        </div>
        <div className="spacer right-spacer"></div>
        <div className="player-manage-container">
          <h2 className="header">View + Manage</h2>
          <div className="player-manage">
            <div className="player-list-container">
              <div className="player-filter-input-container">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Filter Players"
                    ref="playerFilterInput"
                    onKeyUp={this._filterPlayerList.bind(this)} />
                </div>
              </div>
              <ul className="player-list">
                {players}
              </ul>
            </div>
            <div className="player-view-container">
            </div>
          </div>
        </div>
      </div>
    )
  }
}
