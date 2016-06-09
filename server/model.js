var db = require('./config').db
var query = require('./db').query
var table = require('./table')
var logger = require('./logger')

/**
 * table model
 */

var Model = function(tableName) {
	var _this = this
	if (!tableName || typeof tableName !== 'string') {
		throw new Error('Table name must be String')
	}
	if (!db.table[tableName] || !table[tableName]) {
		throw new Error('Table config is not defined, check /server/table.js')
	}
	_this._table = db.table[tableName]
	_this._schema = table[tableName]
	_this._columns = Object.keys(_this._schema)
}

Model.prototype.read = function(select, column, value, orderBy, next) {
	logger.info('Called read')
	var _this = this
	if (!select) {
		select = '*'
	}
	if (select instanceof Array) {
		select = select.join(', ')
	}
	var _sql = ['SELECT ', select, ' FROM ', _this._table]
	if (column && value && column.length && value.length) {
		var _where = ArrayToString.call(this, column, value).join(' AND ')
		_sql.concat([' WHERE ', _where])
	}
	if (typeof orderBy === 'string') {
		orderBy = [orderBy]
	}
	orderBy.forEach(function(order) {
		if (_this._columns.indexOf(order.split(' ')[0]) === -1) {
			throw new Error('Ordered column `' + order + '` is not defined in table `' + _this._table + '`')
		}
	})
	if (orderBy.length) {
		_sql.concat([' ORDERBY ', orderBy.join(', ')])
	}
	var _sql_str = _sql.join('')
	logger.info(_sql_str)
	query(_sql_str, function(err, res) {
		if (err) throw new Error(err)
		// logger.info(res)
		if (typeof next === 'function') {
			next(res)
		}
	})
}

Model.prototype.remove = function(column, value, next) {
	logger.info('Called remove')
	var _this = this
	var _where = ArrayToString.call(this, column, value).join(' AND ')
	var _sql = ['DELETE FROM ', _this._table, ' WHERE ', _where]
	var _sql_str = _sql.join('')
	logger.info(_sql_str)
	query(_sql_str, function(err, res) {
		if (err) throw new Error(err)
		// logger.info(res)
		if (typeof next === 'function') {
			next(res)
		}
	})
}

Model.prototype.save = function(column, value, next, key) {
	logger.info('Called save')
	var _this = this
	if (column.indexOf(key) === -1 || !key) {
		if (typeof column === 'string') {
			column = [column]
		}
		if (typeof value === 'string') {
			value = [value]
		}
		value.forEach(function(item, key) {
			if (typeof item === 'string') {
				value[key] = '"' + item + '"'
			}
		})
		var _sql = ['INSERT INTO ', _this._table, ' (', column.join(', '), ') VALUES', ' (', value.join(', '), ')']
		var _sql_str = _sql.join('')
		logger.info(_sql_str)
		query(_sql_str, function(err, res) {
			if (err) throw new Error(err)
			// logger.info(res)
			if (typeof next === 'function') {
				next(res)
			}
		})
	} else {
		if (!key || typeof key !== 'string' || _this._columns.indexOf(key) === -1) {
			throw new Error('Key must be String and is one column of table')
		}
		var key_value = value[column.indexOf(key)]
		value = value.filter(function(item) {
			return item !== key_value
		})
		column = column.filter(function(item) {
			return item !== key
		})
		var _set = ArrayToString.call(this, column, value).join(', ')
		var _sql = ['UPDATE ', _this._table, ' SET ', _set, ' WHERE ', key, '=', key_value]
		var _sql_str = _sql.join('')
		logger.info(_sql_str)
		query(_sql_str, function(err, res) {
			if (err) throw new Error(err)
			// logger.info(res)
			if (typeof next === 'function') {
				next(res)
			}
		})
	}
}

function ArrayToString(column, value) {
	if (!column || (typeof column !== 'string' && !(column instanceof Array))) {
		throw new Error('Column should be String or Array')
	}
	if (!value) {
		throw new Error('Column must have it\'s value')
	}
	var _this = this
	var _column = {}
	if (typeof column === 'string') {
		if (_this._columns.indexOf(column) === -1) {
			throw new Error('Column `' + column + '` is not defined on table `' + _this._table + '`')
		}
		if (value instanceof Array) {
			value = value.join('')
		}
		_column[column] = value
	} else if (column instanceof Array) {
		column.forEach(function(item, key) {
			if (_this._columns.indexOf(item) === -1) {
				throw new Error('Column `' + item + '` is not defined on table `' + _this._table + '`')
			}
			if (typeof value === 'string') {
				_column[item] = '"' + value + '"'
			} else if (value instanceof Array) {
				if (typeof value[key] === 'number') {
					_column[item] = value[key]
				} else {
					_column[item] = '"' + value[key] + '"'
				}
			}
		})
	}
	logger.info(_column)
	var _str = []
	Object.keys(_column).map(function(key) {
		_str.push(key + '=' + _column[key])
	})
	return _str
}


module.exports = Model
