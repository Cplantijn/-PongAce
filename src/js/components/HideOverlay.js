import React, { Component } from 'react'
import classNames from 'classnames'
import FontAwesome from 'react-fontawesome'


export default class HideOverlay extends Component {
  constructor(props) {
    super(props)
  }
  _hideOverlay(){
    var { hideOverlay } = this.props;
    hideOverlay();
  }
  render() {
    var  { show } = this.props;
    var cls = classNames({
      'overlay-top' : true,
      'hidden': !show
    })
    return (
      <div className={cls}>
        <div
          className="hide-overlay-container"
          onClick={this._hideOverlay.bind(this)}>
          <FontAwesome
            className='hide-overlay-icon'
            name='caret-down'
            size='2x'
            title='Collapse'/>
        </div>
      </div>
    )
  }
}
