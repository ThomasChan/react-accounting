var Model = require('./model')

new Model('Log').read('*', null, null, ['date_year asc', 'date asc', 'type asc'], function(resLog) {
	new Model('LogSpec').read('*', null, null, 'date asc', function(resLogSpec) {
		console.log({
			log: resLog,
			logSpec: resLogSpec
		})
	})
})
