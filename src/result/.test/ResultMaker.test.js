'use strict'

require('chai').should()

var ResultMaker = require('../ResultMaker'),
    emptyChain = require('../../chain/Chain').EMPTY

suite('ResultMaker', function() {
	var chain = emptyChain.addNode('User').addNode('Post').bind()

	test('returns node when no options provided', function() {
		var defaultResultMaker = ResultMaker()
		defaultResultMaker(chain).toString().should.equal('post as post')
	})
})
