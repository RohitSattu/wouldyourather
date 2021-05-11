import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PageNotFoundMa extends Component {
  render() {
    return (
      <div className="wrapper">Are you lost? <Link to='/'>Go Home</Link></div>
    )
  }
}

export default PageNotFoundMa