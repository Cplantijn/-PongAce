
import React, { Component } from 'react'
import classNames from 'classNames'
import _ from 'underscore'

export default class WinnerPopUp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var { game } = this.props;
    var winnerGroup = null, loserGroup = null, winningScore = null, losingScore = null;
    var winningKey = game.winner;
    var losingKey = winningKey == 'groupOne' ? 'groupTwo' : 'groupOne';
    var cls = classNames({
      'winner-pop': true,
      'open': game.winner !== null,
      'group-one': game.winner == 'groupOne',
      'group-two': game.winner == 'groupTwo'
    });

    if (game.winner) {
      var winKey = -1;
      var loseKey = -1;
      var winningMessage='';
      winnerGroup = _.map(game[winningKey], function(el, key){
        if (key == 'playerOne' || key == 'playerTwo') {
          if (el.active) {
            var style = {
              backgroundImage: 'url("/player_img/'+ el.winningPose + '")'
            }
            if (!winningMessage.length){
              winningMessage+=el.name;
            } else {
              winningMessage+= ' & ' + el.name;
            }
            winKey++;
            return (
              <div
                key={winKey}
                className="winning-player"
                style={style} />
            )
          }
        }
      });

      loserGroup = _.map(game[losingKey], function(el, key){
        if (key == 'playerOne' || key == 'playerTwo') {
          if (el.active) {
            var style = {
              backgroundImage: 'url("/player_img/'+ el.standardPose + '")'
            }
            loseKey++
            return (
              <div
                key={loseKey}
                className="losing-player"
                style={style} />
            )
          }
        }
      });
      //TODO better way
      if (winningMessage.indexOf('&') > -1) {
        winningMessage+=' win!'
      } else {
        winningMessage+=' wins!'
      }
      if (game[winningKey].rawScore > game.game.gamePoint ){
        winningScore = <h2>{game[winningKey].score}<span className="raw-score">({game[winningKey].rawScore})</span></h2>
      } else {
        winningScore = <h2>{game[winningKey].score}</h2>
      }
      if (game[losingKey].rawScore > game.game.gamePoint ){
        losingScore = <h2>{game[losingKey].score}<span className="raw-score">({game[losingKey].rawScore})</span></h2>
      } else {
        losingScore = <h2>{game[losingKey].score}</h2>
      }
    }

    return (
      <div className={cls} >
        <div className="message-container">
          <h2>{winningMessage}</h2>
        </div>
        <div className="winner-container">
          {winnerGroup}
        </div>
        <div className="score-container">
          <div className="winning-score">
            {winningScore}
          </div>
          <div className="score-padding">Final Score</div>
          <div className="losing-score">
            {losingScore}
          </div>
        </div>
        <div className="loser-container">
          {loserGroup}
        </div>
      </div>
    )
  }
}
