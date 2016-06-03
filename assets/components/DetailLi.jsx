import React, { Component } from 'react'
import classnames from 'classnames'

import Store from './Reducer.jsx'
import { updateAccounting, deleteAccounting } from './Actions.jsx'

export default class DetailLi extends Component {

	constructor(props) {
		super(props)
		props.data.update_status = false
		this.state = props.data
	}

	componentWillReceiveProps(nextProps) {
		nextProps.data.update_status = false
		this.setState(nextProps.data)
	}

	updateField(type, e) {
		let newState = this.state
		console.log(type, e)
		if (type == 'update') {
			newState['update_status'] = !newState['update_status']
			this.setState(newState)
		} else if (type == 'submit') {
			Store.dispatch(updateAccounting(newState))
			newState['update_status'] = false
		} else if (type == 'delete') {
			Store.dispatch(deleteAccounting(newState))
			newState['update_status'] = false
		} else {
			newState[e.target.name] = e.target.value
			this.setState(newState)
		}
	}

	render() {
		let classNames = classnames({
			'inline-block': true,
			'label': true,
			'label-primary': this.state.type == 1
		})
		return <li className="detail-li" key={this.state.id}>
		{this.state.update_status ?
			<div>
				<label className="form-radio inline-block">
					<input type="radio" name="type" value="1" 
						onChange={this.updateField.bind(this, null)} 
						checked={this.state.type == 1 ? true : false} />
					<i className="form-icon"></i> 收入
				</label>
				<label className="form-radio inline-block">
					<input type="radio" name="type" value="2" 
						onChange={this.updateField.bind(this, null)} 
						checked={this.state.type == 2 ? true : false} />
					<i className="form-icon"></i> 支出
				</label>
				<span style={{marginLeft:'10px',width:'100px'}} className="text-bold text-right inline-block">
					<input className="form-input" name="amount" type="text" id="input-example-3" 
						onChange={this.updateField.bind(this, null)}
						value={this.state.amount} />
				</span>
				<span style={{marginLeft:'10px'}} className="inline-block">
					<input className="form-input" name="description" type="text" id="input-example-4" 
						onChange={this.updateField.bind(this, null)}
						value={this.state.description} />
				</span>
				<span style={{marginLeft:'10px'}} className="inline-block btn btn-sm"
					onClick={this.updateField.bind(this, 'update')}>Cancel</span>
				<span style={{marginLeft:'10px'}} className="inline-block btn btn-sm btn-submit"
					onClick={this.updateField.bind(this, 'submit')}>Submit</span>
				<span style={{marginLeft:'10px'}} className="inline-block btn btn-sm btn-delete"
					onClick={this.updateField.bind(this, 'delete')}>Delete</span>
			</div>
		:
			<div>
				<span className={classNames}>{this.state.type == 1 ? '收入' : '支出'}</span>
				<span style={{marginLeft:'10px',width:'100px'}}
					className="text-bold text-right inline-block">{Number(this.state.amount).toFixed(2)}</span>
				<span style={{marginLeft:'10px',width:'200px'}}
					className="inline-block">{this.state.description}</span>
				<span style={{marginLeft:'10px'}}
					className="inline-block btn btn-sm detail-update-btn"
					onClick={this.updateField.bind(this, 'update')}>Update</span>
			</div>
		}
		</li>
	}

}
