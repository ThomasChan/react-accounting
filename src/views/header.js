
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Menu, Icon } from 'antd'

class Header extends Component {
  constructor(props) {
    super(props)
    let current
    try {
      current = props.children.props.route.path
    } catch (Exception) {
      current = 'dashboard'
    }
    this.state = {current}
  }

  changeRoute(e) {
    this.setState({
      current: e.key
    })
  }

  render() {
    return <div className="ant-layout-header">
      <Menu
        onClick={(e) => this.changeRoute(e)}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="dashboard">
          <Link to='dashboard'><Icon type="line-chart" />Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="metadata">
          <Link to='metadata'><Icon type="desktop" />Meta Data</Link>
        </Menu.Item>
        <Menu.Item key="addLog">
          <Link to='addLog'><Icon type="plus-circle" />Add Log</Link>
        </Menu.Item>
      </Menu>
    </div>
  }
}

export default Header
