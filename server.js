var query = require('./server/mysql').query
var parseData = require('./server/mysql').parseData
var db_config = require('./server/config')
var log = require('./server/logger').log

var express = require('express')
var app = express()
app.use(express.static('dist'))

var routerLogger = function(req, res, next) {
	log.info('REQUEST: ', req.url)
	next()
}
app.use(routerLogger)

app.get('/api/GetHomeData', function(req, res) {
	// var sql = "select date_year,date,type,sum(amount) as a,description from " + db_config.table + "  group by date_year,date,type order by date_year asc, date asc, id asc"
	var sql = 'select * from ' + db_config.table + ' order by date_year asc, date asc, id asc'
	log.info(sql)
	query(sql, function(err, data) {
		if (err) {
			log.info(err)
			res.status(500).json({error: 'Server Error'}).end()
		}
		// var tmpData = {}
		// var chartsData = {
		// 	"month": [],
		// 	"shouru": [],
		// 	"zhichu": []
		// }
		// data.forEach(function(row, index) {
		// 	var _month = row.date_year + '-' + row.date
		// 	tmpData[_month] = tmpData[_month] || {}
		// 	if (row.type == 1) {
		// 		tmpData[_month].shouru = Number(row.a.toFixed(2))
		// 	}
		// 	if (row.type == 2) {
		// 		tmpData[_month].zhichu = Number(row.a.toFixed(2))
		// 	}
		// })
		// Object.keys(tmpData).map(function(key) {
		// 	if ('undefined' == tmpData[key].shouru) {
		// 		tmpData[key].shouru = 0
		// 	}
		// 	if ('undefined' == tmpData[key].zhichu) {
		// 		tmpData[key].zhichu = 0
		// 	}
		// 	chartsData.month.push(key)
		// 	chartsData.shouru.push(tmpData[key].shouru)
		// 	chartsData.zhichu.push(tmpData[key].zhichu)
		// })
		// var sql = "select * from " + db_config.table + " order by date_year asc,date asc,id asc"
		// log.info(sql)
		// query(sql, function(err, data) {
		// 	if (err) {
		// 		log.info(err)
		// 		res.status(500).json({error: 'Server Error'}).end()
		// 	}
		// 	var resData = {
		// 		"sum": {
		// 			"shouru": chartsData.shouru.reduce(function(p, c, i, o) {
		// 				if (isNaN(Number(c))) {
		// 					c = 0
		// 				}
		// 				return p + c
		// 			}, 0),
		// 			"zhichu": chartsData.zhichu.reduce(function(p, c, i, o) {
		// 				if (isNaN(Number(c))) {
		// 					c = 0
		// 				}
		// 				return p + c
		// 			}, 0),
		// 			"ave": 0,
		// 			"rem": 0
		// 		},
		// 		"chartsData": chartsData,
		// 		"detailsData": {
		// 			// "xxxx年xx月": []
		// 		}
		// 	}
		// 	resData.sum.ave = resData.sum.zhichu / chartsData.zhichu.length
		// 	resData.sum.rem = resData.sum.shouru - resData.sum.zhichu
		// 	data = data.reverse()
		// 	data.forEach(function(row, index) {
		// 		var _date = row.date_year + '-' + row.date
		// 		if (!resData.detailsData[_date]) {
		// 			resData.detailsData[_date] = []
		// 		}
		// 		resData.detailsData[_date].push(row)
		// 	})
			// resData.detailsData = resData.detailsData.reverse()
			res.status(200).json(data).end()
		// })
	})
})

app.post('/api/AddLog', function(req, res) {
	parseData(req, res, function() {
		var sql = ["insert into " + db_config.table + " (date_year, date, type, amount, description) values("
			,'"' + req.post.year + '",'
			,req.post.month + ','
			,req.post.type + ','
			,req.post.amount + ','
			,'"' + req.post.description + '")'].join('')
		log.info(sql)
		query(sql, function(err, data) {
			if (err) {
				log.info(err)
				res.status(500).json({error: 'Server Error'}).end()
			}
			res.status(200).json(data).end()
		})
	})
})

app.post('/api/UpdateLog', function(req, res) {
	parseData(req, res, function() {
		var sql = ['update ', db_config.table, ' set',
			' type=', req.post.type,
			' ,amount=', req.post.amount,
			' ,description="', req.post.description,'"',
			' where id=', req.post.id
		].join('')
		log.info(sql)
		query(sql, function(err, data) {
			if (err) {
				log.info(err)
				res.status(500).json({error: 'Server Error'}).end()
			}
			res.status(200).json(data).end()
		})
	})
})

app.post('/api/DeleteLog', function(req, res) {
	parseData(req, res, function() {
		var sql = ['delete from ', db_config.table, ' where id=', req.post.id].join('')
		log.info(sql)
		query(sql, function(err, data) {
			if (err) {
				log.info(err)
				res.status(500).json({error: 'Server Error'}).end()
			}
			res.status(200).json(data).end()
		})
	})
})

app.listen(80, 'react.accounting.com', function() {
	console.log('listening at react.accounting.com')
})
