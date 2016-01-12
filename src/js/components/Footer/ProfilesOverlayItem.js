import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import classNames from 'classNames';

export default class ProfilesOverlayItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { onClick, overlay } = this.props;
    const cls = classNames({
      'footer-icon-pair': true,
      'profile': true,
      'active': (overlay.isOpen && overlay.activeIndex === 0)
    });
    return (
        <div
          className={cls}
          onClick={onClick.bind(this, 0)}>
          <FontAwesome
            className="footer-icon-icon"
            name="users"
            size="2x"
            title="Manage Profiles"/>
            <span className="footer-icon-title">Profiles</span>
        </div>
    );
  }
}

ProfilesOverlayItem.propTypes = {
  onClick: React.PropTypes.func,
  overlay: React.PropTypes.object
};
