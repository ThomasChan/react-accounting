
import moment from 'moment'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Spin,
  Form,
  InputNumber,
  Input,
  Radio,
  Button,
  DatePicker,
  Icon,
  message,
  Col,
} from 'antd'
import { Api } from '../../utils'
import './index.less'

const RadioGroup = Radio.Group
const FormItem = Form.Item
const { MonthPicker } = DatePicker

const AddLog = Form.create()(class AddLogClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 1,
      amount: 0,
      description: '添加描述',
      date_year: 2017,
      date: 1,
      submiting: false,
    }
    this.api = new Api()
  }

  onChange(e, key) {
    let value = typeof e === 'object' ? e.target.value : e
    this.setState({
      [key]: value
    })
  }

  onMonthChange(dateObject, dateString) {
    let [date_year, date] = dateString.split('/')
    this.setState({
      date_year, date
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submiting: true })
    let {
      type,
      amount,
      description,
      date_year,
      date,
    } = this.state
    this.api.post(`/api/AddLog`, {
      type,
      amount,
      description,
      date_year,
      date,
    }, (res) => {
      message.success('添加成功！')
      this.setState({ submiting: false })
      this.props.form.resetFields()
    })
  }

  render() {
    const { type, amount, description } = this.state
    const { getFieldDecorator } = this.props.form
    return <Col span={4}>
      <Form
        horizontal
        onSubmit={e => this.handleSubmit(e)}
      >
        <FormItem>
          {getFieldDecorator('type', {
            // rules: [{ required: true, message: 'Please select type!' }],
          })(
            <RadioGroup
              onChange={(e) => this.onChange(e, 'type')}
              defaultValue={Number(type)}
              disabled={this.state.isLoading}
            >
              <Radio value={1}>收入</Radio>
              <Radio value={2}>支出</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('amount', {
            // rules: [{ required: true, message: 'Please input amount!' }],
          })(
            <InputNumber
              min={1}
              defaultValue={Number(amount)}
              onChange={(e) => this.onChange(e, 'amount')}
              disabled={this.state.isLoading}
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('description', {
            // rules: [{ required: true, message: 'Please input description!' }],
          })(
            <Input
              type="text"
              defaultValue={description}
              placeholder={description}
              onChange={(e) => this.onChange(e, 'description')}
              disabled={this.state.isLoading}
            />
          )}
        </FormItem>
        <FormItem>
          <MonthPicker
            format={'YYYY/MM'}
            onChange={(date, dateString) => this.onMonthChange(date, dateString)}
          />
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={this.state.submiting}
          >
            Add New Log
          </Button>
        </FormItem>
      </Form>
    </Col>
  }
})

const AddLogReducer = (state = {
  isLoading: true,
}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export {AddLog, AddLogReducer}
