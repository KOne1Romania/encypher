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

		test('only advances one level even when matching third node', function() {
			var expectedCypherString = [
				'MATCH ($main:User)',
				'MATCH (post:Post)',
				'WITH distinct $main',
				'MATCH (tag:Tag)',
				'RETURN $main'].join(' ')
			builder.match('User').match('Post').match('Tag').return().toString()
				.should.eql(expectedCypherString)
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

	suite('#reset', function() {
		test('does nothing when called first', function() {
			builder.reset().toString().should.equal('')
		})
		test('still does nothing on main chain', function() {
			builder.match('User').reset().toString().should.eql('MATCH ($main:User)')
		})
	})

	test('#return', function() {
		builder.match('User').return().toString().should.eql('MATCH ($main:User) RETURN $main')
	})

	test('#whereId', function() {
		builder.match('User').whereId(10).return()
			.toString().should.eql('MATCH ($main:User) WHERE id($main) = 10 RETURN $main')
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