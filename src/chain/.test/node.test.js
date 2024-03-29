'use strict'

require('chai').should()

var Node = require('../node/Node')

suite('Node', function() {
	test('creates unbound node with label when receiving string arg', function() {
		Node('Post').toString().should.equal('(post:Post)')
	})

	suite('at first', function() {
		test('#toString uses both label and alias', function() {
			var node = Node({ label: 'Post', alias: 'myPost' })
			node.toString().should.eql('(myPost:Post)')
		})
		test('default alias is lowercase label', function() {
			var node = Node({ label: 'Post' })
			node.alias.should.eql('post')
		})
		test('#toStringWithData', function() {
			var node = Node({ label: 'Post' })
			node.toStringWithData('{data}').toString().should.eql('(post:Post {data})')
		})
		test('#inContext', function() {
			var node = Node({ label: 'Post' }).inContext({ alias: 'user' })
			node.toString().should.eql('(user_post:Post)')
		})
	})

	suite('after binding', function() {
		var boundNode
		setup(function() {
			boundNode = Node('Post').bind()
		})
		test('#toString uses only alias', function() {
			boundNode.toString().should.eql('post')
		})
	})
})
