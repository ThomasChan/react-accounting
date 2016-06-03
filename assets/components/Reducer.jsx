import { createStore } from 'redux'
import Request from 'superagent'

import { Api } from './api.jsx'
import { getAllDatas } from './Actions.jsx'

const getData = async (action, url) => {
	let ret = {body:[]}
	try {
		ret = await Request.get(url)
		if (ret.status !== 200) alert(ret.body.error)
	} catch (Exception) {
		console.warn(Exception)
	}
	Store.dispatch(getAllDatas('Done', ret.body))
	return ret
}

const sendData = async (action, url) => {
	console.info(action.payload)
	let ret = {body:[]}
	try {
		ret = await Request.post(url).send(action.payload)
		if (ret.status !== 200) alert(ret.body.error)
	} catch (Exception) {
		console.warn(Exception)
	}
	Store.dispatch(getAllDatas('Pending'))
	return ret
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
			sendData(action, Api.AddLog.url)
			return state
			break
		case 'UPDATE_ACCOUNTING':
			sendData(action, Api.UpdateLog.url)
			return state
			break
		case 'DELETE_ACCOUNTING':
			sendData(action, Api.DeleteLog.url)
			return state
			break
		default:
			return state
	}
}

const Store = createStore(AccountingData)

export default Store
