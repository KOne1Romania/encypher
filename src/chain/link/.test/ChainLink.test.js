'use strict'

require('chai').should()

var ChainLink = require('../ChainLink')

suite('ChainLink', function() {
	suite('at first', function() {
		var mainChainLink = ChainLink.fromNode({ label: 'Post' })
		test('#toString', function() {
			mainChainLink.toString().should.eql('($main:Post)')
		})
		test('#bind', function() {
			mainChainLink.bind().toString().should.eql('$main')
		})
	})
	suite('after adding node', function() {
		var twoNodesChainLink = ChainLink
			.fromNode({ label: 'Post' })
			.addNode({ label: 'Tag' })
		test('#toString', function() {
			twoNodesChainLink.toString().should.eql('(tag:Tag)')
		})
		test('#bind', function() {
			twoNodesChainLink.bind().toString().should.eql('tag')
		})
	})
	test('after adding 2 nodes - #toString', function() {
		var threeNodesChainLink = ChainLink
			.fromNode({ label: 'User' })
			.addNode({ label: 'Post' })
			.addNode({ label: 'Tag' })
		threeNodesChainLink.toString().should.eql('(post_tag:Tag)')
	})
})