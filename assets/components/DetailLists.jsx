import React, { Component } from 'react'

import DetailLi from './DetailLi.jsx'

export default class DetailLists extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		return <div><pre>
			{Object.keys(this.props.data).length ? Object.keys(this.props.data).map((month) => {
				let monthData = this.props.data[month]
				return <li key={month}>
					<h4>{month}</h4>
					<ul>
						{monthData.map((row, k) => {
							return <DetailLi data={row} />
						})}
					</ul>
				</li>
			}) :
				<div className="empty">
					<i className="icon icon-people"></i>
					<p className="empty-title">There is no log found</p>
				</div>
			}
		</pre></div>
	}

}
