
import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import Store from './store/index'

import App from './views/app'
import Dashboard from './views/dashboard'
import Metadata from './views/metadata'
import Month from './views/month'
import AddLog from './views/addLog'

ReactDom.render(
  <Provider store={Store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Dashboard.Dashboard} />
        <Route path="dashboard" component={Dashboard.Dashboard} />
        <Route path="metadata" component={Metadata.Metadata} />
        <Route path="metadata/:month" component={Month.Month} />
        <Route path="addLog" component={AddLog.AddLog} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
