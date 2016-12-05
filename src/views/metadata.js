
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

import { getData } from '../utils'

class Metadata extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      list: []
    }
  }

  componentDidMount() {
    getData('/api/metadata', (res) => {
      this.setState({
        isLoading: false,
        ...res
      })
    })
  }

  renderCards() {
    let l = this.state.list.length,
      i = Math.ceil(l / 4),
      listReverse = JSON.parse(JSON.stringify(this.state.list)).reverse(),
      x = 0,
      rows = []
    if (l) {
      for (; x <= l; x++) {
        rows.push(listReverse.splice(x, 4))
      }
      return rows.map((eachRow) => {
        return <Row>{eachRow.map((eachCol) => {
          return <MetaDataCard data={eachCol} />
        })}</Row>
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
    return <Spin tip="加载中..." spinning={this.state.isLoading} >
      <h2>
        This is Meta Data List
      </h2>
      {this.renderCards()}
    </Spin>
  }
}

const MetaDataCard = (props) => {
  let {month, shouru, zhichu} = props.data
  return <Col span="6">
    <Card title={month} extra={<Link to={`metadata/${month}`}>查看详情</Link>} style={{ width: 300 }}>
      <h3>当月收入：{shouru}</h3>
      <h3>当月支出：{zhichu}</h3>
    </Card>
  </Col>
}

const MetadataReducer = (state = {
  isLoading: true,
}, action) => {
  switch(action.type) {
    default:
      return state
  }
}

export default { Metadata, MetadataReducer }
