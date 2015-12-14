import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import classNames from 'classNames'
import { ProfilesMenuItem, LeaderboardMenuItem, HistoryMenuItem, GameSettingsMenuItem } from './MenuItems'


export default class Footer extends Component {
  constructor(props) {
    super(props)
  }
  _toggleMenuAndShow(menuIndex) {
    var { hideMenu, showMenu, menu, fetchPlayers } = this.props;
    if (menuIndex === 0 && menuIndex !== menu.activeIndex) {
      fetchPlayers('');
    }
    if (menu.activeIndex !== menuIndex && menu.isOpen) {
      hideMenu()
      setTimeout(function(){
        showMenu(menuIndex)
      }, 400)
    } else if (menu.activeIndex === menuIndex && menu.isOpen) {
      hideMenu()
    } else if (menu.activeIndex === menuIndex && !menu.isOpen) {

      showMenu(menuIndex)
    } else {
      showMenu(menuIndex)
    }
  }
  render() {
    var cls = classNames({
      'pong-section': true,
      'footer-bar': true,
    })
    return (
      <div className={cls}>
        <div className="footer-container">
          <ProfilesMenuItem onClick={this._toggleMenuAndShow.bind(this)} {...this.props} />
          <LeaderboardMenuItem onClick={this._toggleMenuAndShow.bind(this)} {...this.props} />
          <HistoryMenuItem onClick={this._toggleMenuAndShow.bind(this)} {...this.props} />
          <GameSettingsMenuItem onClick={this._toggleMenuAndShow.bind(this)} {...this.props} />
        </div>
      </div>
    )
  }
}
