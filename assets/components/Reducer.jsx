import { createStore } from 'redux'

import Request from 'superagent'
import { Api } from './api.jsx'
import { getAllDatas } from './Actions.jsx'

const AccountingData = (state, action) => {
	switch(action.type) {
		case 'GET_ALL_DATA':
			switch (action.status) {
				case 'Pending':
					const getData = async () => {
						const ret = await Request.get(Api.GetHomeData.url)
						Store.dispatch(getAllDatas('Done', ret.body))
					}
					getData()
					return {
						Pending: true
					}
				case 'Done':
					return Object.assign({}, action.payload, {Pending: false})
			}
			break;
		case 'ADD_ACOUNTING':
			const sendData = async () => {
				console.log(action.payload)
				const ret = await Request.post(Api.AddLog.url).send(action.payload)
				Store.dispatch(getAllDatas('Pending'))
			}
			sendData()
		default:
			return state
	}
}

const Store = createStore(AccountingData)

export default Store
