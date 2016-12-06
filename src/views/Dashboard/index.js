
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Chart from 'rc-echarts'
import { Spin, Col } from 'antd'
import { Api } from '../../utils'

// TODO: calclator chart height, make it full fill page
const chartsHeight = 0

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      height: chartsHeight,
      shouru: [],
      zhichu: [],
      month: [],
    }
    this.api = new Api()
  }

  componentDidMount() {
    this.api.get('/api/dashboard', (nextState) => {
      this.setState({
        ...nextState,
        height: window.innerHeight - 135
      })
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
        data: [
          '收入',
          '支出',
        ]
      },
      toolbox: {
        show : true,
        feature : {
          dataView : {
            show: true,
            readOnly: false,
          },
          magicType : {
            show: true,
            type: ['line', 'bar', 'pie', 'cloud', 'map', 'graph'],
          },
          restore : {
            show: true,
          },
          saveAsImage : {
            show: true,
          },
        },
      },
      calculable : true,
      xAxis : [
        {
          type : 'category',
          data: this.state.month,
          boundaryGap: ['5%', '5%']
        },
      ],
      yAxis : [
        {
          type : 'value'
        },
      ],
    }

    return <Chart {...options}>
      <Chart.Line
        name="收入"
        data={this.state.shouru}
        showAllSymbol={true}
        smooth={true}
      />
      <Chart.Line
        name="支出"
        data={this.state.zhichu}
        showAllSymbol={true}
        smooth={true}
      />
    </Chart>
  }

  render() {
    return <Col span={22}>
      <Spin
        tip="加载中..."
        spinning={this.state.loading}
      >
        <h2>
          Dashboard
        </h2>
        {!this.state.loading && this.renderChart()}
      </Spin>
    </Col>
  }

}

const DashboardReducer = (state = {
  loading: true,
  shouru: [],
  zhichu: [],
  month: [],
}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export {Dashboard, DashboardReducer}
