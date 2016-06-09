import React, { Component } from 'react'

export default class LogSpecDetail extends Component {
	
	constructor(props) {
		super(props)
	}

	render() {
		return <div>
			{Object.keys(this.props.data).length ? Object.keys(this.props.data).map((key, index) => {
				let everyPiece = this.props.data[key]
				return <ul key={index} style={{listStyle: 'none'}}>
					<li>
						<h6>{key}<span className='inline-block' style={{marginLeft:'20px'}}>总计：{everyPiece.total} 元</span></h6>
					</li>
					<li>
					<ul style={{listStyle: 'none'}}>
						<li>
							<span className='inline-block' style={{width:'100px'}}>日期</span>
							<span className='inline-block' style={{width:'100px'}}>金额</span>
							<span className='inline-block'>描述</span>
						</li>
						{everyPiece.detail.map((row, key) => {
							return <li key={key}>
								<span className='inline-block' style={{width:'100px'}}>{row.date}</span>
								<span className='inline-block' style={{width:'100px'}}>{row.amount} 元</span>
								<span className='inline-block'>{row.description}</span>
							</li>
						})}
					</ul>
					</li>
				</ul>
			}) :
				<div className="empty">
					<i className="icon icon-people"></i>
					<p className="empty-title">There is no log found</p>
				</div>
			}
		</div>
	}

}
