var Log = {
	id: {
		type: 'number',
		default: null
	},
	date_year: {
		type: 'number',
		default: new Date().getFullYear()
	},
	date: {
		type: 'number',
		default: 1 + new Date().getMonth()
	},
	amount: {
		type: 'number',
		default: 0
	},
	type: {
		type: 'number',
		default: 1
	},
	description: {
		type: 'string',
		default: '...'
	},
	wages: {
		type: 'number',
		default: 0
	}
}

module.exports = {
	Log: Log
}
