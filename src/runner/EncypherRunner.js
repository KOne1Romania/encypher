'use strict'

var stampit = require('stampit'),
    _       = require('lodash'),
    Promise = require('bluebird')

var _EncypherRunner = stampit()
	.state({
		queryRunner: {}
	})
	.methods({
		_makeRunnerWrapper: function(methodName) {
			return function runner_wrapper(encypher) {
				return encypher.toCypher().queryUsing(this.queryRunner[methodName])
			}
		}
	})
	.enclose(function() {
		var queryMethodNames = ['queryMany', 'queryOne', 'queryManyNodes', 'queryOneNode']
		this.queryRunner = setQueryRunnerDefaults(this.queryRunner)
		queryMethodNames.forEach(function(methodName) {
			this[methodName] = this._makeRunnerWrapper(methodName)
		}, this)
	})

function setQueryRunnerDefaults(queryRunner) {
	var validQueryRunner = _.defaults({}, queryRunner, {
		queryMany: _.constant(Promise.resolve([])),
		queryManyNodes: _.constant(Promise.resolve([]))
	})
	return _.defaults(validQueryRunner, {
		queryOne: _.compose(_.method('get', 0), validQueryRunner.queryMany),
		queryOneNode: _.compose(_.method('get', 0), validQueryRunner.queryManyNodes)
	})
}

function EncypherRunner(queryRunner) {
	return _EncypherRunner({ queryRunner: queryRunner })
}

module.exports = EncypherRunner
