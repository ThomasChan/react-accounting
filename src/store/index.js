
import {
  createStore,
  combineReducers,
} from 'redux'
import { DashboardProps } from '../views/Dashboard'
import { MetadataProps } from '../views/Metadata'
import { MonthProps } from '../views/Month'

const initialState = {}
const reducer = combineReducers({
  DashboardProps,
  MetadataProps,
  MonthProps,
})
const Store = createStore(reducer, initialState,
  window.devToolsExtension && window.devToolsExtension()
)

export default Store
