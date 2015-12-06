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
    var { teamData, addTeam } = this.props.props;
    var teamCardOne, teamCardTwo;

      if (typeof teamData[0] !== 'undefined') {
        teamCardOne = <TeamCard active={true} score={teamData[0].score} cardType="team-1"/>
      } else {
        teamCardOne = <TeamCard addTeam={addTeam} cardType="team-1" active={false} />
      }

      if (typeof teamData[1] !== 'undefined') {
        teamCardTwo = <TeamCard active={true} score={teamData[1].score} cardType="team-2"/>
      } else {
        teamCardTwo = <TeamCard addTeam={addTeam} cardType="team-2" active={false} />
      }
    return (
      <div className="main-component container-fluid">
        <TopBar />
        <div className="card-component-container">
          {teamCardOne}
          {teamCardTwo}
        </div>
        <Footer />
      </div>
    )
  }
}
