
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
		this.state = Store.getState()
	}

	componentDidMount() {
		Store.subscribe(() => {
			this.setState(Store.getState())
		})
	}

	render() {
		return <div>
			<Header />
			{this.state.Pending ? 
				<div className="loading"></div>
			:
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
			}
		</div>
		
	}

}

ReactDOM.render(<App />, document.getElementById('app'))
