
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'

const reducer = (state = {}, action) => state

const Store = createStore(reducer, {},
  window.devToolsExtension && window.devToolsExtension()
)

export default Store
