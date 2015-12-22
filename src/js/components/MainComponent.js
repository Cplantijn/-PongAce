import React, { Component } from 'react'
import _ from 'underscore'
import Footer from './Footer'
import TopBar from './TopBar'
import classNames from 'classNames'
import Overlay from './Overlay'
import GameComponent from './GameComponent'
import {Howl, Howler} from 'howler'

export default class MainComponent extends Component {
  constructor(props) {
    super(props);
    //preloading Howler into Cache
    this.howler = new Howl({
      urls: ['../sound/smash_theme.mp3', '../sound/smash_theme.mp3']
    });
  }
  render() {
    var {playerGroup} = this.props;
    var cls = classNames({
      "game-component-container": true,
      "no-game": !playerGroup.game.active && !playerGroup.game.ended
    });
    return (
      <div className="main-component container-fluid">
        <TopBar {...this.props}/>
        <div className={cls}>
          <GameComponent {...this.props}/>
          <Overlay {...this.props}/>
        </div>
        <Footer {...this.props}/>
      </div>
    )
  }
}
