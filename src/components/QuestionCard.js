import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { handleQAs } from '../actions/questions'

class QuestionCard extends Component {
  handleAnswers(q, authedUser, answer) {
    const res = {}
    res.authedUser = authedUser
    res.qid = q.id
    res.answer = answer
    this.props.handleQAs(res)
    if (!this.props.onSinglePoll) {this.props.toggleBtn('answered')}
  }
  render() {
    const {authedUser, ques, onSinglePoll, badRequest, users } = this.props
    return (
      <>
      {badRequest ? <Redirect push to='/badRequest' /> : (
      <div key={ques.id} className="UserCardWrapper">
        <p className="questionAuthor"><img alt="{users[ques.author].id}" src={users[ques.author].avatarURL} />{ques.author} asks: </p>
        <p className="game">would you rather... </p>
        <div className="options">
          <div className="optionOne">
            <button className="optionBtn" onClick={(e) => this.handleAnswers(ques, authedUser, e.target.value)} value="optionOne">{ques.optionOne.text}</button>
          </div>
          <p>OR...</p>
          <div className="optionTwo">
            <button className="optionBtn" onClick={(e) => this.handleAnswers(ques, authedUser, e.target.value)} value="optionTwo">{ques.optionTwo.text}</button>
          </div>
        </div>
        <h2>{ques.optionOne.votes.includes(authedUser) 
                          ? <span>Your Vote: {ques.optionOne.text}</span>
                          : (ques.optionTwo.votes.includes(authedUser) 
                                ? <span>Your Vote: {ques.optionTwo.text}</span>
                                : "Please vote...")}</h2>
        <p>{ques.optionOne.votes.length} out of {ques.optionOne.votes.length + ques.optionTwo.votes.length} ({((ques.optionOne.votes.length / (ques.optionOne.votes.length + ques.optionTwo.votes.length))*100).toFixed(2) }%) voted for {ques.optionOne.text} </p>
        <p>{ques.optionTwo.votes.length} out of {ques.optionOne.votes.length + ques.optionTwo.votes.length} ({((ques.optionTwo.votes.length / (ques.optionOne.votes.length + ques.optionTwo.votes.length))*100).toFixed(2) }%) voted for {ques.optionTwo.text}</p>
        {onSinglePoll ? <Link to="/">Back to Home</Link> : <Link to={`/questions/${ques.id}`}>View Poll</Link>}
      </div>)}
      </>
    )
  }
}

function mapStateToProps( {authedUser, questions, users}, {match, q, toggleBtn}) {
  let ques
  let onSinglePoll
  let badRequest = false
  if (!q) {
    const { question_id } = match.params
    ques = questions[question_id]
    onSinglePoll = true
  } else {
    ques = q
    onSinglePoll = false
  }
  ques === undefined ? badRequest = true : badRequest = false
  return {
    authedUser,
    ques,
    onSinglePoll,
    badRequest,
    users
  }
}

export default connect(mapStateToProps, { handleQAs })(QuestionCard)