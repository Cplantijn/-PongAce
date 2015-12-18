import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import classNames from 'classNames'
import { ProfilesOverlayItem, LeaderboardOverlayItem, HistoryOverlayItem, GameSettingsOverlayItem } from './OverlayItems'


export default class Footer extends Component {
  constructor(props) {
    super(props)
  }
  _toggleOverlay(overlayIndex) {
    var { hideOverlay, showOverlay, overlay, fetchPlayers } = this.props;
    if (overlayIndex === 0 && overlayIndex !== overlay.activeIndex) {
      fetchPlayers('');
    }
    if (overlay.activeIndex !== overlayIndex && overlay.isOpen) {
      hideOverlay();
      setTimeout(function(){
        showOverlay(overlayIndex)
      }, 400)
    } else if (overlay.activeIndex === overlayIndex && overlay.isOpen) {
      hideOverlay()
    } else if (overlay.activeIndex === overlayIndex && !overlay.isOpen) {
      if (overlay.activeIndex === 0) {
        fetchPlayers('');
      }
      showOverlay(overlayIndex)
    } else {
      showOverlay(overlayIndex)
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
          <ProfilesOverlayItem onClick={this._toggleOverlay.bind(this)} {...this.props} />
          <LeaderboardOverlayItem onClick={this._toggleOverlay.bind(this)} {...this.props} />
          <HistoryOverlayItem onClick={this._toggleOverlay.bind(this)} {...this.props} />
          <GameSettingsOverlayItem onClick={this._toggleOverlay.bind(this)} {...this.props} />
        </div>
      </div>
    )
  }
}
