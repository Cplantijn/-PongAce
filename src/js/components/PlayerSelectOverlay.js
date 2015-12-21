import React, { Component } from 'react'
import PlayerTileRow from './PlayerTileRow'
import classNames from 'classNames'
import _ from 'underscore'
import {Howl, Howler} from 'howler'
import PlayerGroup from './PlayerGroup'

export default class PlayerSelectOverlay extends Component {
  constructor(props) {
    super(props);
    this.howler = new Howl({
      urls: ['../sound/smash_theme.mp3', '../sound/smash_theme.ogg']
    });
  }
  componentDidMount(){
    //this.howler.play();
  }
  componentWillUnmount(){
    this.howler.stop();
  }
  render() {
    var { startSelection, playerList, playerGroup } = this.props;
    var playerRows = null, playerContainer = null;
    var row = 0;
    if (_.size(playerList) > 0) {
      playerContainer = _.groupBy(playerList, function(player, i) {
        if (i % 12 == 0) {
          row ++;
        }
        return row;
      });
      playerRows = _.map(playerContainer, function(playerRow, j){
        return (
          <PlayerTileRow
            key={j}
            players={playerRow} />
        )
      });
    }
    return (
      <div className="player-select-container">
        <div className="header-container"><h1>Choose your player</h1></div>
        <div className="roster-container">
          <div className="tile-container">
            {playerRows}
          </div>
        </div>
        <div className="selection-container">
          <PlayerGroup startSelection={startSelection} group={playerGroup.groupOne} groupNumber={1} />
          <div className="player-group-seperator">
            <div className="line-container">
              <div className="line" style={{marginTop: '1em'}}></div>
            </div>
            <div className="logo-container">
            <div className="logo"></div>
            </div>
            <div className="line-container">
              <div className="line" style={{marginBottom: '1em'}}></div>
            </div>
          </div>
          <PlayerGroup startSelection={startSelection} group={playerGroup.groupTwo} groupNumber={2} />
        </div>
      </div>
    )
  }
}
