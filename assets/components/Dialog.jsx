import React, { Component } from 'react'
import classnames from 'classnames'

import { addAccounting } from './Actions.jsx'
import Store from './Reducer.jsx'

export default class Dialog extends Component {

	constructor(props) {
		super(props)
		this.state = {
			Pending: this.props.data.Pending,
			openModal: this.props.data.openModal,
			year: new Date().getFullYear(),
			month: new Date().getMonth() + 1,
			type: 1,
			amount: 0.00,
			description: '吃饭'
		}
	}

	componentWillReceiveProps(nextProps) {
		let newState = this.state
		newState.Pending = nextProps.data.Pending
		newState.openModal = nextProps.data.openModal
		this.setState(newState)
	}

	_openModal(_status) {
		let newState = this.state
		newState.openModal = _status
		this.setState(newState)
	}

	_updateModal(e) {
		let newState = this.state
		newState[e.target.name] = e.target.value
		this.setState(newState)
	}

	_submitModal() {
		Store.dispatch(addAccounting('Pending', this.state))
	}

	render() {
		let submitClass = classnames({
			"btn":true,
			"btn-primary":true,
			"loading": this.state.Pending
		})
		return <div className="modal-temp" style={this.state.openModal ? {display:'block'} : {display:'none'}}>
			<div className="modal-overlay"></div>
			<div className="modal-container">
				<div className="modal-header">
					<div className="modal-title">记一笔</div>
				</div>
				<div className="modal-body">
					<div className="content">
						<form id="AddLogForm">
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
							<div className="form-group">
								<label className="form-label" for="input-example-3">Amount</label>
								<input className="form-input" name="amount" type="text" id="input-example-3" onChange={this._updateModal.bind(this)} placeholder={this.state.amount} value={this.state.amount} />
							</div>
							<div className="form-group">
								<label className="form-label" for="input-example-4">Description</label>
								<input className="form-input" name="description" type="text" id="input-example-4" onChange={this._updateModal.bind(this)} placeholder={this.state.description} value={this.state.description} />
							</div>
						</form>
					</div>
				</div>
				<div className="modal-footer">
					<button className={submitClass} onClick={this._submitModal.bind(this)}>Submit</button>
				</div>
			</div>
		</div>
	}
}
