import React, { Component } from 'react'

const _style = {fontSize:'18px'}

export default class Summary extends Component {

	constructor(props) {
		super(props)
		this.state = this.genData(props.data)
	}

	componentWillReceiveProps(nextProps) {
		this.setState(this.genData(nextProps.data))
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
		return <table className="table table-striped table-hover">
			<thead><tr><th>毛收入</th><th>总支出</th><th>月均支出</th><th>账户余额</th></tr></thead>
			<tbody>
				<tr>
					<td><span style={_style}>{this.state.shouru[0]}</span>.{this.state.shouru[1]}</td>
					<td><span style={_style}>{this.state.zhichu[0]}</span>.{this.state.zhichu[1]}</td>
					<td><span style={_style}>{this.state.ave[0]}</span>.{this.state.ave[1]}</td>
					<td><span style={_style}>{this.state.rem[0]}</span>.{this.state.rem[1]}</td>
				</tr>
			</tbody>
		</table>
	}

}



