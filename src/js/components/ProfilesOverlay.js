import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import PlayerListItem from './PlayerListItem'
import classNames from 'classNames'
import ps from 'perfect-scrollbar'
import PlayerDetail from './PlayerDetail'
import _ from 'underscore'

export default class ProfilesOverlay extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    var  ul = this.refs.playerList;
    {/* ctnHeight = this.refs.playerListMasterContainer.offsetHeight,
    // viewCtn = this.refs.viewPlayerHeader.offsetHeight,
    // flrHeight = this.refs.playerFilterInput.offsetHeight; */}
    ul.style.height = 710;
    ps.initialize(ul, {
      suppressScrollX: true
    });
    ul.scrollTop = 0;
    ps.update(ul);
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
    fetchPlayers(this.refs.playerFilterInput.value.toLowerCase(), 'updated_on DESC');
  }
  render() {
    var { overlayOpen, hideOverlay, overlay, playerList, active,
          fetchPlayerDetails, showcasePlayer} = this.props;
    var players = null, activeId = null, empty = true;
    if (_.size(showcasePlayer) > 0) {
      activeId = showcasePlayer.id
      empty = false;
    }
    if (_.size(playerList) > 0) {
      players = _.map(playerList, function(player, i) {
        var placement = (i % 2 === 0 || i === 0) ? 'even' : 'odd';
        var playerName = player.name.length > 23 ? '    '+player.name.slice(0, 21) + '...': player.name;
        return (
          <PlayerListItem
            key={player.id}
            playerId={player.id}
            active={player.id == activeId}
            placement={placement}
            fetchPlayerDetails={fetchPlayerDetails}
            playerImg={player.standardPose}
            playerName={playerName}
            wins={player.wins}
            losses={player.losses}/>
        )
      });
    }
    var cls = classNames({
      'player-view-master-container': true,
      'empty': empty,
      'player-shown': !empty
    });
    
    return (
      <div className="profiles-container">
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
          <div
            className="player-list-master-container"
            ref="playerListMasterContainer">
            <h2
              className="header"
              ref="viewPlayerHeader">
              View
            </h2>
            <div className="player-list-view">
              <div className="player-list-container">
                <div className="player-filter-input-container">
                  <div className="input-group">
                    <input
                      type="text"
                      id="player-profile-filter-input"
                      placeholder="Filter Players"
                      ref="playerFilterInput"
                      onKeyUp={this._filterPlayerList.bind(this)} />
                  </div>
                </div>
                  <ul
                    className="player-list"
                    ref="playerList">
                    {players}
                  </ul>
              </div>
            </div>
          </div>
          <div className={cls}>
            <PlayerDetail {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}
