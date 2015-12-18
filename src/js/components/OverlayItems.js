import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import classNames from 'classNames'
import { overlayScreens } from '../../../config'

export class ProfilesOverlayItem extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    var { onClick, overlay } = this.props
    var cls = classNames({
      'footer-icon-pair': true,
      'profile': true,
      'active': (overlay.isOpen && overlay.activeIndex === 0)
    })
    return (
        <div
          className={cls}
          onClick={onClick.bind(this, 0)}>
          <FontAwesome
            className='footer-icon-icon'
            name='users'
            size='2x'
            title='Manage Profiles'/>
            <span className="footer-icon-title">Profiles</span>
        </div>
    )
  }
}

export class LeaderboardOverlayItem extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    var { onClick, overlay } = this.props
    var cls = classNames({
      'footer-icon-pair': true,
      'leaderboard': true,
      'active': (overlay.isOpen && overlay.activeIndex === 1)
    })
    return (
        <div
          className={cls}
          onClick={onClick.bind(this, 1)}>
          <FontAwesome
            className='footer-icon-icon'
            name='trophy'
            size='2x'
            title='Leader Boards'/>
            <span className="footer-icon-title">Leaderboard</span>
        </div>
    )
  }
}

export class HistoryOverlayItem extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    var { onClick, overlay } = this.props
    var cls = classNames({
      'footer-icon-pair': true,
      'history': true,
      'active': (overlay.isOpen && overlay.activeIndex === 2)
    })
    return (
        <div
          className={cls}
          onClick={onClick.bind(this, 2)}>
          <FontAwesome
            className='footer-icon-icon'
            name='history'
            size='2x'
            title='Match History'/>
            <span className="footer-icon-title">Match History</span>
        </div>
    )
  }
}

export class GameSettingsOverlayItem extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    var { onClick, overlay } = this.props
    var cls = classNames({
      'footer-icon-pair': true,
      'settings': true,
      'active': (overlay.isOpen && overlay.activeIndex === 3)
    })
    return (
      <div
        className={cls}
        onClick={onClick.bind(this, 3)}>
        <FontAwesome
          className='footer-icon-icon'
          name='wrench'
          size='2x'
          title='Settings'/>
          <span className="footer-icon-title">Game Settings</span>
      </div>
    )
  }
}
