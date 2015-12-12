import React, { Component } from 'react'
import _ from 'underscore'
import Footer from './Footer'
import TopBar from './TopBar'
import CardTeam from './CardTeam'
import MenuOverlay from './MenuOverlay'

export default class MainComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="main-component container-fluid">
        <TopBar {...this.props}/>
        <div className="card-component-container">
          <MenuOverlay {...this.props}/>
          { /*}<CardTeam teamIndex={0} cardType="team-1" {...this.props} />
        <CardTeam teamIndex={1} cardType="team-2" {...this.props} /> */}
        </div>
        <Footer {...this.props}/>
      </div>
    )
  }
}
