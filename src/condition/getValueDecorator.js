'use strict'

var _ = require('lodash')

function getValueDecorator(operator) {
	return operator === 'regex'
		? toCaseInsensitiveRegex
		: _.identity
}

function toCaseInsensitiveRegex(regexString) {
	return '(?i)' + regexString
}

module.exports = getValueDecorator
