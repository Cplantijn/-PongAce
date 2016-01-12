import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

export default class SettingsOverlay extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const  { fetchSettings } = this.props;
    fetchSettings();
  }
  _changeGamePoint(e) {
    const { changeGamePoint } = this.props;
    let num = e.target.value;

    if (!isNaN(num)) {
      if (num < 100) {
        if (!num.length) num = 0;
        changeGamePoint(parseInt(num, 10));
      }
    }
  }
  _changeServeInterval(e) {
    const { changeServeInterval, playerGroup } = this.props;
    const gp = playerGroup.game.serveInterval;
    let num = e.target.value;

    if (!isNaN(num)) {
      if (num < gp) {
        if (!num.length) num = 0;
        changeServeInterval(parseInt(num, 10));
      }
    }
  }
  _stepServeInterval(num) {
    const { playerGroup, changeServeInterval } = this.props;
    const gp = playerGroup.game.gamePoint;
    const si = playerGroup.game.serveInterval;
    if (((si + num) > 0) && ((si + num) < gp)) {
      changeServeInterval(parseInt(si + num, 10));
    }
  }
  _stepGamePoint(num) {
    const { playerGroup, changeGamePoint } = this.props;
    const gp = playerGroup.game.gamePoint;
    if ((num > 0 && gp < 99) || (num < 0 && gp > 1)) {
      changeGamePoint(parseInt(gp + num, 10));
    }
  }
  render() {
    var { playerGroup } = this.props;
    return (
      <div className="settings-container">
        <div className="setting-content game-point-container">
          <div className="header">
            <h2>GAME POINT</h2>
          </div>
          <div className="input-content">
            <input
              type="text"
              value={playerGroup.game.gamePoint}
              onChange={this._changeGamePoint.bind(this)}/>
            <div className="increment-decrement">
              <FontAwesome
                name="chevron-up"
                size="4x"
                className="point-indicator"
                onClick={this._stepGamePoint.bind(this, 1)} />
              <FontAwesome
                name="chevron-down"
                size="4x"
                className="point-indicator"
                onClick={this._stepGamePoint.bind(this, -1)} />
            </div>
          </div>
        </div>
        <div className="setting-content serve-interval-container">
          <div className="header">
            <h2>SERVE INTERVAL</h2>
          </div>
          <div className="input-content">
            <input
              type="text"
              value={playerGroup.game.serveInterval}
              onChange={this._changeServeInterval.bind(this)}/>
            <div className="increment-decrement">
              <FontAwesome
                name="chevron-up"
                size="4x"
                className="point-indicator"
                onClick={this._stepServeInterval.bind(this, 1)} />
              <FontAwesome
                name="chevron-down"
                size="4x"
                className="point-indicator"
                onClick={this._stepServeInterval.bind(this, -1)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
