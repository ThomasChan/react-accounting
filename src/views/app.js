
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Row, Col } from 'antd'

import Header from './header'

class App extends Component {
  
  constructor(props) {
    super(props)
    console.log(props)
  }

  render() {
    return <div>
      <Row>
        <Col span={24}><Header /></Col>
      </Row>
      <div className="ant-layout-wrapper">
        <div className="ant-layout-container">
          {this.props.children}
        </div>
      </div>
    </div>
  }

}

export default App
