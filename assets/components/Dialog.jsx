import React, { Component } from 'react'

import { addAccounting } from './Actions.jsx'
import Store from './Reducer.jsx'

export default class Dialog extends Component {

	constructor(props) {
		super(props)
		this.state = {
			openModal: this.props.openModal,
			year: new Date().getFullYear(),
			month: new Date().getMonth() + 1,
			type: 1,
			amount: 0.00,
			description: '吃饭'
		}
	}

	componentWillReceiveProps(nextProps) {
		let newState = this.state
		newState.openModal = nextProps.openModal
		this.setState(newState)
	}

	_openModal(_status) {
		this.setState({openModal: _status})
	}

	_updateModal(e) {
		let newState = this.state
		newState[e.target.name] = e.target.value
		this.setState(newState)
	}

	_submitModal() {
		Store.dispatch(addAccounting(this.state))
	}

	render() {
		return <div className="modal-temp" style={this.state.openModal ? {display:'block'} : {display:'none'}}>
			<div className="modal-overlay"></div>
			<div className="modal-container">
				<div className="modal-header">
					<button type="button" className="btn btn-clear float-right" aria-label="Close" onClick={this._openModal.bind(this, false)}></button>
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
								<input className="form-input" name="amount" type="number" id="input-example-3" onChange={this._updateModal.bind(this)} placeholder={this.state.amount} value={this.state.amount} />
							</div>
							<div className="form-group">
								<label className="form-label" for="input-example-4">Description</label>
								<input className="form-input" name="description" type="text" id="input-example-4" onChange={this._updateModal.bind(this)} placeholder={this.state.description} value={this.state.description} />
							</div>
						</form>
					</div>
				</div>
				<div className="modal-footer">
					<button className="btn btn-link" onClick={this._openModal.bind(this, false)}>Close</button>
					<button className="btn btn-primary" onClick={this._submitModal.bind(this)}>Submit</button>
				</div>
			</div>
		</div>
	}
}
