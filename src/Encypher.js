'use strict'

var _ = require('lodash')

var Builder = require('./builder/Builder')

var Encypher = _.create(Builder, {
	Runner: EncypherRunner
})

function EncypherRunner(queryMethod) {
	return function _runQueryOnEncypher(encypher) {
		return encypher.run(queryMethod)
	}
}

module.exports = Encypher
