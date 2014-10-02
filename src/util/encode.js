'use strict';

var _ = require('lodash-node');

function _escapeString(string, delimiter) {
	delimiter = delimiter || '"';
	return [
		delimiter,
		string.replace(new RegExp(delimiter, 'g'), '\\' + delimiter),
		delimiter
	].join('');
}

function _encodeArray(array) {
	return '[' + array.map(encodeValue).join(', ') + ']';
}

function _encodeObject(object) {
	var pairsString = _.pairs(object).map(function(pair) {
		return [_escapeString(pair[0]), encodeValue(pair[1])].join(': ')
	}).join(', ');
	return '{' + pairsString + '}';
}

function encodeFieldName(fieldName) {
	return _escapeString(fieldName, '`');
}

function encodeValue(value) {
	switch (true) {
		case value == null:
			return 'NULL';
		case typeof value === 'string':
			return _escapeString(value, '"');
		case Array.isArray(value):
			return _encodeArray(value);
		case typeof value === 'number':
		case typeof value === 'boolean':
			return value;
		case _.isObject(value):
			return _encodeObject(value);
		default:
			return ''
	}
}

module.exports = {
	field: encodeFieldName,
	value: encodeValue
};
