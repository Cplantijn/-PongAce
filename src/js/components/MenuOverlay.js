import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import classNames from 'classNames'
import config from '../../../config'
import ProfilesMenuBody from './ProfilesMenuBody'


export default class MenuOverlay extends Component {
  constructor(props) {
    super(props)
  }
  _hideOverlay() {
    var { hideMenu } = this.props
    hideMenu()
  }
  render() {
    var { menu } = this.props
    var styles,
        menus = ['profiles', 'leaderboards', 'history', 'settings', 'characterSelect'],
        activeMenu = menu.activeIndex ? menus[menu.activeIndex] : 'profiles',
        menuBody = <div></div>;

    var menuCls = classNames({
      'main-menu-overlay': true,
      'closed': !menu.isOpen,
      'opened': menu.isOpen
    });

    var styles = {
      'backgroundColor': config.overlayScreens[activeMenu].backgroundColor,
      'color': config.overlayScreens[activeMenu].pageTextColor
    }
    switch(activeMenu) {
      case 'profiles':
        menuBody = <ProfilesMenuBody {...this.props}/>
    }
    return (
      <div
        className={menuCls}
        style={styles}>
        <div className="menu-top">
          <div
            className="hide-menu-container"
            onClick={this._hideOverlay.bind(this)}>
            <FontAwesome
              className='hide-menu-icon'
              name='caret-down'
              size='2x'
              title='Collapse'/>
          </div>
        </div>
        <div className="menu-content-container">
          {menuBody}
        </div>
      </div>
    )
  }
}
