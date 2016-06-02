import React, { Component } from 'react'
import Request from 'superagent'
import classnames from 'classnames'

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
							let classNames = classnames({
								'inline-block': true,
								'label': true,
								'label-primary': row.type == 1
							})
							return <li key={k}>
								<span className={classNames}>{row.type == 1 ? '收入' : '支出'}</span>
								<span style={{marginLeft:'10px',width:'100px'}} className="text-bold inline-block">{row.amount}</span>
								<span style={{marginLeft:'10px'}} className="inline-block">{row.description}</span>
							</li>
						})}
					</ul>
				</li>
			})}
		</ul></div>
	}

}
