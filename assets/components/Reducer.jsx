import { createStore } from 'redux'
import Request from 'superagent'

import { Api } from './api.jsx'
import { getAllDatas } from './Actions.jsx'

const getData = async (action, url) => {
	let ret = await Request.get(url)
	Store.dispatch(getAllDatas('Done', ret.body))
}

const sendData = async (action, url) => {
	let ret = await Request.post(url).send(action.payload)
	// Store.dispatch(getAllDatas('Pending'))
	return ret.body
}

const initData = {
	Pending: false,
	data: []
}

const AccountingData = (state = initData, action) => {
	switch(action.type) {
		case 'GET_ALL_DATA':
			switch (action.status) {
				case 'Pending':
					getData(action, Api.GetHomeData.url)
					return Object.assign({}, state, {Pending: true})
				case 'Done':
					return Object.assign({}, {data:action.payload}, {Pending: false})
			}
			break
		case 'ADD_ACOUNTING':
			let result = sendData(action, Api.AddLog.url)
			action.payload.date_year = action.payload.year
			action.payload.date = action.payload.month
			state.data.push(Object.assign({}, action.payload, {id: result.insertId}))
			return state
			break
		case 'UPDATE_ACCOUNTING':
			sendData(action, Api.UpdateLog.url)
			state.data[action.payload.key] = action.payload
			return state
			break
		case 'DELETE_ACCOUNTING':
			sendData(action, Api.DeleteLog.url)
			state.data = state.data.reverse()
			delete state.data[action.payload.key]
			state.data = state.data.reverse()
			return state
			break
		default:
			return state
	}
}

const Store = createStore(AccountingData)

export default Store
