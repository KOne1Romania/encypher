'use strict'

require('chai').should()

var builder = require('../Builder').base

suite('builder', function() {
	suite('#match', function() {
		test('once', function() {
			builder.match('User').toString().should.eql('MATCH ($main:User)')
		})

		test('by example', function() {
			var example = { name: 'John' }
			builder.match('User', example).toCypher().valueOf().should.eql({
				string: 'MATCH ($main:User {data})',
				params: { data: example }
			})
		})

		test('twice', function() {
			builder.match('User').match('Post').whereId(15).return().toString()
				.should.eql('MATCH ($main:User) MATCH (post:Post) WHERE id(post) = 15 RETURN $main')
		})
	})

	suite('relations', function() {
		test('create', function() {
			var expectedCypherString = [
				'MATCH ($main:User)',
				'MATCH (post:Post)',
				'CREATE $main<-[:WRITTEN_BY]-post',
				'RETURN $main'
			].join(' ')
			builder.match('User').match('Post').createRelation({ type: 'WRITTEN_BY', arrow: 'left'})
				.return().toString().should.equal(expectedCypherString)
		})
	})

	test('#return', function() {
		builder.match('User').return().toString().should.eql('MATCH ($main:User) RETURN $main')
	})

	test('#continue', function() {
		builder.match('User').continue().return()
			.toString().should.eql('MATCH ($main:User) WITH distinct $main RETURN $main')
	})

	test('#whereId', function() {
		builder.match('User').whereId(10).return()
			.toString().should.eql('MATCH ($main:User) WHERE id($main) = 10 RETURN $main')
	})

	test('#continue twice', function() {
		var cypher = builder
			.match('User')
			.continue()
			.whereId(10)
			.continue()
			.return()
		cypher.toString().should.eql([
			'MATCH ($main:User)',
			'WITH distinct $main',
			'WHERE id($main) = 10',
			'WITH distinct $main',
			'RETURN $main'
		].join(' '))
	})

	test('#compose', function() {
		var matchWhereStep = builder.match('User').whereId(10),
		    returnStep = builder.return()
		matchWhereStep.compose(returnStep).toString()
			.should.eql('MATCH ($main:User) WHERE id($main) = 10 RETURN $main')
	})

	test('#create', function() {
		var data = { name: 'John' }
		builder.create('User', data).return().toCypher().valueOf().should.eql({
			string: 'CREATE ($main:User {data}) RETURN $main',
			params: { data: data }
		})
	})

	test('#merge', function() {
		var data = { name: 'John' }
		builder.merge('User', data).return().toCypher().valueOf().should.eql({
			string: 'MERGE ($main:User {data}) RETURN $main',
			params: { data: data }
		})
	})
})