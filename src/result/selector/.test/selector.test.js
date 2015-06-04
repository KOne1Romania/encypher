'use strict'

require('chai').should()

var selector      = require('..'),
    emptyChain    = require('../../../chain/Chain').EMPTY

suite('result/selector', function() {
	var oneNodeChain  = emptyChain.addNode('User').bind(),
	    twoNodesChain = oneNodeChain.addNode('Post').bind()
	suite('Node', function() {
		var NodeSelector = selector()
		suite('for one-node chain', function() {
			var nodeSelectorResult = NodeSelector(oneNodeChain)
			test('#toString', function() {
				nodeSelectorResult.toString().should.equal('$main as $main')
			})
			test('#toKeyValue', function() {
				nodeSelectorResult.toKeyValue().should.equal('$main: $main')
			})
		})

		test('for two-nodes chain', function() {
			var twoNodesSelectorResult = NodeSelector(twoNodesChain)
			twoNodesSelectorResult.toString().should.equal('post as post')
		})
	})

	suite('Id', function() {
		var IdSelector = selector('id')
		test('for one-node chain', function() {
			var oneNodeIdSelector = IdSelector(oneNodeChain)
			oneNodeIdSelector.toString().should.equal('id($main) as id')
		})
		test('for two-nodes chain', function() {
			var twoNodesIdSelector = IdSelector(twoNodesChain)
			twoNodesIdSelector.toString().should.equal('id(post) as postId')
		})
	})

	suite('Field', function() {
		test('for one-node chain', function() {
			var oneNodeFieldSelector = selector('name')(oneNodeChain)
			oneNodeFieldSelector.toString().should.equal('$main.`name` as name')
		})
		test('for two-nodes chain', function() {
			var twoNodesFieldSelector = selector('name')(twoNodesChain)
			twoNodesFieldSelector.toString().should.equal('post.`name` as postName')
		})
	})
})
