import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import '../App.css'

export class Login extends Component {
  handleLogin = (authedUser) => {
    this.props.setAuthedUser(authedUser)
  }
  render() {
    const { users } = this.props
    
    return (
      <div className="loginDiv">
      <h3>Log In With</h3>
      {users.map((user) => 
        <button className="loginUsers" key={user.id} value={user.id} onClick={(e) => this.handleLogin(user.id)}><img alt="{user.id}" src={user.avatarURL} /> <br/>{user.id}</button>
      )}
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    users: Object.values(users)
  }
}

export default connect(mapStateToProps, { setAuthedUser })(Login)