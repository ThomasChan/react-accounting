import React, { Component } from 'react'
import classnames from 'classnames'
import DetailLi from './DetailLi.jsx'

export default class DetailLists extends Component {

	constructor(props) {
		super(props)
		this.state = {
			datas: props.data
		}
	}

	componentWillReceiveProps(nextProps) {
		let newState = this.state
		newState.datas = nextProps.data
		newState.datas[Object.keys(newState.datas)[0]].active = true
		this.setState(newState)
	}

	_showThisTab(month, e) {
		let newState = this.state
		Object.keys(newState.datas).map((_month) => {
			newState.datas[_month].active = false
		})
		newState.datas[month].active = true
		this.setState(newState)
	}

	render() {
		// console.log(this.state)
		let list = Object.keys(this.state.datas).map((month) => {
			let monthData = this.state.datas[month]
			let x = monthData.rows.filter((row, k) => {
				return row.type == 2
			})
			let tabClass = classnames({
				'is-active': monthData.active
			})
			let tabBlockClass = classnames({
				'nav-item-block': true,
				'is-block-active': monthData.active
			})
			return <li className={tabClass}>
				<a key={month} onClick={this._showThisTab.bind(this, month)}>
					<h4>{month}</h4>
				</a>
				<ul className={tabBlockClass}>
					<li>共支出 {x.length} 笔</li>
					{monthData.rows.map((row, k) => {
						return <DetailLi data={row} />
					})}
				</ul>
			</li>
		})
		return <div>
			{Object.keys(this.state.datas).length ? 
				<nav className="tabs is-fullwidth is-small">
					<ul>
						{list}
					</ul>
				</nav>
			:
				<div className="hero is-primary">
					<div className='hero-body'>
						<div className='container'>
							<h3 className='title is-3'>Empty</h3>
							<h5 className='subtitle is-5'>There is no log found</h5>
						</div>
					</div>
				</div>
			}
		</div>
	}

}
