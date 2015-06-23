'use strict'

var _ = require('lodash')

var Builder        = require('./builder/Builder'),
    EncypherRunner = require('./runner/EncypherRunner')

var Encypher = _.create(Builder, {
	Runner: EncypherRunner
})

module.exports = Encypher
