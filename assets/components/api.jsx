// http://react.acounting.com
export const Api = {
	'Login': {
		'url': '/api/Login'
	},
	'GetHomeData': {
		'url': '/api/GetHomeData'
	},
	'AddLog': {
		'url': '/api/AddLog',
		'params': {
			'year': '',
			'month': '',
			'type': '',
			'amount': '',
			'description': ''
		}
	},
	'AddLogSpec': {
		'url': '/api/AddLogSpec'
	},
	'UpdateLog': {
		'url': '/api/UpdateLog',
		'params': {
			'id': '',
			'year': '',
			'month': '',
			'type': '',
			'amount': '',
			'description': ''
		}
	},
	'DeleteLog': {
		'url': '/api/DeleteLog',
		'params': {
			'id': '',
			'year': '',
			'month': '',
			'type': '',
			'amount': '',
			'description': ''
		}
	}
}
