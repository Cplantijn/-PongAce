import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import _ from 'underscore';

export default class PlayerDetail extends Component {
  constructor(props) {
    super(props);
  }
  _uploadPic(type, e) {
    const { showcasedPlayer, changePlayerPic } = this.props;
    changePlayerPic(showcasedPlayer.id, type, e.target.files[0]);
  }
  _showImageSelectModal(picType) {
    const { showImageSelectModal } = this.props;
    showImageSelectModal(picType);
  }
  render() {
    const { showcasedPlayer, showImageSelectModal } = this.props;

    let detail = (
      <div className='empty-player-msg'>
        <h3>Select a Player</h3>
      </div>);
    if (_.size(showcasedPlayer) > 0) {
      const standardPicStyle = {
        backgroundImage: 'url("/player_img/' + showcasedPlayer.standardPose + '")'
      };
      const winningPicStyle = {
        backgroundImage: 'url("/player_img/' + showcasedPlayer.winningPose + '")'
      };
      detail = (<div className="player-content">
                  <div className="header"><h2>{showcasedPlayer.name}</h2></div>
                  <div className="image-set-container">
                    <div className="image-center-container">
                      <div
                        className="image-container"
                        onClick={this._showImageSelectModal.bind(this, 'standard')}>
                        <div className="single-image" style={standardPicStyle}>
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
                      <div
                        className="image-container"
                        onClick={this._showImageSelectModal.bind(this, 'winning')}>
                        <div className="single-image" style={winningPicStyle}>
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
                 <div className="player-history">
                 <div className="score">
                  <div className="score-title">SOLO <br /> WINS</div>
                  <h2 className="score-value">{showcasedPlayer.singlesWins}</h2>
                 </div>
                 <div className="score">
                  <div className="score-title">SOLO <br /> LOSSES</div>
                  <h2 className="score-value">{showcasedPlayer.singlesLosses}</h2>
                 </div>
                 <div className="score">
                  <div className="score-title">DOUBLES <br /> WINS</div>
                  <h2 className="score-value">{showcasedPlayer.doublesWins}</h2>
                 </div>
                 <div className="score">
                  <div className="score-title">DOUBLES <br /> LOSSES</div>
                  <h2 className="score-value">{showcasedPlayer.doublesLosses}</h2>
                 </div>
                 </div>
              </div>);
    }
    return (
      <div className="player-view">
        { detail }
      </div>
    );
  }
}

PlayerDetail.propTypes = {
  showImageSelectModal: React.PropTypes.func,
  changePlayerPic: React.PropTypes.func,
  showcasedPlayer: React.PropTypes.object,
};
