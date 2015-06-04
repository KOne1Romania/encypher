'use strict'

require('chai').should()

var NodeSelector = require('../NodeSelector'),
    IdSelector   = require('../IdSelector'),
    emptyChain   = require('../../../chain/Chain').EMPTY

suite('selector', function() {
	var oneNodeChain = emptyChain.addNode('User').bind()
	suite('Node', function() {
		var nodeSelectorResult = NodeSelector(oneNodeChain)
		test('#toString', function() {
			nodeSelectorResult.toString().should.equal('$main as $main')
		})
		test('#toKeyValue', function() {
			nodeSelectorResult.toKeyValue().should.equal('$main: $main')
		})
	})

	test('Id #toString', function() {
		var idSelector = IdSelector(oneNodeChain)
		idSelector.toString().should.equal('id($main) as id')
	})
})
