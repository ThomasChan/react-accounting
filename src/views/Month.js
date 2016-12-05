
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

  render() {
    const { month } = this.props.params
    const { totalShouru, totalZhichu, details } = this.state
    const columns = [
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
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
            <Button type="primary" htmlType="submit" onClick={(e) => {this.openEdit(e, record, index)}}>Edit</Button>
            <span className="ant-divider" />
            <Button type="ghost" onClick={(e) => {this.deleteRow(e, record, index)}}>Delete</Button>
          </span>
        ),
      }
    ]
    return <Spin tip="加载中..." spinning={this.state.isLoading} >
      <h2>
        This is Meta Data Detail, {`${month} has been spended ${totalZhichu}, and income is ${totalShouru}`}
        <Button type="primary" shape="circle" icon="arrow-left" onClick={e => this.props.router.goBack()} />
      </h2>
      {details.length
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
