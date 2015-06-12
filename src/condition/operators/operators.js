'use strict'

var _          = require('lodash'),
    inflection = require('inflection')

var BinaryOperator = require('./BinaryOperator'),
    UnaryOperator  = require('./UnaryOperator')

var prependCamelCase = _.partial(_.partial, joinStringsCamelCase),
    appendCamelCase  = _.partial(_.partialRight, joinStringsCamelCase),
    prepend          = _.partial(_.partial, joinStrings)

var operators = {
	eq: BinaryOperator({
		name: 'eq',
		symbol: '='
	}),

	ne: BinaryOperator({
		name: 'ne',
		symbol: '<>',
		fieldCustomizer: prependCamelCase('wrong')
	}),

	lt: BinaryOperator({
		name: 'lt',
		symbol: '<',
		fieldCustomizer: prependCamelCase('max')
	}),

	gt: BinaryOperator({
		name: 'gt',
		symbol: '>',
		fieldCustomizer: prependCamelCase('min')
	}),

	regex: BinaryOperator({
		name: 'regex',
		symbol: '=~',
		fieldCustomizer: appendCamelCase('regex'),
		valueCustomizer: prepend('(?i)')
	}),

	in: BinaryOperator({
		name: 'in',
		fieldCustomizer: inflection.pluralize
	}),

	isNull: UnaryOperator({
		name: 'isNull'
	}),

	isNotNull: UnaryOperator({
		name: 'isNotNull'
	})
}

function joinStrings(first, second) {
	return first + second
}

function joinStringsCamelCase(first, second) {
	return first + _.capitalize(second)
}

module.exports = function retrieveOperator(operatorName) {
	return operators[operatorName]
}
