'use strict'

require('chai').should()

var Chain = require('../Chain')

suite('Chain', function() {
	var initialChain    = Chain.fromNodeLabeled('User'),
	    twoNodesChain   = initialChain.addNode({ label: 'Post' }),
	    threeNodesChain = twoNodesChain.addNode({ label: 'Tag' })

	test('#toString', function() {
		initialChain.toString().should.eql('($main:User)')
	})

	suite('#addNode', function() {
		test('once', function() {
			twoNodesChain.toString().should.eql('(post:Post)')
		})

		test('twice', function() {
			threeNodesChain.toString().should.eql('(post_tag:Tag)')
		})
	})

	suite('#backToMain', function() {
		test('after adding one node', function() {
			twoNodesChain.backToMain().should.eql(initialChain)
		})

		test('after adding two nodes', function() {
			threeNodesChain.backToMain().should.eql(initialChain)
		})
	})

	suite('#bind', function() {
		test('one node chain', function() {
			initialChain.bind().toString().should.eql('$main')
		})

		test('two nodes chain', function() {
			twoNodesChain.bind().toString().should.eql('post')
		})
	})
})