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
		if (type == 'update') {
			newState['update_status'] = !newState['update_status']
			this.setState(newState)
		} else if (type == 'submit') {
			Store.dispatch(updateAccounting({
				id: newState.id,
				type: newState.type,
				amount: newState.amount,
				description: newState.description
			}))
			newState['update_status'] = false
		} else if (type == 'delete') {
			Store.dispatch(deleteAccounting({
				id: newState.id
			}))
			newState['update_status'] = false
		} else {
			let key = e.target.name
			if (e.target.name.match(/type\d+/)) {
				key = 'type'
			}
			newState[key] = e.target.value
			this.setState(newState)
		}
	}

	render() {
		let classNames = classnames({
			'inline-block': true,
			'label': true,
			'is-primary': this.state.type == 1
		})
		return <li className="detail-li" key={this.state.id}>
		{this.state.update_status ?
			<div>
				<label className="form-radio inline-block">
					<input type="radio" name={"type"+this.state.id} value="1" 
						onChange={this.updateField.bind(this, null)} 
						checked={this.state.type == 1 ? true : false} />
					<i className="form-icon"></i> 收入
				</label>
				<label className="form-radio inline-block">
					<input type="radio" name={"type"+this.state.id} value="2" 
						onChange={this.updateField.bind(this, null)} 
						checked={this.state.type == 2 ? true : false} />
					<i className="form-icon"></i> 支出
				</label>
				<span style={{marginLeft:'10px',width:'100px'}} className="text-bold text-right inline-block">
					<input className="input" name="amount" type="text" id="input-example-3"
						onChange={this.updateField.bind(this, null)}
						value={this.state.amount} />
				</span>
				<span style={{marginLeft:'10px',width:'100px'}} className="inline-block">
					<input className="input" name="description" type="text" id="input-example-4"
						onChange={this.updateField.bind(this, null)}
						value={this.state.description} />
				</span>
				<span style={{marginLeft:'10px'}} className="button"
					onClick={this.updateField.bind(this, 'update')}>Cancel</span>
				<span style={{marginLeft:'10px'}} className="button is-primary"
					onClick={this.updateField.bind(this, 'submit')}>Submit</span>
			</div>
		:
			<div className={classNames}>
				<span>{this.state.type == 1 ? '收入' : '支出'}</span>
				<span style={{marginLeft:'10px',width:'100px'}}
					className="text-bold text-right inline-block">{Number(this.state.amount).toFixed(2)}</span>
				<span style={{marginLeft:'10px',width:'200px'}}
					className="inline-block">{this.state.description}</span>
				<span style={{marginLeft:'10px'}}
					className="button is-danger"
					onClick={this.updateField.bind(this, 'delete')}>Delete</span>
				<span style={{marginLeft:'10px'}}
					className="button is-primary"
					onClick={this.updateField.bind(this, 'update')}>Update</span>
			</div>
		}
		</li>
	}

}
