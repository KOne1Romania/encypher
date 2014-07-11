'use strict';

function _escapeString(string, delimiter) {
	return [
		delimiter,
		string.replace(new RegExp(delimiter, 'g'), '\\' + delimiter),
		delimiter
	].join('');
}

function _encodeArray(array) {
	return '[' + array.join(', ') + ']';
}

function encodeRegex(regexString) {
	return _escapeString('(?i)' + regexString, '"');
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
		default:
			return value
	}
}

module.exports = {
	field: encodeFieldName,
	value: encodeValue,
	regex: encodeRegex
};
