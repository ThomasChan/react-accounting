
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Chart from 'rc-echarts'
import { Spin } from 'antd'

import { getData } from '../utils'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      height: window.innerHeight - 100,
      shouru: [],
      zhichu: [],
      month: [],
    }
  }

  componentDidMount() {
    getData('/api/dashboard', (nextState) => {
      console.log('componentDidMount', nextState)
      this.setState(nextState)
    })
  }

  renderChart() {
    const options = {
      height : this.state.height,
      title : {
        text: '收支趋势'
      },
      tooltip : {
        trigger: 'axis'
      },
      legend: {
        data:['收入','支出']
      },
      toolbox: {
        show : true,
        feature : {
          dataView : {show: true, readOnly: false},
          magicType : {show: true, type: ['line', 'bar', 'pie', 'cloud', 'map', 'graph']},
          restore : {show: true},
          saveAsImage : {show: true}
        }
      },
      calculable : true,
      xAxis : [
        {
          type : 'category',
          data: this.state.month,
          boundaryGap: ['5%', '5%']
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ]
    }

    return <Chart {...options}>
      <Chart.Line name="收入" data={this.state.shouru} showAllSymbol={true} smooth={true}/>
      <Chart.Line name="支出" data={this.state.zhichu} showAllSymbol={true} smooth={true}/>
    </Chart>
  }

  render() {
    return <Spin tip="加载中..." spinning={this.state.isLoading} >
      <h2>
        This is Dashboard
      </h2>
      {!this.state.isLoading && this.renderChart()}
    </Spin>
  }
}

const DashboardReducer = (state = {
  isLoading: true,
  shouru: [],
  zhichu: [],
  month: [],
}, action) => {
  switch(action.type) {
    default:
      return state
  }
}

export default { Dashboard, DashboardReducer }
