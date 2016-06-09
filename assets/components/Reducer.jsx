import { createStore } from 'redux'
import Request from 'superagent'
import Cookie from 'react-cookie'

import { Api } from './Api.jsx'
import { login, getAllDatas, addAccounting } from './Actions.jsx'

const getData = async (action, url) => {
	let ret = await Request.get(url)
	if (ret.status !== 200) {
		Store.dispatch(login('Logout'))
	}
	Store.dispatch(getAllDatas('Done', ret.body))
}

const sendData = async (action, url, callback) => {
	let ret = await Request.post(url).send(action.payload)
	if (ret.status !== 200) {
		Store.dispatch(login('Logout'))
	}
	if (callback) callback(ret.body)
}

const initData = {
	loginStatus: Cookie.load('loginStatus', true) || false,
	loginPending: false,
	pending: false,
	addPending: false,
	log: [],
	logSpec: []
}

const AccountingData = (state = initData, action) => {
	let newState = Object.assign({}, state)
	switch(action.type) {
		case 'START_UP':
			switch (action.status) {
				case 'Pending':
					sendData(action, Api.Login.url, (data) => {
						Cookie.save('loginStatus', 'true', { path: '/', expires: new Date(+new Date()+120000) })
						Store.dispatch(getAllDatas('Pending'))
					})
					return Object.assign({}, newState, {loginPending: true})
				case 'Logout':
					Cookie.remove('loginStatus')
					return Object.assign({}, newState, {loginPending: false, loginStatus: false})
			}
			break
		case 'GET_ALL_DATA':
			switch (action.status) {
				case 'Pending':
					getData(action, Api.GetHomeData.url)
					return Object.assign({}, newState, {pending: true, loginPending: false, loginStatus: true})
				case 'Done':
					return Object.assign({}, newState, action.payload, {pending: false})
			}
			break
		case 'ADD_ACOUNTING':
			switch (action.status) {
				case 'Pending':
					let url = !action.payload.type ? Api.AddLogSpec.url : Api.AddLog.url
					sendData(action, url, (data) => {
						Store.dispatch(getAllDatas('Pending'))
					})
					return Object.assign({}, newState, {addPending: true})
				case 'Done':
					return Object.assign({}, newState, action.payload, {addPending: false})
			}
			break
		case 'UPDATE_ACCOUNTING':
			sendData(action, Api.UpdateLog.url, (data) => {
				Store.dispatch(getAllDatas('Pending'))
			})
			return newState
			break
		case 'DELETE_ACCOUNTING':
			sendData(action, Api.DeleteLog.url, (data) => {
				Store.dispatch(getAllDatas('Pending'))
			})
			return newState
			break
		default:
			return state
	}
}

const Store = createStore(AccountingData, initData,
	window.devToolsExtension && window.devToolsExtension()
)

export default Store
