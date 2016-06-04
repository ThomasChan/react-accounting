// http://react.acounting.com
export const Api = {
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
	'AddWifeLog': {
		'url': '/api/wife/AddLog'
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
