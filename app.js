
require('babel-register')

const config = require('./server/config')
const logger = require('./server/logger')
const routes = require('./server/routes')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(express.static('.'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const routerLogger = function(req, res, next) {
	logger.info('REQUEST: ', req.url, ' ; BODY:', JSON.stringify(req.body))
	next()
}
app.use(routerLogger)

const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
// Webpack developer
if (webpackConfig) {
  const compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: '/dist',
    noInfo: true
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}



app.get('/api/dashboard', routes.Dashboard)
app.get('/api/metadata', routes.MetaData)
app.get('/api/metadata/:month', routes.Month)



app.post('/api/Login', routes.Login)
app.get('/api/GetHomeData', routes.GetHomeData)
app.post('/api/AddLog', routes.AddLog)
app.post('/api/AddLogSpec', routes.AddLogSpec)
app.post('/api/UpdateLog', routes.UpdateLog)
app.post('/api/DeleteLog', routes.DeleteLog)


app.listen(8001, 'react.accounting.com', function() {
	console.log('listening at react.accounting.com')
})
