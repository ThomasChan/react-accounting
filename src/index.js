
import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Store from './store/index'
import App from './views/app'
import { Dashboard } from './views/Dashboard'
import { Metadata } from './views/Metadata'
import { Month } from './views/Month'
import { AddLog } from './views/AddLog'

ReactDom.render(
  <Provider store={Store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Dashboard} />
        <Route path="dashboard" component={Dashboard} />
        <Route path="metadata" component={Metadata} />
        <Route path="metadata/:month" component={Month} />
        <Route path="addLog" component={AddLog} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
