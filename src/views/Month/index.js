
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
  Popconfirm,
} from 'antd'
import { Api, numberToMoney } from '../../utils'

const RadioGroup = Radio.Group
const FormItem = Form.Item

class Month extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      totalShouru: 0,
      totalZhichu: 0,
      details: [],
      visible: false,
      currentRow: {},
      confirmLoading: false,
    }
    this.api = new Api()
  }

  componentDidMount() {
    this.refreshMonthDetailTable()
  }

  refreshMonthDetailTable() {
    const { month } = this.props.params

    this.api.get(`/api/metadata/${month}`, (res) => {
      this.setState({
        ...res,
        loading: false,
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
    this.api.post(`/api/DeleteLog`, {
      id: row.id
    }, (res) => {
      this.setState({...res})
      this.refreshMonthDetailTable()
    })
  }

  render() {
    const { month } = this.props.params
    
    let {
      totalShouru,
      totalZhichu,
      details,
    } = this.state

    if (details && details.length) {
      details = details.map(row => {
        row.typeCn = row.type === 1 ? '收入' : '支出'
        return row
      }).reverse()
    }

    const columns = [
      {
        title: 'Type',
        dataIndex: 'typeCn',
        key: 'typeCn',
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record, index) => (
          <span>
            <Button
              icon="edit"
              onClick={(e) => {this.openEdit(e, record, index)}}
            />
            <span className="ant-divider" />
            <Popconfirm
              title="Are you sure delete this record?"
              onConfirm={(e) => {this.deleteRow(e, record, index)}}
              okText="Yes"
              cancelText="No"
            >
              <Button
                icon="minus-circle-o"
              />
            </Popconfirm>
          </span>
        ),
      },
    ]

    return <Spin
        tip="加载中..."
        spinning={this.state.loading}
      >
      <h2>
        <Button
          type="primary"
          shape="circle"
          icon="arrow-left"
          onClick={e => this.props.router.goBack()}
        />
        This is Meta Data Detail,
        {`${month} has been spended ${
          numberToMoney(totalZhichu, 2)
        }, and income is ${
          numberToMoney(totalShouru, 2)
        }`}
      </h2>
      {details && details.length
      ? <Table columns={columns} dataSource={details} />
      : <Alert
          message="No Data"
          description="No data has been found."
          type="info"
          showIcon
        />
      }
      {this.renderUpdateModal()}
    </Spin>
  }

  handleOk(e) {
    this.setState({ confirmLoading: true })
    this.api.post(`/api/UpdateLog`, {
      id: this.updateModal.props.row.id,
      amount: this.updateModal.fields.amount.value,
      type: this.updateModal.fields.type.value,
      description: this.updateModal.fields.description.value,
    }, (res) => {
      this.setState({
        ...res,
        confirmLoading: false,
      })
      this.updateModal.resetFields()
      this.refreshMonthDetailTable()
    })
  }

  handleCancel(e) {
    this.setState({
      visible: false
    })
  }

  renderUpdateModal() {
    return <Modal
      title="Update Field"
      visible={this.state.visible}
      onOk={(e) => this.handleOk(e)}
      onCancel={(e) => this.handleCancel(e)}
      okText="Submit"
      cancelText="Cancel"
      confirmLoading={this.state.confirmLoading}
    >
      <MonthForm
        ref={ref => this.updateModal = ref}
        row={this.state.currentRow}
      />
    </Modal>
  }

}

const MonthForm = Form.create()(
  (props) => {
    console.log(props)
    let { id, type, amount, description } = props.row
    const { getFieldDecorator } = props.form
    return <Form vertical>
      <FormItem>
        {getFieldDecorator('type', {
          initialValue: Number(type),
          rules: [{ required: true, message: 'Please select type!' }],
        })(
          <RadioGroup>
            <Radio value={1}>收入</Radio>
            <Radio value={2}>支出</Radio>
          </RadioGroup>
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('amount', {
          initialValue: Number(amount),
          rules: [{ required: true, message: 'Please input amount!' }],
        })(
          <InputNumber min={1} />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('description', {
          initialValue: description,
          rules: [{ required: true, message: 'Please input description!' }],
        })(
          <Input type="text" />
        )}
      </FormItem>
    </Form>
  }
)

const MonthReducer = (state = {
  loading: true,
}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export {Month, MonthReducer}
