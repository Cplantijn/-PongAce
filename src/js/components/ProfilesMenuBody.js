import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import config from '../../../config'


export default class ProfilesMenuBody extends Component {
  constructor(props) {
    super(props)
    this.playerName = '';
  }
  _changeNewPlayerName(e) {
    var { updateNewPlayerName } = this.props
    if (e.type === 'keyup') {
      if (e.which === 13) {
        this._submitNewPlayer()
      } else {
        this.playerName = e.target.value;
      }
    }
  }
  _submitNewPlayer() {
    var { createNewPlayer } = this.props
    createNewPlayer(this.playerName)
  }
  _filterPlayerList() {

  }
  render() {
    var { menuOpen, menu} = this.props
    return (
      <div className="menu-content">
        <div className="player-add-container">
          <h2 className="header" >Create</h2>
          <div className="player-add-form-container">
            <div className="input-group">
              <input
                type="text"
                placeholder="Player Name"
                onKeyUp={this._changeNewPlayerName.bind(this)}/>
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
        <div className="player-search-manage">
          <h2 className="header">View</h2>
          <div className="player-list-view-container">
            <div className="player-filter-input-container">
              <input
                type="text"
                placeholder="Filter Players"
                onKeyUp={this._filterPlayerList} />
            </div>
            <div className="player-list-container">
              <ul></ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
