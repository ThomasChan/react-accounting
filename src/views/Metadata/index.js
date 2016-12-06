
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {
  Spin,
  Card,
  Col,
  Row,
  Alert
} from 'antd'
import { Api, numberToMoney } from '../../utils'

class Metadata extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      list: [],
    }
    this.api = new Api()
  }

  componentDidMount() {
    this.api.get('/api/metadata', (res) => {
      this.setState({
        ...res,
        loading: false,
      })
    })
  }

  renderCards() {
    let l = this.state.list.length
    let listReverse = JSON.parse(
      JSON.stringify(this.state.list)
    ).reverse()
    let x = 0
    let rows = []
    if (l) {
      for (; x <= l; x++) {
        rows.push(listReverse.splice(x, 4))
      }
      return rows.map((eachRow) => {
        return <Row
            type="flex"
            justify="space-around"
            align="middle"
            gutter={16}
          >{eachRow.map((eachCol) => {
              return <MetaDataCard
                data={eachCol}
                key={eachCol.id}
              />
            })
          }</Row>
      })
    }
    return <Alert
      message="No Data"
      description="No data has been found."
      type="info"
      showIcon
    />
  }

  render() {
    return <Col span={22}>
      <Spin
        tip="加载中..."
        spinning={this.state.loading}
      >
        <h2>Meta Data List</h2>
        {this.renderCards()}
      </Spin>
    </Col>
  }
}

const MetaDataCard = (props) => {
  let {
    month,
    shouru,
    zhichu,
  } = props.data
  return <Col span={5} style={{marginTop: 20}}>
    <Card
      title={month}
      extra={
        <Link to={`metadata/${month}`}>查看详情</Link>
      }
    >
      <h3>当月收入：{numberToMoney(shouru, 2)}</h3>
      <h3>当月支出：{numberToMoney(zhichu, 2)}</h3>
    </Card>
  </Col>
}

const MetadataReducer = (state = {
  loading: true,
}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export { Metadata, MetadataReducer }
