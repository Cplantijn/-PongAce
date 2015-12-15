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
      this.refs.playerQuote.value = 
    }
    return true;
  }
  render() {
    var {activePlayerDetail} = this.props;
    var detail = <div className="empty-player-msg">
                  <h3>Select a Player</h3>
                </div>;
    if (_.size(activePlayerDetail) > 0) {
      var quote = activePlayerDetail.quote ? activePlayerDetail.quote : '';
      console.log(quote);
      detail = <div className="player-content">
                <div className="header"><h2>{activePlayerDetail.name}</h2></div>
                <div className="image-set-container">
                  <div className="image-center-container">
                    <div className="image-container">
                      <div className="single-image">
                        <img src={"../img/players/"+activePlayerDetail.standard_pose_img_name} alt="Standard Pose" />
                      </div>
                      <div className="label-container">
                        <span className="label image-label">Standard Picture</span>
                      </div>
                    </div>
                    <div className="image-container">
                      <div className="single-image">
                        <img src={"../img/players/"+activePlayerDetail.winning_pose_img_name} alt="Winning Pose" />
                      </div>
                      <div className="label-container">
                        <span className="label image-label">Standard Picture</span>
                      </div>
                    </div>
                  </div>
               </div>
               <div className="player-quote">
               <input
                  placeholder="Player Quote"
                  ref="playerQuote"
                  value={quote}
                  onKeyUp={this._quoteChange.bind(this, activePlayerDetail.id)}/>
               </div>
               <div className="player-history">
               <div className="score">
                <div className="score-title">SOLO <br /> WINS</div>
                <h2 className="score-value">{activePlayerDetail.solo_wins}</h2>
               </div>
               <div className="score">
                <div className="score-title">SOLO <br /> LOSSES</div>
                <h2 className="score-value">{activePlayerDetail.solo_losses}</h2>
               </div>
               <div className="score">
                <div className="score-title">DOUBLES <br /> WINS</div>
                <h2 className="score-value">{activePlayerDetail.doubles_wins}</h2>
               </div>
               <div className="score">
                <div className="score-title">DOUBLES <br /> LOSSES</div>
                <h2 className="score-value">{activePlayerDetail.doubles_losses}</h2>
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
