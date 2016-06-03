import { createStore } from 'redux'
import Request from 'superagent'

import { Api } from './api.jsx'
import { getAllDatas, addAccounting } from './Actions.jsx'

const getData = async (action, url) => {
	let ret = await Request.get(url)
	Store.dispatch(getAllDatas('Done', ret.body))
}

const sendData = async (action, url, callback) => {
	let ret = await Request.post(url).send(action.payload)
	// Store.dispatch(getAllDatas('Pending'))
	if (callback) callback(ret.body)
}

const initData = {
	Pending: false,
	addPending: false,
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
			switch (action.status) {
				case 'Pending':
					sendData(action, Api.AddLog.url, (data) => {
						action.payload.date_year = Number(action.payload.year)
						action.payload.date = Number(action.payload.month)
						let newRow = {
							id: data.insertId,
							date: action.payload.date,
							type: action.payload.type,
							amount: action.payload.amount,
							date_year: action.payload.date_year,
							description: action.payload.description
						}
						state.data.push(newRow)
						Store.dispatch(addAccounting('Done', state))
					})
					state.addPending = true
					return state
				case 'Done':
					action.payload.addPending = false
					return action.payload
			}
			break
		case 'UPDATE_ACCOUNTING':
			sendData(action, Api.UpdateLog.url)
			state.data = state.data.reverse()
			state.data[action.payload.key] = action.payload
			state.data = state.data.reverse()
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
