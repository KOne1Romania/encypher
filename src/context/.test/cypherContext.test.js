'use strict'

require('chai').should()

var cypherContext = require('../cypherContext')

suite('cypherContext', function() {
	var oneNodeContext = cypherContext.addNode('User').bind(),
	    twoNodesContext = oneNodeContext.addNode('Post').bind()

	test('#addNode', function() {
		oneNodeContext.toString().should.equal('$main')
	})

	test('#reset', function() {
		oneNodeContext.reset().should.eql(oneNodeContext)
		twoNodesContext.reset().should.eql(oneNodeContext)
	})

	test('#fetch', function() {
		twoNodesContext.fetch({ select: 'id' }).toString().should.equal('$main, id(post) as postId')
	})

	test('#resolveResults', function() {
		twoNodesContext.fetch({ select: 'id' }).resolveResults()
			.toString().should.equal('$main, postId')
	})

	test('#fetch 2 results', function() {
		twoNodesContext
			.fetch({ select: 'id' }).resolveResults()
			.addNode('Address').bind()
			.fetch({ select: 'id' })
			.toString().should.equal('$main, postId, id(address) as addressId')
	})
})
