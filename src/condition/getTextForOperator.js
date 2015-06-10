'use strict'

var _ = require('lodash')

function getTextForOperator(operator) {
	operator = operator || 'isNull'
	return _retrieveTextFromMap(operator) || _buildTextFromOperatorName(operator)
}

function _retrieveTextFromMap(operator) {
	return operatorsTextsMap[operator]
}

function _buildTextFromOperatorName(operator) {
	var uppercaseWords = _.words(operator).map(_.method('toUpperCase'))
	return uppercaseWords.join(' ')
}

var operatorsTextsMap = {
	'eq': '=',
	'lt': '<',
	'gt': '>',
	'ne': '<>',
	'regex': '=~'
}

module.exports = getTextForOperator
