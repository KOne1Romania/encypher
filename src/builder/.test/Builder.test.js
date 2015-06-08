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

	suite('#reset', function() {
		test('does nothing when called first', function() {
			builder.reset().toString().should.equal('')
		})

		test('still does nothing on main chain', function() {
			builder.match('User').reset().toString().should.eql('MATCH ($main:User)')
		})
	})

	suite('#return', function() {
		test('node', function() {
			builder.match('User').return().toString()
				.should.eql('MATCH ($main:User) RETURN $main')
		})

		test('id', function() {
			builder.match('User').return({ select: 'id' }).toString()
				.should.eql('MATCH ($main:User) RETURN id($main) as id')
		})

		test('count', function() {
			builder.match('User').return({ aggregate: 'count' }).toString()
				.should.eql('MATCH ($main:User) RETURN count($main) as $mainsCount')
		})
	})

	suite('basic', function() {
		test('#whereId', function() {
			builder.match('User').whereId(10).return()
				.toString().should.eql('MATCH ($main:User) WHERE id($main) = 10 RETURN $main')
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

	suite('relations', function() {
		suite('#createRelation', function() {
			test('between main and second node', function() {
				var expectedCypherString = [
					'MATCH ($main:User)',
					'MATCH (post:Post)',
					'CREATE $main<-[:WRITTEN_BY]-post',
					'RETURN $main'
				].join(' ')
				builder.match('User').match('Post').createRelation(WRITTEN_BY_RELATION_ARC)
					.return().toString().should.equal(expectedCypherString)
			})

			test('ignores second node after matching the third', function() {
				var expectedCypherString = [
					'MATCH ($main:User)',
					'MATCH (tag:Tag)',
					'WITH distinct $main',
					'MATCH (post:Post)',
					'CREATE $main<-[:WRITTEN_BY]-post',
					'RETURN $main'
				].join(' ')
				builder.match('User').match('Tag').match('Post')
					.createRelation(WRITTEN_BY_RELATION_ARC)
					.return().toString().should.equal(expectedCypherString)
			})
		})

		test('#mergeRelation is similar to #createRelation', function() {
			var expectedCypherString = [
				'MATCH ($main:User)',
				'MATCH (post:Post)',
				'WHERE id(post) = 12',
				'MERGE $main<-[:WRITTEN_BY]-post',
				'RETURN $main'
			].join(' ')
			builder.match('User').match('Post').whereId(12)
				.mergeRelation(WRITTEN_BY_RELATION_ARC)
				.return().toString().should.equal(expectedCypherString)
		})

		suite('#matchRelation', function() {
			test('once', function() {
				var expectedCypherString = [
					'MATCH ($main:User)',
					'MATCH $main<-[:WRITTEN_BY]-(post:Post)',
					'RETURN $main'
				].join(' ')
				builder.match('User')
					.matchRelation(WRITTEN_BY_RELATION_ARC, 'Post')
					.return().toString().should.equal(expectedCypherString)
			})

			test('once with condition', function() {
				var expectedCypherString = [
					'MATCH ($main:User)',
					'MATCH $main<-[:WRITTEN_BY]-(post:Post)',
					'WHERE id(post) = 20',
					'RETURN $main'
				].join(' ')
				builder.match('User')
					.matchRelation(WRITTEN_BY_RELATION_ARC, 'Post')
					.whereId(20)
					.return().toString().should.equal(expectedCypherString)
			})

			test('twice consecutive with condition', function() {
				var expectedCypherString = [
					'MATCH ($main:User)',
					'MATCH $main<-[:WRITTEN_BY]-(post:Post)',
					'MATCH post-[:HAS_TAG]->(post_tag:Tag)',
					'WHERE id(post_tag) = 13',
					'RETURN $main'
				].join(' ')
				builder.match('User')
					.matchRelation(WRITTEN_BY_RELATION_ARC, 'Post')
					.matchRelation('HAS_TAG', 'Tag')
					.whereId(13)
					.return().toString().should.equal(expectedCypherString)
			})

			test('two different relations', function() {
				var expectedCypherString = [
					'MATCH ($main:User)',
					'MATCH $main<-[:WRITTEN_BY]-(post:Post)',
					'WITH distinct $main',
					'MATCH $main-[:HAS_ADDRESS]->(address:Address)',
					'RETURN $main'
				].join(' ')
				builder.match('User')
					.matchRelation(WRITTEN_BY_RELATION_ARC, 'Post')
					.reset()
					.matchRelation('HAS_ADDRESS', 'Address')
					.return().toString().should.equal(expectedCypherString)
			})
		})
	})

	test('#compose', function() {
		var matchWhereStep = builder.match('User').whereId(10),
		    returnStep     = builder.return()
		matchWhereStep.compose(returnStep).toString()
			.should.eql('MATCH ($main:User) WHERE id($main) = 10 RETURN $main')
 	})
})

var WRITTEN_BY_RELATION_ARC = { type: 'WRITTEN_BY', arrow: 'left' }
