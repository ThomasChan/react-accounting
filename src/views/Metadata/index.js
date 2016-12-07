
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
import { loadInitData, PENDING, SUCCESS } from '../../actions'
import { numberToMoney } from '../../utils'
import './index.less'
// Actions Type
const METADATA_INITIAL = 'METADATA_INITIAL'
// Reducer
const MetadataProps = (state = {
  loading: false,
  list: [],
}, action) => {
  switch (action.type) {
    case METADATA_INITIAL:
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
          }
      }
    default:
      return state
  }
}
// View UI
const MetadataView = ({
  MetadataProps: {
    list,
    loading,
  },
  dispatch,
}) => {
  if (!list.length && !loading) {
    dispatch(loadInitData('/api/metadata', METADATA_INITIAL, dispatch))
  }

  const renderCards = () => {
    let l = list.length
    let listReverse = JSON.parse(
      JSON.stringify(list)
    ).reverse()
    let x = 0
    let rows = []
    if (!l) {
      return <Alert
        message="No Data"
        description="No data has been found."
        type="info"
        showIcon
      />
    }
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
            let {month, shouru, zhichu} = eachCol
            return <MetaDataCard
              month={month}
              shouru={shouru}
              zhichu={zhichu}
              key={eachCol.id}
            />
          })
        }</Row>
    })
  }

  return <Col span={22}>
    <Spin
      tip="加载中..."
      spinning={loading}
    >
      <h2>Meta Data List</h2>
      {renderCards()}
    </Spin>
  </Col>
}
// View Component UI
const MetaDataCard = ({month, shouru, zhichu}) => {
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
// Component export
const Metadata = connect(
  MetadataProps
)(MetadataView)

export {
  Metadata,
  MetadataProps,
}
