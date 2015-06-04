'use strict'

require('chai').should()

var NodeSelector = require('../NodeSelector')

suite('selector', function() {
	suite('Node', function() {
		var nodeSelectorResult = NodeSelector({ alias: 'post' })
		test('#toString', function() {
			nodeSelectorResult.toString().should.equal('post as post')
		})
		test('#toKeyValue', function() {
			nodeSelectorResult.toKeyValue().should.equal('post: post')
		})
	})
})
