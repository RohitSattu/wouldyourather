import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {
  handleLogOut = () => {
    this.props.setAuthedUser(null)
  }
  render() {
    const { users, authedUser } = this.props
    return (
      <div className="NavWrapper">
        <div className="MainMenu">
          <Link className="menuItem" to="/">Home</Link>
          <Link className="menuItem" to="/add">New Question</Link>
          <Link className="menuItem" to="/leaderboard">Leaderboard</Link>
        </div>
        <div className="NavUserDetails">
          <img alt="{user.id}" src={users[authedUser].avatarURL} />
          {users[authedUser].name}
          <Link to="/" className="LogOutBtn" onClick={(e) => this.handleLogOut(e.target.value)}>Log Out</Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps({users, authedUser}) {
  return {
    users,
    authedUser
  }
}

export default connect(mapStateToProps, {setAuthedUser})(Nav)