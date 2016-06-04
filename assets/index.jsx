
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Request from 'superagent'
import { orderBy } from 'lodash'

import { getAllDatas } from './components/Actions.jsx'
import Store from './components/Reducer.jsx'

import ChartsDatas from './components/ChartsDatas.jsx'
import Summary from './components/Summary.jsx'
import FormOptions from './components/FormOptions.jsx'
import DetailLists from './components/DetailLists.jsx'
import WifeExpense from './components/WifeExpense.jsx'

Store.dispatch(getAllDatas('Pending'))

class App extends Component {

	constructor(props) {
		super(props)
		let initData = Store.getState()
		let newState = {}
		newState.data = this.parseAllData(initData.data)
		newState.wifeData = this.parseWifeData(initData.data2)
		newState.pending = initData.pending
		newState.addPending = initData.addPending
		this.state = newState
	}

	componentDidMount() {
		Store.subscribe(() => {
			let initData = Store.getState()
			console.log(initData)
			let newState = {}
			newState.data = this.parseAllData(initData.data)
			newState.wifeData = this.parseWifeData(initData.data2)
			newState.pending = initData.pending
			newState.addPending = initData.addPending
			this.setState(newState)
		})
	}

	render() {
		let height = Math.ceil(window.innerHeight / 2)
		this.state.data.chartsData.height = height
		return <div>
			{this.state.pending ? <div className="load-data-loading"><div className="loading"></div></div> : null}
			<div className="container">
				<div className="columns">
					<div className="column col-12">
						<h6>收支趋势</h6>
						<ChartsDatas data={this.state.data.chartsData} />
					</div>
				</div>
				<div className="columns">
					<div className="column col-3">
						<h6>老婆的钱</h6>
						<WifeExpense data={this.state.wifeData} />
					</div>
					<div className="column col-5">
						<h6>明细</h6>
						<DetailLists data={this.state.data.detailsData} />
					</div>
					<div className="column col-4">
						<h6>汇总</h6>
						<Summary data={this.state.data.sum} />
						<FormOptions pending={this.state.pending} />
					</div>
				</div>
			</div>
		</div>
		
	}

	parseAllData(_data) {
		let data = orderBy(JSON.parse(JSON.stringify(_data)), ['date_year', 'asc'], ['date', 'asc'], ['type', 'asc'])
		let chartsData = this.parseChartsData(data)
		let resData = {
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
				let _date = row.date_year + '-' + row.date
				if (!resData.detailsData[_date]) {
					resData.detailsData[_date] = []
				}
				resData.detailsData[_date].push(row)
			}
		})
		return resData
	}

	parseChartsData(data) {
		let tmpData = {}
		let chartsData = {
			"month": [],
			"shouru": [],
			"zhichu": []
		}
		data.length && data.forEach((row, index) => {
			if (row) {
				let _month = row.date_year + '-' + row.date
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

	parseWifeData(_data) {
		var tableData = {}
		if (_data.length) {
			let data = JSON.parse(JSON.stringify(_data))
			data = data.map((row) => {
				row.date_time = +new Date(row.date)
				return row
			})
			data = data.sort((a, b) => a.date_time - b.date_time).reverse()
			// data = orderBy(data, ['date', 'asc'], ['amount', 'asc'])
			console.log(data)
			data.map((row) => {
				var _month = row.date.split('-').map((piece) => Number(piece)).splice(0, 2).join('-')
				if (!tableData[_month]) {
					tableData[_month] = {
						total: 0,
						detail: []
					}
				}
				tableData[_month].total += Number(row.amount)
				tableData[_month].detail.push(row)
			})
			console.info(tableData)
		}
		return tableData
	}

}

ReactDOM.render(<App />, document.getElementById('app'))
