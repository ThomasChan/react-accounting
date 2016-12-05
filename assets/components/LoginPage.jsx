import React, { Component } from 'react'
import classnames from 'classnames'

import { login } from './Actions.jsx'
import Store from './Reducer.jsx'

export default class LoginPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      pending: this.props.pending,
      user: 'Thomas',
      pass: 'Thomas'
    }
  }

  componentWillReceiveProps(nextProps) {
    let newState = this.state
    newState.pending = nextProps.pending
    this.setState(newState)
  }

  updateModal(e) {
    let newState = this.state
    newState[e.target.name] = e.target.value
    this.setState(newState)
  }

  startUp() {
    Store.dispatch(login('Pending'))
  }

  render() {
    let btnClassName = classnames({
      'button': true,
      'is-loading': this.state.pending
    })
    return <div className="hero is-primary is-fullheight">
      <div className='hero-body'>
        <div className='container'>
          <h3 className='title is-3'>欢迎回来</h3>
          <h5 className='subtitle is-5'>记录每一笔收入支出，看你怎么！花！钱！的！</h5>
          <button className={btnClassName} onClick={this.startUp.bind(this)}>开始</button>
        </div>
      </div>
    </div>
  }
}
