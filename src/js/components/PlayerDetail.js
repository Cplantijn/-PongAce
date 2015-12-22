import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import classNames from 'classNames'
import _ from 'underscore'

export default class PlayerDetail extends Component {
  constructor(props) {
    super(props)
  }
  _quoteChange(id, e) {
    var {changePlayerQuote} = this.props;
    if (e.which == 13) {
      changePlayerQuote(id, this.refs.playerQuote.value)
    }
    return true;
  }
  _uploadPic(type, e) {
    var { activePlayerDetail, changePlayerPic } = this.props;
    changePlayerPic(activePlayerDetail.id, type, e.target.files[0]);
  }
  render() {
    var {activePlayerDetail} = this.props;
    var detail = <div className="empty-player-msg">
                  <h3>Select a Player</h3>
                </div>;
    if (_.size(activePlayerDetail) > 0) {
      var quote = activePlayerDetail.quote ? activePlayerDetail.quote : '';
      var standardPicStyle = {
        backgroundImage: 'url("/player_img/'+ activePlayerDetail.standardPose + '")'
      }
      var winningPicStyle = {
        backgroundImage: 'url("/player_img/'+ activePlayerDetail.winningPose + '")'
      }
      detail = <div className="player-content">
                <div className="header"><h2>{activePlayerDetail.name}</h2></div>
                <div className="image-set-container">
                  <div className="image-center-container">
                    <div className="image-container">
                      <div className="single-image" style={standardPicStyle}>
                        <input onChange={this._uploadPic.bind(this, 'standard')} type="file" accept="image/*" />
                        <div className="overlay">
                          <FontAwesome
                            name="camera"
                            size="2x"
                            className="overlay-icon" />
                            <span>Edit Picture</span>
                        </div>
                      </div>
                      <div className="label-container">
                        <span className="label image-label">Standard Picture</span>
                      </div>
                    </div>
                    <div className="image-container">
                      <div className="single-image" style={winningPicStyle}>
                        <input onChange={this._uploadPic.bind(this, 'winning')}type="file" accept="image/*" />
                        <div className="overlay">
                          <FontAwesome
                            name="camera"
                            size="2x"
                            className="overlay-icon" />
                            <span>Edit Picture</span>
                        </div>
                      </div>
                      <div className="label-container">
                        <span className="label image-label">Winning Picture</span>
                      </div>
                    </div>
                  </div>
               </div>
               { /*<div className="player-quote">
                 <input
                   placeholder="Player Quote"
                   ref="playerQuote"
                   value={quote}
                   onKeyUp={this._quoteChange.bind(this, activePlayerDetail.id)}/>
               </div> */}
               <div className="player-history">
               <div className="score">
                <div className="score-title">SOLO <br /> WINS</div>
                <h2 className="score-value">{activePlayerDetail.singlesWins}</h2>
               </div>
               <div className="score">
                <div className="score-title">SOLO <br /> LOSSES</div>
                <h2 className="score-value">{activePlayerDetail.singlesLosses}</h2>
               </div>
               <div className="score">
                <div className="score-title">DOUBLES <br /> WINS</div>
                <h2 className="score-value">{activePlayerDetail.doublesWins}</h2>
               </div>
               <div className="score">
                <div className="score-title">DOUBLES <br /> LOSSES</div>
                <h2 className="score-value">{activePlayerDetail.doublesLosses}</h2>
               </div>
               </div>
              </div>
    }
    return (
      <div className="player-view">
        { detail }
      </div>
    )
  }
}
