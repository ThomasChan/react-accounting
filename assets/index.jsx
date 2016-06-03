
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Request from 'superagent'

import { getAllDatas } from './components/Actions.jsx'
import Store from './components/Reducer.jsx'

import Header from './components/Header.jsx'
import ChartsDatas from './components/ChartsDatas.jsx'
import Summary from './components/Summary.jsx'
import DetailLists from './components/DetailLists.jsx'

Store.dispatch(getAllDatas('Pending'))

class App extends Component {

	constructor(props) {
		super(props)
		let initData = Store.getState()
		let newState = this.parseAllData(initData.data)
		newState.Pending = initData.Pending
		console.info(newState)
		this.state = newState
	}

	componentDidMount() {
		Store.subscribe(() => {
			let initData = Store.getState()
			let newState = this.parseAllData(initData.data)
			newState.Pending = initData.Pending
			console.info(newState)
			this.setState(newState)
		})
	}

	render() {
		return <div>
			<Header />
			{this.state.Pending ? <div className="load-data-loading"><div className="loading"></div></div> : null}
			<div className="container">
				<div className="columns">
					<div className="column col-7">
						<h3>收支趋势</h3>
						<ChartsDatas data={this.state.chartsData} />
					</div>
					<div className="column col-5">
						<h3>汇总</h3>
						<Summary data={this.state.sum} />
						<h3>明细</h3>
						<DetailLists data={this.state.detailsData} />
					</div>
				</div>
			</div>
		</div>
		
	}

	parseAllData(_data) {
		let data = JSON.parse(JSON.stringify(_data))
		var chartsData = this.parseChartsData(data)
		var resData = {
			"sum": {
				"shouru": chartsData.shouru.length && chartsData.shouru.reduce((p, c, i, o) => {
					if (isNaN(Number(c))) {
						c = 0
					}
					return p + c
				}, 0) || 0,
				"zhichu": chartsData.zhichu.length && chartsData.zhichu.reduce((p, c, i, o) => {
					if (isNaN(Number(c))) {
						c = 0
					}
					return p + c
				}, 0) || 0,
				"ave": 0,
				"rem": 0
			},
			"chartsData": chartsData,
			"detailsData": {}
		}
		resData.sum.ave = chartsData.zhichu.length && (resData.sum.zhichu / chartsData.zhichu.length) || 0
		resData.sum.rem = resData.sum.shouru - resData.sum.zhichu
		data = data.reverse()
		data.length && data.forEach((row, index) => {
			if (row) {
				row.key = index
				var _date = row.date_year + '-' + row.date
				if (!resData.detailsData[_date]) {
					resData.detailsData[_date] = []
				}
				resData.detailsData[_date].push(row)
			}
		})
		return resData
	}

	parseChartsData(data) {
		var tmpData = {}
		var chartsData = {
			"month": [],
			"shouru": [],
			"zhichu": []
		}
		data.length && data.forEach((row, index) => {
			if (row) {
				var _month = row.date_year + '-' + row.date
				tmpData[_month] = tmpData[_month] || {}
				if (row.type == 1) {
					tmpData[_month].shouru = (tmpData[_month].shouru || 0) + Number(row.amount)
				}
				if (row.type == 2) {
					tmpData[_month].zhichu = (tmpData[_month].zhichu || 0) + Number(row.amount)
				}
			}
		})
		Object.keys(tmpData).length && Object.keys(tmpData).map((key) => {
			if (!tmpData[key].shouru) {
				tmpData[key].shouru = 0
			}
			if (!tmpData[key].zhichu) {
				tmpData[key].zhichu = 0
			}
			chartsData.month.push(key)
			chartsData.shouru.push(Number(tmpData[key].shouru.toFixed(2)))
			chartsData.zhichu.push(Number(tmpData[key].zhichu.toFixed(2)))
		})
		return chartsData
	}

}

ReactDOM.render(<App />, document.getElementById('app'))
