import React, { Component } from 'react'
import _ from 'underscore'
import Footer from './Footer'
import TopBar from './TopBar'
import TeamCard from './TeamCard'

export default class MainComponent extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    var { cardData } = this.props
    return (
      <div className="main-component container-fluid">
        <TopBar />
        <div className="card-component-container">
          <TeamCard teamIndex={0} cardType="team-1" {...this.props} />
          <TeamCard teamIndex={1} cardType="team-2" {...this.props} />
        </div>
        <Footer />
      </div>
    )
  }
}
