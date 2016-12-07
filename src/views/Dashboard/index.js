
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Chart from 'rc-echarts'
import { Spin, Col, Alert } from 'antd'
import { loadInitData, PENDING, SUCCESS } from '../../actions'

// Actions Type
const DASHBOARD_INITIAL = 'DASHBOARD_INITIAL'
// Reducer
const DashboardProps = (state = {
  loading: false,
  height: 0,
  wages: [],
  shouru: [],
  zhichu: [],
  month: [],
}, action) => {
  switch (action.type) {
    case DASHBOARD_INITIAL:
      switch (action.payload.status) {
        case PENDING:
          return {
            ...state,
            loading: true,
          }
        case SUCCESS:
          return {
            ...state,
            ...action.payload.nextState,
            loading: false,
            height: window.innerHeight - 135,
          }
      }
    default:
      return state
  }
}
// View UI
const DashboardView = ({
  DashboardProps: {
    loading,
    height,
    month,
    wages,
    shouru,
    zhichu,
  },
  dispatch,
}) => {
  if (!month.length && !loading) {
    dispatch(loadInitData('/api/dashboard', DASHBOARD_INITIAL, dispatch))
  }

  const renderChart = () => {
    if (!month.length) {
      return <Alert
        message="No Data"
        description="No data has been found."
        type="info"
        showIcon
      />
    }

    const options = {
      height : height,
      title : {
        text: '收支趋势'
      },
      tooltip : {
        trigger: 'axis'
      },
      legend: {
        data: [
          '月标工资',
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
          data: month,
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
        name="月标工资"
        data={wages}
        showAllSymbol={true}
        // smooth={true}
      />
      <Chart.Line
        name="收入"
        data={shouru}
        showAllSymbol={true}
        // smooth={true}
      />
      <Chart.Line
        name="支出"
        data={zhichu}
        showAllSymbol={true}
        // smooth={true}
      />
    </Chart>
  }

  return <Col span={22}>
    <Spin
      tip="加载中..."
      spinning={loading}
    >
      <h2>
        Dashboard
      </h2>
      {renderChart()}
    </Spin>
  </Col>
}
// Component export
const Dashboard = connect(
  DashboardProps
)(DashboardView)

export {
  Dashboard,
  DashboardProps,
}
