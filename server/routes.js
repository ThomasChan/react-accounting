var query = require('./db').query
var parseData = require('./db').parseData
var model = require('./model')
var logger = require('./logger')

exports.Login = function(req, res) {
	res.status(200).json({}).end()
}

exports.GetHomeData = function(req, res) {
	try {
		new model('Log').read('*', null, null, ['date_year asc', 'date asc', 'type asc'], function(resLog) {
			new model('LogSpec').read('*', null, null, 'date asc', function(resLogSpec) {
				res.status(200).json({
					log: resLog,
					logSpec: resLogSpec
				}).end()
			})
		})
	} catch (Exception) {
		logger.error(Exception)
		res.status(500).json({
			error: Exception
		}).end()
	}
}

exports.AddLog =
exports.AddLogSpec =
exports.UpdateLog = function(req, res) {
	try {
		var column = Object.keys(req.body)
		var value = []
		column.forEach(function(key) {
			value.push(req.body[key])
		})
		var modelName = req.url.match('LogSpec') ? 'LogSpec' : 'Log'
		new model(modelName).save(column, value, function(resSave) {
			res.status(200).json(resSave).end()
		}, 'id')
	} catch (Exception) {
		logger.error(Exception)
		res.status(500).json({
			error: Exception
		}).end()
	}
}

exports.DeleteLog = function(req, res) {
	try {
		var column = Object.keys(req.body)
		var value = []
		column.forEach(function(key) {
			value.push(req.body[key])
		})
		new model('Log').remove(column, value, function(resDelete) {
			res.status(200).json(resDelete).end()
		})
	} catch (Exception) {
		logger.error(Exception)
		res.status(500).json({
			error: Exception
		}).end()
	}
}



