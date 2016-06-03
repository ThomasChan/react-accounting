import React, { Component } from 'react'

import DetailLi from './DetailLi.jsx'

const _overflow_style = {
	position: 'absolute',
	width: '100%',
	height: '66%',
	overflow: 'scroll'
}

export default class DetailLists extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		return <div style={_overflow_style}><pre>
			{Object.keys(this.props.data).map((month) => {
				let monthData = this.props.data[month]
				return <li key={month}>
					<h4>{month}</h4>
					<ul>
						{monthData.map((row, k) => {
							return <DetailLi data={row} />
						})}
					</ul>
				</li>
			})}
		</pre></div>
	}

}
