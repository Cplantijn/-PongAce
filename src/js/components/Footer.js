import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

export default class Footer extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="pong-section footer-bar">
        <div className="footer-container">
          <div className="footer-icon-pair">
            <FontAwesome
              className='footer-icon-icon'
              name='users'
              size='3x'
              title='Manage Users'/>
              <span className="footer-icon-title">Player Management</span>
          </div>
          <div className="footer-icon-pair">
            <FontAwesome
              className='footer-icon-icon'
                name='trophy'
                size='3x'
                title='Leader Boards'/>
                <span className="footer-icon-title">Leaderboard</span>
          </div>
          <div className="footer-icon-pair">
            <FontAwesome
              className='footer-icon-icon'
                name='history'
                size='3x'
                title='History'/>
                <span className="footer-icon-title">Match History</span>
          </div>
          <div className="footer-icon-pair">
            <FontAwesome
              className='footer-icon-icon'
              name='wrench'
              size='3x'
              title='Game Settings'/>
              <span className="footer-icon-title">Game Settings</span>
            </div>
        </div>
      </div>
    )
  }
}
