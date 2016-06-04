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
	var sql = 'select * from ' + db_config.table + ' order by date_year asc, date asc, type asc'
	log.info(sql)
	query(sql, function(err, data) {
		if (err) {
			log.info(err)
			res.status(500).json({error: 'Server Error'}).end()
		}
		var sql2 = 'select * from ' + db_config.table2 + ' order by date asc'
		log.info(sql2)
		query(sql2, function(err, data2) {
			if (err) {
				log.info(err)
				res.status(500).json({error: 'Server Error'}).end()
			}
			res.status(200).json({
				data: data,
				data2: data2
			}).end()
		})
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

app.post('/api/wife/AddLog', function(req, res) {
	parseData(req, res, function() {
		var sql = ["insert into " + db_config.table2 + " (date, amount, description) values("
			,'"' + req.post.date + '",'
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
