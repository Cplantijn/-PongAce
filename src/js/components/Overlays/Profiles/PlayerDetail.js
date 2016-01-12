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
    var { showcasePlayer, changePlayerPic } = this.props;
    changePlayerPic(showcasePlayer.id, type, e.target.files[0]);
  }
  render() {
    var {showcasePlayer} = this.props;
    var detail = <div className="empty-player-msg">
                  <h3>Select a Player</h3>
                </div>;
    if (_.size(showcasePlayer) > 0) {
      var quote = showcasePlayer.quote ? showcasePlayer.quote : '';
      var standardPicStyle = {
        backgroundImage: 'url("/player_img/'+ showcasePlayer.standardPose + '")'
      }
      var winningPicStyle = {
        backgroundImage: 'url("/player_img/'+ showcasePlayer.winningPose + '")'
      }
      detail = <div className="player-content">
                <div className="header"><h2>{showcasePlayer.name}</h2></div>
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
                   onKeyUp={this._quoteChange.bind(this, showcasePlayer.id)}/>
               </div> */}
               <div className="player-history">
               <div className="score">
                <div className="score-title">SOLO <br /> WINS</div>
                <h2 className="score-value">{showcasePlayer.singlesWins}</h2>
               </div>
               <div className="score">
                <div className="score-title">SOLO <br /> LOSSES</div>
                <h2 className="score-value">{showcasePlayer.singlesLosses}</h2>
               </div>
               <div className="score">
                <div className="score-title">DOUBLES <br /> WINS</div>
                <h2 className="score-value">{showcasePlayer.doublesWins}</h2>
               </div>
               <div className="score">
                <div className="score-title">DOUBLES <br /> LOSSES</div>
                <h2 className="score-value">{showcasePlayer.doublesLosses}</h2>
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
