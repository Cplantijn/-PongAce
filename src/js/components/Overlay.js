import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import classNames from 'classNames'
import config from '../../../config'
import ProfilesOverlay from './ProfilesOverlay'
import PlayerSelectOverlay from './PlayerSelectOverlay'
import HideOverlay from './HideOverlay'
import SettingsOverlay from './SettingsOverlay'


export default class Overlay extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    var { overlay, hideOverlay, playerGroup } = this.props;
    var styles,
        overlays = ['profiles', 'leaderboards', 'history', 'settings', 'characterSelect'],
        activeOverlay = overlay.activeIndex ? overlays[overlay.activeIndex] : 'profiles',
        overlayBody, show = true;

    var oCls = classNames({
      'main-overlay': true,
      'closed': !overlay.isOpen,
      'opened': overlay.isOpen
    });

    var styles = {
      'backgroundColor': config.overlayScreens[activeOverlay].backgroundColor,
      'color': config.overlayScreens[activeOverlay].pageTextColor
    }
    if (!playerGroup.game.active) {
      switch(activeOverlay) {
        case 'profiles':
          overlayBody = <ProfilesOverlay {...this.props}/>;
          break;
        case 'characterSelect':
          show = false;
          overlayBody = <PlayerSelectOverlay {...this.props}/>;
          break;
        case 'settings':
          overlayBody = <SettingsOverlay {...this.props} />;
          break;
        default:
        overlayBody = <div></div>;
      }
    } else {
      overlayBody = <div className="game-active"><h1>GAME IS ACTIVE.<br />PLEASE END THE GAME FIRST</h1></div>
    }

    return (
      <div
        className={oCls}
        style={styles}>
        <HideOverlay hideOverlay={hideOverlay} show={show} />
        <div
          className="overlay-content-container">
          {overlayBody}
        </div>
      </div>
    )
  }
}
