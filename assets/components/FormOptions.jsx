import React, { Component } from 'react'
import classnames from 'classnames'

import { addAccounting } from './Actions.jsx'
import Store from './Reducer.jsx'

export default class Dialog extends Component {

	constructor(props) {
		super(props)
		this.state = {
			pending: this.props.pending,
			isWife: false,
			year: new Date().getFullYear(),
			month: new Date().getMonth() + 1,
			date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
			type: 1,
			amount: 0.00,
			description: '吃饭'
		}
	}

	componentWillReceiveProps(nextProps) {
		let newState = this.state
		newState.pending = nextProps.pending
		this.setState(newState)
	}

	_updateModal(e) {
		let newState = this.state
		newState[e.target.name] = e.target.type == 'checkbox' ? e.target.checked : e.target.value
		this.setState(newState)
	}

	_submitModal() {
		Store.dispatch(addAccounting('Pending', this.state))
	}

	render() {
		let submitClass = classnames({
			"btn":true,
			"btn-primary":true,
			"loading": this.state.pending
		})
		return <form id="AddLogForm">
			<div className="form-group">
				<label class="form-switch">
					<input type="checkbox" name="isWife" onChange={this._updateModal.bind(this)} />
					<i class="form-icon"></i> 红包
				</label>
			</div>
			{ this.state.isWife ? 
				<div className="form-group">
					<label className="form-label" for="input-example-1">date</label>
					<input className="form-input" name="date" type="text" id="input-example-1" onChange={this._updateModal.bind(this)} placeholder={this.state.date} value={this.state.date} />
				</div>
				:
				<div>
				<div className="form-group">
					<label className="form-label" for="input-example-1">Year</label>
					<input className="form-input" name="year" type="date-year" id="input-example-1" onChange={this._updateModal.bind(this)} placeholder={this.state.year} value={this.state.year} />
				</div>
				<div className="form-group">
					<label className="form-label" for="input-example-2">Month</label>
					<input className="form-input" name="month" type="date-month" id="input-example-2" onChange={this._updateModal.bind(this)} placeholder={this.state.month} value={this.state.month} />
				</div>
				<div className="form-group">
					<label className="form-label">Type</label>
					<label className="form-radio">
						<input type="radio" name="type" value="1" onChange={this._updateModal.bind(this)} checked={this.state.type == 1 ? true : false} />
						<i className="form-icon"></i> 收入
					</label>
					<label className="form-radio">
						<input type="radio" name="type" value="2" onChange={this._updateModal.bind(this)} checked={this.state.type == 2 ? true : false} />
						<i className="form-icon"></i> 支出
					</label>
				</div>
				</div>
			}
			<div className="form-group">
				<label className="form-label" for="input-example-3">Amount</label>
				<input className="form-input" name="amount" type="text" id="input-example-3" onChange={this._updateModal.bind(this)} placeholder={this.state.amount} value={this.state.amount} />
			</div>
			<div className="form-group">
				<label className="form-label" for="input-example-4">Description</label>
				<input className="form-input" name="description" type="text" id="input-example-4" onChange={this._updateModal.bind(this)} placeholder={this.state.description} value={this.state.description} />
			</div>
			<button className={submitClass} onClick={this._submitModal.bind(this)}>Submit</button>
		</form>
	}
}
