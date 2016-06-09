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
	}
}

var LogSpec = {
	id: {
		type: 'number',
		default: null
	},
	date: {
		type: 'number',
		default: new Date().getFullYear() + '-' + (1 + new Date().getMonth()) + '-' + new Date().getDate()
	},
	amount: {
		type: 'number',
		default: 0
	},
	description: {
		type: 'string',
		default: '...'
	}
}


module.exports = {
	Log: Log,
	LogSpec: LogSpec
}
