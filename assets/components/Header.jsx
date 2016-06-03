import React, { Component } from 'react'
import Dialog from './Dialog.jsx'

export default class Header extends Component {

	constructor(props) {
		super(props)
		this.state = {
			Pending: this.props.Pending,
			openModal: false
		}
	}

	_openModal(_status) {
		this.setState({
			Pending: this.state.Pending,
			openModal: !this.state.openModal
		})
	}

	render() {
		return <header className="navbar">
			<section className="navbar-section">
				<a className="navbar-brand">Accounting | 记账</a>
			</section>
			<section className="navbar-section">
				<a className="btn" onClick={this._openModal.bind(this)}>记一笔</a>
			</section>
			<Dialog data={this.state} />
		</header>
	}
	
}
