'use strict'

var stampit = require('stampit'),
    _       = require('lodash')

var OperatorDefaults = stampit()
	.enclose(function() {
		this.symbol = this.symbol || buildTextFromOperatorName(this.name)
	})

function buildTextFromOperatorName(operatorName) {
	var uppercaseWords = _.words(operatorName).map(_.method('toUpperCase'))
	return uppercaseWords.join(' ')
}

module.exports = OperatorDefaults
