import React, { Component } from 'react';
import classNames from 'classNames';
import ProfilesOverlayItem from './ProfilesOverlayItem';
import LeaderboardOverlayItem from './LeaderboardOverlayItem';
import HistoryOverlayItem from './HistoryOverlayItem';
import GameSettingsOverlayItem from './GameSettingsOverlayItem';

export default class Footer extends Component {
  constructor(props) {
    super(props);
  }
  _toggleOverlay(overlayIndex) {
    const { hideOverlay, showOverlay, overlay, fetchPlayers, fetchHistory } = this.props;
    if ((overlayIndex === 0 || overlayIndex === 2) && overlayIndex !== overlay.activeIndex) {
      fetchPlayers('', 'updated_on DESC');
    }
    if (overlay.activeIndex !== overlayIndex && overlay.isOpen) {
      hideOverlay();
      setTimeout(function() {
        showOverlay(overlayIndex);
      }, 600);
    } else if (overlay.activeIndex === overlayIndex && overlay.isOpen) {
      hideOverlay();
    } else if (overlay.activeIndex === overlayIndex && !overlay.isOpen) {
      if (overlay.activeIndex === 0) {
        fetchPlayers('', 'updated_on DESC');
      } else if (overlay.activeIndex === 2) {
        fetchPlayers('', 'updated_on DESC');
        fetchHistory();
      }
      showOverlay(overlayIndex);
    } else {
      showOverlay(overlayIndex);
    }
  }
  render() {
    const { overlay } = this.props;
    const cls = classNames({
      'pong-section': true,
      'footer-bar': true,
    });
    return (
      <div className={cls}>
        <div className="footer-container">
          <ProfilesOverlayItem
            onClick={this._toggleOverlay.bind(this)}
            overlay={overlay} />
          <LeaderboardOverlayItem
            onClick={this._toggleOverlay.bind(this)}
            overlay={overlay} />
          <HistoryOverlayItem
            onClick={this._toggleOverlay.bind(this)}
            overlay={overlay} />
          <GameSettingsOverlayItem
            onClick={this._toggleOverlay.bind(this)}
            overlay={overlay} />
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  hideOverlay: React.PropTypes.func,
  showOverlay: React.PropTypes.func,
  fetchPlayers: React.PropTypes.func,
  fetchHistory: React.PropTypes.func,
  overlay: React.PropTypes.object
};
