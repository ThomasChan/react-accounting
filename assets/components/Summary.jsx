import React, { Component } from 'react'

const _style = {fontSize:'22px'}

export default class Summary extends Component {

	constructor(props) {
		super(props)
		this.state = this.genData(props.data)
	}

	componentDidMount() {
	}

	componentWillReceiveProps(nextProps) {
		this.setState(this.genData(nextProps.data))
		console.log('componentWillReceiveProps', this.state)
	}

	genData(data) {
		Object.keys(data).map((name) => {
			data[name] = this.formatCash(data[name]).split('.')
		})
		return data
	}

	formatCash(cash, fixed) {
        var fixed = fixed ? fixed : 4
        return Number(cash).toFixed(fixed).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    }

	render() {
		return <div className="tile is-parent">
			<article className="tile is-child notification is-primary">
				<nav className="level is-info">
					<div className="level-item has-text-centered is-primary">
						<p className="heading">毛收入</p>
						<p className="title"><span className="subtitle is-4">{this.state.shouru[0]}</span>.<span className="subtitle is-6">{this.state.shouru[1]}</span></p>
					</div>
					<div className="level-item has-text-centered is-info">
						<p className="heading">总支出</p>
						<p className="title"><span className="subtitle is-4">{this.state.zhichu[0]}</span>.<span className="subtitle is-6">{this.state.zhichu[1]}</span></p>
					</div>
					<div className="level-item has-text-centered is-success">
						<p className="heading">月均支出</p>
						<p className="title"><span className="subtitle is-4">{this.state.ave[0]}</span>.<span className="subtitle is-6">{this.state.ave[1]}</span></p>
					</div>
					<div className="level-item has-text-centered is-danger">
						<p className="heading">账户余额</p>
						<p className="title"><span className="subtitle is-4">{this.state.rem[0]}</span>.<span className="subtitle is-6">{this.state.rem[1]}</span></p>
					</div>
				</nav>
			</article>
		</div>
	}

}



