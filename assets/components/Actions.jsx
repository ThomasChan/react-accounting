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

export const addAccounting = (status, data) => {
	return {
		type: 'ADD_ACOUNTING',
		status: status,
		payload: data
	}
}

export const updateAccounting = (data) => {
	return {
		type: 'UPDATE_ACCOUNTING',
		payload: data
	}
}

export const deleteAccounting = (data) => {
	return {
		type: 'DELETE_ACCOUNTING',
		payload: data
	}
}
