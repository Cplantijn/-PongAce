import React, { Component } from 'react';
import classNames from 'classNames';
import FontAwesome from 'react-fontawesome';
import CameraContainer from './CameraContainer';

export default class ImageSelectModal extends Component {
  constructor (props) {
    super(props);
  }
  _closeModal () {
    const { closeImageSelectModal } = this.props;
    closeImageSelectModal();
  }
  _queuePicture () {
    console.log(this.refs.webcam);
  }
  render() {
    const {
          modal,
          showWebCamAvailable,
          showWebCamUnavailable,
          playerPicCountDown,
          showcasedPlayer,
          takePicture
         } = this.props;
    let modalContent = null;

    const modalCls = classNames({
      'modal-background': true,
      'hidden': !modal.isOpen
    });

    if (modal.isOpen) {
      modalContent = (
        <div className="modal-container">
          <FontAwesome
            name="close"
            onClick={this._closeModal.bind(this)}
            size="2x"
            className="close-btn" />
            <div className="picture-container">
              <CameraContainer
                modal={modal}
                playerPicCountDown={playerPicCountDown}
                takePicture={takePicture}
                showcasedPlayer={showcasedPlayer}
                showWebCamAvailable={showWebCamAvailable}
                showWebCamUnavailable={showWebCamUnavailable} />
            </div>
        </div>
      )
    }


    return (
      <div className={modalCls}>
        {modalContent}
      </div>
    );
  }
}

ImageSelectModal.propTypes = {
  modal: React.PropTypes.object,
  closeImageSelectModal: React.PropTypes.func,
  showWebCamUnavailable: React.PropTypes.func,
  showWebCamAvailable: React.PropTypes.func,
  playerPicCountDown: React.PropTypes.func,
  showcasedPlayer: React.PropTypes.object,
  takePicture: React.PropTypes.func
};
