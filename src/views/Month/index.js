
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
import { loadInitData, patchData, PENDING, SUCCESS } from '../../actions'
import { numberToMoney } from '../../utils'
// Antd Component
const RadioGroup = Radio.Group
const FormItem = Form.Item
// Actions
const MONTH_INITIAL = 'MONTH_INITIAL'
const MONTH_DELETE = 'MONTH_DELETE'
const MONTH_UPDATE = 'MONTH_UPDATE'
// Reducer
const MonthProps = (state = {
  loading: false,
  confirmLoading: false,
  totalShouru: 0,
  totalZhichu: 0,
  details: [],
}, action) => {
  switch (action.type) {
    case MONTH_INITIAL:
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
            refresh: false,
          }
      }
    case MONTH_DELETE:
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
            refresh: true,
          }
      }
    case MONTH_UPDATE:
      switch (action.payload.status) {
        case PENDING:
          return {
            ...state,
            confirmLoading: true,
          }
        case SUCCESS:
          return {
            ...state,
            ...action.payload.nextState,
            refresh: true,
            confirmLoading: false,
          }
      }
    default:
      return state
  }
}
// Views UI
class MonthView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      currentRow: {},
    }
  }

  componentDidMount() {
    this.refreshMonthDetailTable()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.refresh) {
      this.refreshMonthDetailTable()
    }
  }

  refreshMonthDetailTable() {
    const {
      dispatch,
      params: {
        month,
      },
    } = this.props
    loadInitData(`/api/metadata/${month}`, MONTH_INITIAL, dispatch)
  }

  openEdit(e, row, index) {
    this.setState({
      visible: true,
      currentRow: row
    })
  }

  deleteRow(e, row, index) {
    const { dispatch } = this.props
    patchData(`/api/DeleteLog`, {
      id: row.id
    }, MONTH_DELETE, dispatch)
  }

  render() {
    let {
      params: {
        month,
      },
      MonthProps: {
        totalShouru,
        totalZhichu,
        details,
        loading,
      }
    } = this.props

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
        spinning={loading}
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
    const { dispatch } = this.props
    patchData(`/api/UpdateLog`, {
      id: this.updateModal.props.row.id,
      amount: this.updateModal.fields.amount.value,
      type: this.updateModal.fields.type.value,
      description: this.updateModal.fields.description.value,
    }, MONTH_UPDATE, dispatch)
  }

  handleCancel(e) {
    this.setState({
      visible: false
    })
  }

  renderUpdateModal() {
    let { visible, confirmLoading, currentRow } = this.state
    return <Modal
      title="Update Field"
      visible={visible}
      onOk={(e) => this.handleOk(e)}
      onCancel={(e) => this.handleCancel(e)}
      okText="Submit"
      cancelText="Cancel"
      confirmLoading={confirmLoading}
    >
      <MonthForm
        ref={ref => this.updateModal = ref}
        row={currentRow}
      />
    </Modal>
  }

}
// Views Component UI
const MonthForm = Form.create()((props) => {
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
})
// Component export
const Month = connect(
  MonthProps
)(MonthView)

export {
  Month,
  MonthProps,
}
