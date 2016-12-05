
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {
  Spin,
  Card,
  Col,
  Row,
  Alert,
  Form,
  InputNumber,
  Input,
  Radio,
  Button,
  Table,
  Modal,
  Icon,
} from 'antd'
const RadioGroup = Radio.Group
const FormItem = Form.Item

import { getData, sendData } from '../utils'

class Month extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      isLoading: true,
      totalShouru: 0,
      totalZhichu: 0,
      details: []
    }
  }

  componentDidMount() {
    this.refreshMonthDetailTable()
  }

  refreshMonthDetailTable() {
    const { month } = this.props.params
    getData(`/api/metadata/${month}`, (res) => {
      this.setState({
        isLoading: false,
        visible: false,
        currentRow: {},
        confirmLoading: false,
        ...res
      })
    })
  }

  openEdit(e, row, index) {
    this.setState({
      visible: true,
      currentRow: row
    })
  }

  deleteRow(e, row, index) {
    sendData(`/api/DeleteLog`, {
      id: row.id
    }, (res) => {
      this.setState({...res})
      this.refreshMonthDetailTable()
    })
  }

  handleOk(e) {
    this.setState({ confirmLoading: true })
    window.debugForm = this.refs.UpdateFieldForm
    console.log(this.refs.UpdateFieldForm)
    sendData(`/api/UpdateLog`, {
      id: this.refs.props.row.id,
      amount: this.refs.fields.amount.value,
      type: this.refs.fields.type.value,
      description: this.refs.fields.description.value,
    }, (res) => {
      this.setState({
        ...res,
        confirmLoading: false
      })
      this.refreshMonthDetailTable()
    })
  }

  handleCancel(e) {
    this.setState({
      visible: false
    })
  }

  sortDetails(prev, next) {
    if (prev && next) {
      let prevDateYear = Number(prev.date_year)
      let prevDate = Number(prev.date)
      let prevId = Number(prev.id)

      let nextDateYear = Number(next.date_year)
      let nextDate = Number(next.date)
      let nextId = Number(next.id)

      if (prevDateYear < nextDateYear) {
        return -1
      }
      if (prevDateYear > nextDateYear) {
        return 1
      }
      if (prevDate < nextDate) {
        return -1
      }
      if (prevDate > nextDate) {
        return 1
      }
      if (prevId < nextId) {
        return -1
      }
      if (prevId > nextId) {
        return 1
      }
    }
    return 0
  }

  render() {
    const { month } = this.props.params
    let { totalShouru, totalZhichu, details } = this.state
    if (details && details.length) {
      details = details.sort(this.sortDetails).map(row => {
        row.typeCn = row.type === 1 ? '收入' : '支出'
        return row
      }).reverse()
    }
    const columns = [
      {
        title: 'Type',
        dataIndex: 'typeCn',
        key: 'typeCn',
      },{
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
      },{
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },{
        title: 'Action',
        key: 'action',
        render: (text, record, index) => (
          <span>
            <Button icon="edit" onClick={(e) => {this.openEdit(e, record, index)}} />
            <span className="ant-divider" />
            <Button icon="minus-circle-o" onClick={(e) => {this.deleteRow(e, record, index)}} />
          </span>
        ),
      }
    ]
    return <Spin tip="加载中..." spinning={this.state.isLoading} >
      <h2>
        <Button type="primary" shape="circle" icon="arrow-left" onClick={e => this.props.router.goBack()} />
        This is Meta Data Detail, {`${month} has been spended ${totalZhichu}, and income is ${totalShouru}`}
      </h2>
      {details && details.length
      ? <Table columns={columns} dataSource={details} />
      : <Alert
        message="No Data"
        description="No data has been found."
        type="info"
        showIcon
      />}
      <Modal title="Update Field"
        visible={this.state.visible}
        onOk={(e) => this.handleOk(e)}
        onCancel={(e) => this.handleCancel(e)}
        okText="Submit"
        cancelText="Cancel"
        confirmLoading={this.state.confirmLoading}
      >
        <MonthForm ref="UpdateFieldForm" row={this.state.currentRow} />
      </Modal>
    </Spin>
  }
}

const MonthForm = Form.create()(class MonthRowClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props.row,
      isLoading: false,
    }
  }

  onChange(e, key) {
    let value = typeof e === 'object' ? e.target.value : e
    this.setState({
      [key]: value
    })
  }

  render() {
    if (!this.state.id) {
      return null
    }
    const { id, type, amount, description } = this.props.row
    const { getFieldDecorator } = this.props.form
    return <Form inline>
      <FormItem>
        {getFieldDecorator('type', {
          // rules: [],
        })(
          <RadioGroup onChange={(e) => this.onChange(e, 'type')} value={Number(type)} disabled={this.state.isLoading}>
            <Radio value={1}>收入</Radio>
            <Radio value={2}>支出</Radio>
          </RadioGroup>
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('amount', {
          // rules: [{ required: true, message: 'Please input amount!' }],
        })(
          <InputNumber min={1} value={Number(amount)} onChange={(e) => this.onChange(e, 'amount')} disabled={this.state.isLoading} />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('description', {
          rules: [{ required: true, message: 'Please input description!' }],
        })(
          <Input type="text" value={description} placeholder={description} onChange={(e) => this.onChange(e, 'description')} disabled={this.state.isLoading} />
        )}
      </FormItem>
    </Form>
  }
})

const MonthReducer = (state = {
  isLoading: true,
}, action) => {
  switch(action.type) {
    default:
      return state
  }
}

export default { Month, MonthReducer }
