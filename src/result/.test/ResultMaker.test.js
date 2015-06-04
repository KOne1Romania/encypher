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

	test('select: id', function() {
		var selectIdResultMaker = ResultMaker({ select: 'id' })
		selectIdResultMaker(chain).toString().should.equal('id(post) as postId')
	})

	test('select: field', function() {
		var selectNameResultMaker = ResultMaker({ select: 'name' })
		selectNameResultMaker(chain).toString().should.equal('post.`name` as postName')
	})

	test('aggregate: count', function() {
		var aggregateCountResultMaker = ResultMaker({ aggregate: 'count' })
		aggregateCountResultMaker(chain).toString().should.equal('count(post) as postsCount')
	})

	test('aggregate: collect (with select: id)', function() {
		var aggregateCollectResultMaker = ResultMaker({ aggregate: 'collect', select: 'id' })
		aggregateCollectResultMaker(chain).toString().should.equal('collect(id(post)) as postIds')
	})
})
