import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionCard from './QuestionCard'

class Dashboard extends Component {
  state = {
    panel: 'unanswered'
  }
  toggleBtn = (val) => {
    this.setState({
      panel: val
    })
  }
  render() {
    const { answered, unanswered} = this.props
    return (
        <div className="homeWrapper">
          <div className="toggleWrapper">
            <button value="unanswered" className="toggleBttn" onClick={(e) => this.toggleBtn(e.target.value)}>Unanswered</button>
          <button value="answered" className="toggleBttn" onClick={(e) => this.toggleBtn(e.target.value)}>Answered</button>
          
          </div>
          {this.state.panel === "unanswered" 
          ? (
            <div className="QuestionsWrapper"> 
              <h1>Unanswered Questions</h1>
              {unanswered.map((q) => (
                <QuestionCard key={q.id} q={q} value={q.id} toggleBtn={this.toggleBtn} />
              ))}
            </div>
            ) 
          : (
            <div className="QuestionsWrapper">
              <h1>Answered Questions</h1>
              {answered.map((q) => (
                <QuestionCard key={q.id} q={q} value={q.id} toggleBtn={this.toggleBtn} />
                ))} 
            </div>
          )}
        </div>
    )
  }
}

function mapStateToProps( {authedUser, users, questions}) {
  const questionsId = Object.keys(users[authedUser].answers)
  const answered = Object.values(questions)
                          .filter((q) => questionsId.includes(q.id))
                          .sort((a, b) => a.timestamp - b.timestamp)
  const unanswered = Object.values(questions)
                          .filter((q) => !questionsId.includes(q.id))
                          .sort((a, b) => b.timestamp - a.timestamp)
  return {
    answered,
    unanswered
  }
}

export default connect(mapStateToProps)(Dashboard)