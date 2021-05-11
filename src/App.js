import './App.css';
import React, { Component } from 'react'
import { handleInitialData } from './actions/shared'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import Nav from './components/Nav'
import PageNotFoundMa from './components/PageNotFoundMa'
import AddPoll from './components/AddPoll'
import Leaderboard from './components/Leaderboard'
import QuestionCard from './components/QuestionCard'

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData()
  }
  render() {
    const { authedUser } = this.props
    return (
      <div className="App">
        {authedUser === null ? (
          <Route render={() => (
            <Login />)} />
          ) : (
            <>
            <Nav />
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route path="/questions/:question_id" component={QuestionCard} />
              <Route path="/add" component={AddPoll} />
              <Route path="/leaderboard" component={Leaderboard} />
              <Route path='/badRequest' component={PageNotFoundMa} />
              <Route component={PageNotFoundMa} />
            </Switch>
          </>
        )} 
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps, {handleInitialData})(App)
