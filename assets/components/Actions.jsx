require("babel-polyfill")

import Request from 'superagent'
import { Api } from './api.jsx'

export const getAllDatas = (status, payload) => {
	return {
		type: 'GET_ALL_DATA',
		status: status,
		payload: payload
	}
}

export const addAccounting = (data) => {
	return {
		type: 'ADD_ACOUNTING',
		payload: data
	}
}
