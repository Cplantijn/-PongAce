import React, { Component } from 'react'
import Footer from './Footer'
import TopBar from './TopBar'
import TeamCard from './TeamCard'

export default class MainComponent extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="main-component container-fluid">
        <TopBar />
        <div className="card-component-container">
          <TeamCard cardType="team-1"/>
          <TeamCard cardType="team-2"/>
        </div>
        <Footer />
      </div>
    )
  }
}
