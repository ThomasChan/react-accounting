
var config = require('./server/config')
var logger = require('./server/logger')
var routes = require('./server/routes')

var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(express.static('dist'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

var routerLogger = function(req, res, next) {
	logger.info('REQUEST: ', req.url, ' ; BODY:', JSON.stringify(req.body))
	next()
}
app.use(routerLogger)

app.post('/api/Login', routes.Login)
app.get('/api/GetHomeData', routes.GetHomeData)
app.post('/api/AddLog', routes.AddLog)
app.post('/api/AddLogSpec', routes.AddLogSpec)
app.post('/api/UpdateLog', routes.UpdateLog)
app.post('/api/DeleteLog', routes.DeleteLog)


app.listen(8001, 'react.accounting.com', function() {
	console.log('listening at react.accounting.com')
})
