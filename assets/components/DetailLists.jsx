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
		this.state = props.data
	}

	componentWillReceiveProps(nextProps) {
		this.setState(nextProps.data)
	}

	render() {
		return <div style={_overflow_style}><ul>
			{Object.keys(this.state).map((month, i) => {
				let monthData = this.state[month]
				return <li key={i}>
					<h4>{month}</h4>
					<ul>
						{monthData.map((row, k) => {
							return <DetailLi data={row} />
						})}
					</ul>
				</li>
			})}
		</ul></div>
	}

}
