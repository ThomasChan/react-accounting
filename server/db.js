var db = require('./config').db
var pool = require('mysql').createPool({
    host: db.host,
    user: db.user,
    password: db.pwd,
    database: db.db
});
exports.pool = pool
exports.query = function(query, callback) {
   pool.query(query, function(err, rows, fields) {
      if (err) { return callback(err, null); }
      return callback(null, rows);
   });
}
exports.parseData = function(req, res, callback) {
    var queryData = '';
    req.on('data', function(data) {
        queryData += data;
        if(queryData.length > 1e6) {
            queryData = "";
            res.writeHead(413, {'Content-Type': 'text/plain'});
            res.end();
            req.connection.destroy();
        }
    });
    req.on('end', function() {
        req.post = JSON.parse(queryData);
        callback();
    });
}
