import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import classNames from 'classNames'
import config from '../../../config'
import ProfilesOverlay from './ProfilesOverlay'


export default class Overlay extends Component {
  constructor(props) {
    super(props)
  }
  _hideOverlay() {
    var { hideOverlay } = this.props
    hideOverlay()
  }
  render() {
    var { overlay } = this.props
    var styles,
        overlays = ['profiles', 'leaderboards', 'history', 'settings', 'characterSelect'],
        activeOverlay = overlay.activeIndex ? overlays[overlay.activeIndex] : 'profiles',
        overlayBody = <div></div>;

    var oCls = classNames({
      'main-overlay': true,
      'closed': !overlay.isOpen,
      'opened': overlay.isOpen
    });

    var styles = {
      'backgroundColor': config.overlayScreens[activeOverlay].backgroundColor,
      'color': config.overlayScreens[activeOverlay].pageTextColor
    }
    switch(activeOverlay) {
      case 'profiles':
        overlayBody = <ProfilesOverlay {...this.props}/>
    }
    return (
      <div
        className={oCls}
        style={styles}>
        <div className="overlay-top">
          <div
            className="hide-overlay-container"
            onClick={this._hideOverlay.bind(this)}>
            <FontAwesome
              className='hide-overlay-icon'
              name='caret-down'
              size='2x'
              title='Collapse'/>
          </div>
        </div>
        <div className="overlay-content-container">
          {overlayBody}
        </div>
      </div>
    )
  }
}
