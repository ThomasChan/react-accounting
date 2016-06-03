var opts = {
    logFilePath:'./server/server_log/log',
    autoOpen: true,
    timestampFormat:'YYYY-MM-DD HH:mm:ss'
};

var log = require('simple-node-logger').createSimpleFileLogger( opts )

module.exports.log = log
