'use strict'

require('chai').should()
var _       = require('lodash'),
    stampit = require('stampit')

var stamps = require('../stamps')

suite('stamps', function() {
	suite('Forwarder', function() {
		var Forwarder = stamps.Forwarder
		var target = {
			one: _.constant(1),
			two: _.constant(2)
		}

		test('one method', function() {
			var oneMethodProxy = stampit()
				.state({
					target: target
				})
				.compose(Forwarder({
					target: ['one']
				}))
			oneMethodProxy().one().should.eql(1)
		})

		test('two methods', function() {
			var twoMethodsProxy = stampit()
				.state({
					target: target
				})
				.compose(Forwarder({
					target: ['one', 'two']
				}))
			twoMethodsProxy().two().should.eql(2)
		})
	})
})
