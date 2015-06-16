'use strict'

require('chai').should()

var Chain = require('../Chain')

suite('Chain', function() {
	var emptyChain      = Chain(),
	    oneNodeChain    = emptyChain.addNode('User'),
	    twoNodesChain   = oneNodeChain.addNode('Post'),
	    threeNodesChain = twoNodesChain.addNode('Tag')

	test('emptyChain', function() {
		emptyChain.toString().should.eql('')
	})

	suite('#addNode', function() {
		test('once', function() {
			oneNodeChain.toString().should.equal('($main:User)')
		})

		test('twice', function() {
			twoNodesChain.toString().should.eql('(post:Post)')
		})

		test('three times', function() {
			threeNodesChain.toString().should.eql('(post_tag:Tag)')
		})
	})

	suite('#backToMain', function() {
		test('on one node chain', function() {
			oneNodeChain.backToMain().should.eql(oneNodeChain)
		})

		test('twice on one node chain', function() {
			oneNodeChain.backToMain().backToMain()
				.should.eql(oneNodeChain)
		})

		test('on two nodes chain', function() {
			twoNodesChain.backToMain().should.eql(oneNodeChain)
		})

		test('on three nodes chain', function() {
			threeNodesChain.backToMain().should.eql(oneNodeChain)
		})
	})

	suite('#bind', function() {
		test('one node chain', function() {
			oneNodeChain.bind().toString().should.eql('$main')
		})

		test('two nodes chain', function() {
			twoNodesChain.bind().toString().should.eql('post')
		})
	})

	suite('#getDataChyper', function() {
		var data = {}
		test('on main chain', function() {
			oneNodeChain.getDataCypher(data).valueOf().should.eql({
				string: '($main:User {data})',
				params: { data: data }
			})
		})

		test('on two nodes chain', function() {
			twoNodesChain.getDataCypher(data).valueOf().should.eql({
				string: '(post:Post {postData})',
				params: { postData: data }
			})
		})

		test('when data is null', function() {
			oneNodeChain.getDataCypher().valueOf().should.eql({
				string: '($main:User)',
				params: {}
			})
		})
	})
})
