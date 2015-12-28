import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

export default class SettingsOverlay extends Component {
  constructor(props) {
    super(props)
  }
  _changeGamePoint(e) {
    var num = e.target.value;
    var { changeGamePoint } = this.props;

    if (!isNaN(num)) {
      if (num < 100) {
        if (!num.length) num = 0;
        changeGamePoint(parseInt(num, 10));
      }
    }
  }
  _stepGamePoint(val) {
    var { playerGroup, changeGamePoint } = this.props;
    var gp = playerGroup.game.gamePoint;
    if ((val > 0 && gp < 99) || (val < 0 && gp > 1)) {
      changeGamePoint(parseInt(gp + val, 10));
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
          <div className="input-content"></div>
        </div>

      </div>
    )
  }
}
