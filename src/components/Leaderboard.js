import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
  render() {
    return (
      <div className='wrapper'>
        {this.props.leaders.map((user) => (
          <div key={user.id} className="idniWrapper">
            <p><img alt="{user.id}" src={user.avatarURL} />{user.name}</p>
            <p>Asked: {user.questionCount} questions</p>
            <p>Answered: {user.answerCount} answers</p>
            <h3>Total: {user.questionCount + user.answerCount}</h3>
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  const leaders = Object.values(users).map((user) => ({
    id: user.id,
    name: user.name,
    avatarURL: user.avatarURL,
    questionCount: user.questions.length,
    answerCount: Object.values(user.answers).length,
    total: Object.values(user.answers).length + user.questions.length
  })).sort((a, b) => a.total - b.total).reverse().slice(0,3)
  return {
    leaders
  }
}

export default connect(mapStateToProps)(Leaderboard)