import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { handleAddQuestion } from '../actions/questions'

class AddPoll extends Component {

  state = {
    optionOne: '',
    optionTwo: '',
    submitConfirmed: false
  }

  handleOptionOne = (val) => {
    this.setState({
          optionOne: val
        })
  }

  handleOptionTwo = (val) => {
    this.setState({
      optionTwo: val
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {optionOne, optionTwo} = this.state
      this.props.handleAddQuestion(optionOne, optionTwo, this.props.authedUser)
        .then(() => {this.setState({
                  optionOne: '',
                  optionTwo: ''
                });
                this.setState({submitConfirmed: true}) })
  }

  render() {
    if (this.state.submitConfirmed === true) { return <Redirect to='/'/> }
    return (
      <div className="wrapper">
        <h1>Create New Poll</h1>
        <h2>would you rather...</h2>
        <form onSubmit={this.handleSubmit}>
          <input id="optionOne" value={this.state.optionOne} onChange={(e) => this.handleOptionOne(e.target.value)} type="text" placeholder="Question One" required/>
          <input id="optionTwo" value={this.state.optionTwo} onChange={(e) => this.handleOptionTwo(e.target.value)} type="text" placeholder="Question Two" required/>
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

function mapStateToProps({authedUser}) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps, {handleAddQuestion})(AddPoll)