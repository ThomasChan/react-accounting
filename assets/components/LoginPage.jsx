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
			'btn': true,
			'btn-primary': true,
			'btn-block': true,
			'loading': this.state.pending
		})
		return <div className='login-page'>
			<div className='card'>
				<div className='card-image'>
					<img className='inline-block' src='/img/favicon.jpeg' />
				</div>
				<div className='card-header'>
					<h4 className='card-title'>欢迎回来</h4>
					<h6 className='card-meta'>记录每一笔收入支出，看你怎么！花！钱！的！</h6>
				</div>
				{/*<div className='card-body'>
					<div className="form-group">
						<label className="form-label" for="input-example-1">User</label>
						<input className="form-input" name="user" type="text" id="input-example-1" onChange={this.updateModal.bind(this)} placeholder={this.state.user} value={this.state.user} />
					</div>
					<div className="form-group">
						<label className="form-label" for="input-example-2">Pass</label>
						<input className="form-input" name="pass" type="password" id="input-example-2" onChange={this.updateModal.bind(this)} placeholder={this.state.pass} value={this.state.pass} />
					</div>
				</div>*/}
				<div className='card-footer'>
					<button className={btnClassName} onClick={this.startUp.bind(this)}>开始</button>
				</div>
			</div>
		</div>
	}
}
