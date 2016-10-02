import React, { Component } from 'react';
import classNames from 'classNames';
import FontAwesome from 'react-fontawesome';
import Webcam from 'react-webcam';

export default class CameraContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { modal, showWebCamUnavailable, showWebCamAvailable } = this.props;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(() => {
        showWebCamAvailable();
      }, (error) => {
        showWebCamUnavailable();
      });
    }
  }
  _queuePicture() {
    const { playerPicCountDown, showcasedPlayer, modal } = this.props;
    if (modal.cameraCountDown == null) {
      var pictureUrl = this.refs.camera.getScreenshot();
      playerPicCountDown();
    }
  }
  _takePicture() {
    const { takePicture, showcasedPlayer, modal } = this.props;
    var pictureUrl = this.refs.camera.getScreenshot();
    takePicture(showcasedPlayer.id, modal.picType, pictureUrl);
  }
  render() {
    const { modal } = this.props;
    let countDownNumber = modal.cameraCountDown;

    const btnCls = classNames({
      'btn': true,
      'take-picture-btn': true,
      'disabled': countDownNumber !== null && countDownNumber > -1
    })

    let webcam = (
      <div className="no-camera-detected">
        <FontAwesome
          name="camera"
          size="4x" />
          <span>{'No Webcam detected :-( '}</span>
      </div>
    );
    let countDownContainer = null;

    if (countDownNumber !== null && countDownNumber > -1) {
      if (countDownNumber === 0) {
        const takePic = this._takePicture.bind(this);
        takePic();
      }
      countDownNumber = countDownNumber === 0 ? 'SNAP!' : countDownNumber;
      countDownContainer = (
        <span className="camera-countdown">{countDownNumber}</span>
      )
    }
    if (modal.isCameraEnabled) {
      webcam = (
        <div className="active-camera-wrapper">
          <div className="active-camera">
          {countDownContainer}
            <Webcam height="auto" width="100%" ref="camera" />
          </div>
          <button
            className={btnCls}
            onClick={this._queuePicture.bind(this)}>
            Take Picture
          </button>
        </div>
      )
    }
    return (
      <div className="camera-container">
        {webcam}
      </div>
    );
  }
}

CameraContainer.propTypes = {
  showWebCamUnavailable: React.PropTypes.func,
  playerPicCountDown: React.PropTypes.func,
  takePicture: React.PropTypes.func,
  showcasedPlayer: React.PropTypes.object,
  modal: React.PropTypes.object
};
