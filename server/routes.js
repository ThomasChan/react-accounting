var query = require('./db').query
var parseData = require('./db').parseData
var model = require('./model')
var logger = require('./logger')

exports.Login = function(req, res) {
	res.status(200).json({}).end()
}

exports.Dashboard = function(req, res) {
	try {
		new model('Log').read('*', [], [], ['date_year asc', 'date asc', 'type asc'], function(resLog) {
			var wages = [], shouru = [], zhichu = [], month = [], tmpData = {}
			if (resLog.length) {
				resLog.forEach((row, index) => {
					if (row) {
						var _month = row.date_year + '-' + row.date
						tmpData[_month] = tmpData[_month] || {}
						if (!tmpData[_month].wages) {
							tmpData[_month].wages = Number(row.wages) || 0
						}
						if (row.type == 1) {
							tmpData[_month].shouru = (tmpData[_month].shouru || 0) + Number(row.amount)
						}
						if (row.type == 2) {
							tmpData[_month].zhichu = (tmpData[_month].zhichu || 0) + Number(row.amount)
						}
					}
				})
				Object.keys(tmpData).map((key) => {
					if (!tmpData[key].shouru) {
						tmpData[key].shouru = 0
					}
					if (!tmpData[key].zhichu) {
						tmpData[key].zhichu = 0
					}
					month.push(key)
					wages.push(Number(tmpData[key].wages.toFixed(2)))
					shouru.push(Number(tmpData[key].shouru.toFixed(2)))
					zhichu.push(Number(tmpData[key].zhichu.toFixed(2)))
				})
			}
			res.status(200).json({
				wages: wages,
				shouru: shouru,
				zhichu: zhichu,
				month: month
			}).end()
		})
	} catch (Exception) {
		console.log(Exception)
		logger.error(Exception)
		res.status(500).json({
			error: Exception
		}).end()
	}
}

exports.MetaData = function(req, res) {
	try {
		new model('Log').read('*', [], [], ['date_year asc', 'date asc', 'type asc'], function(resLog) {
			var list = [], tmpData = {}
			if (resLog.length) {
				resLog.forEach((row, index) => {
					if (row) {
						var _month = row.date_year + '-' + row.date
						tmpData[_month] = tmpData[_month] || {}
						if (row.type == 1) {
							tmpData[_month].shouru = (tmpData[_month].shouru || 0) + Number(row.amount)
						}
						if (row.type == 2) {
							tmpData[_month].zhichu = (tmpData[_month].zhichu || 0) + Number(row.amount)
						}
					}
				})
				Object.keys(tmpData).map((key) => {
					if (!tmpData[key].shouru) {
						tmpData[key].shouru = 0
					}
					if (!tmpData[key].zhichu) {
						tmpData[key].zhichu = 0
					}
					list.push({
						month: key,
						shouru: Number(tmpData[key].shouru.toFixed(2)),
						zhichu: Number(tmpData[key].zhichu.toFixed(2))
					})
				})
			}
			res.status(200).json({
				list: list
			}).end()
		})
	} catch (Exception) {
		console.log(Exception)
		logger.error(Exception)
		res.status(500).json({
			error: Exception
		}).end()
	}
}

exports.Month = function(req, res) {
	try {
		var param = req.params.month.split('-')
		var year = param[0]
		var month = param[1]
		new model('Log').read('*', ['date_year', 'date'], [year, month], [], function(resLog) {
			var totalShouru = 0, totalZhichu = 0
			if (resLog.length) {
				resLog.forEach((row, index) => {
					if (row.type == 1) {
						totalShouru += Number(row.amount)
					}
					if (row.type == 2) {
						totalZhichu += Number(row.amount)
					}
				})
			}
			res.status(200).json({
				totalShouru: totalShouru,
				totalZhichu: totalZhichu,
				details: resLog
			}).end()
		})
	} catch (Exception) {
		console.log(Exception)
		logger.error(Exception)
		res.status(500).json({
			error: Exception
		}).end()
	}
}









exports.GetHomeData = function(req, res) {
	try {
		new model('Log').read('*', [], [], ['date_year asc', 'date asc', 'type asc'], function(resLog) {
			new model('LogSpec').read('*', [], [], 'date asc', function(resLogSpec) {
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



