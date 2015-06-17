'use strict'

require('chai').should()

var encypher = require('../encypher')

suite('encypher', function() {
	test('find all complex query', function() {
		var expectedCypher = {
			string: [
// @formatter:off
				"MATCH ($main:Activity)",
					"WHERE $main.`name` =~ {nameRegex}",
				"MATCH $main-[:PROMOTES]->(product:CompetitorProduct)",
					"WHERE id(product) = {productId}",
				"WITH distinct $main",
					"SKIP {skip}",
					"LIMIT {limit}",
				"OPTIONAL MATCH $main<-[:RUNS]-(competitor:Competitor)",
				"WITH $main, id(competitor) as competitorId",
				"OPTIONAL MATCH $main-[:PROMOTES]->(product:CompetitorProduct)",
				"WITH $main, competitorId, collect(id(product)) as productIds",
				"RETURN {",
					"id: id($main),",
					"name: $main.`name`,",
					"timestamp: $main.`timestamp`,",
					"competitorId: competitorId,",
					"productIds: productIds",
				"} as $main",
				"ORDER BY $main.`name` ASC, $main.`timestamp` DESC"
// @formatter:on
			].join(' '),
			params: {
				nameRegex: '(?i).*Month.*',
				productId: 3039,
				skip: 10,
				limit: 10
			}
		}
		encypher
			.match('Activity')
			.where({ field: 'name', op: 'regex', value: '.*Month.*' })
			.matchRelation('PROMOTES', { label: 'CompetitorProduct', alias: 'product' })
			.where({ field: 'id', op: 'eq', value: 3039 })
			.reset()
			.subset({ skip: 10, limit: 10 })
			.optionalMatchRelation({ type: 'RUNS', arrow: 'left' }, 'Competitor')
			.fetch({ select: 'id' })
			.optionalMatchRelation('PROMOTES', { label: 'CompetitorProduct', alias: 'product' })
			.fetch({ aggregate: 'collect', select: 'id' })
			.returnExpanded(['id', 'name', 'timestamp'])
			.order(['name', { field: 'timestamp', direction: 'desc' }])
			.toCypher().valueOf().should.eql(expectedCypher)
	})

	test('create new node with relations', function() {
		var postData = { title: 'test post', body: 'some text' },
		    userId   = 15,
		    tagIds   = [20, 21]
		var expectedCypher = {
			string: [
// @formatter:off
				"CREATE ($main:Post {data})",
				"MATCH (user:User)",
					"WHERE id(user) = {userId}",
					"MERGE $main-[:WRITTEN_BY]->user",
				'WITH distinct $main',
				"MATCH (tag:Tag)",
					"WHERE id(tag) IN {tagIds}",
					"MERGE $main-[:HAST_TAG]->tag",
				'WITH distinct $main',
				"RETURN id($main) as id"
// @formatter:on
			].join(' '),
			params: {
				data: postData,
				userId: userId,
				tagIds: tagIds
			}
		}
		encypher
			.create('Post', postData)
			.match('User').whereId(userId).mergeRelation('WRITTEN_BY')
			.match('Tag').whereIdIn(tagIds).mergeRelation('HAST_TAG')
			.return({ select: 'id' })
			.toCypher().valueOf().should.eql(expectedCypher)
	})

	test('soft delete node', function() {
		var userId = 12
		var expectedCypher = {
			string: [
// @formatter:off
				"MATCH ($main:User)",
					"WHERE id($main) = {id}",
				"REMOVE $main:User",
				"SET $main:_User"
// @formatter:on
			].join(' '),
			params: {
				id: userId
			}
		}
		encypher
			.match('User').whereId(userId)
			.removeLabel('User')
			.setLabel('_User')
			.toCypher().valueOf().should.eql(expectedCypher)
	})

	test('update node with relations', function() {
		var postData = { title: 'new title', body: 'updated text' },
		    userId   = 15,
		    postId   = 30,
		    tagIds   = [20, 21]
		var expectedCypher = {
			string: [
// @formatter:off
				"MATCH ($main:Post)",
					"WHERE id($main) = {id}",
					"SET $main = {data}",
				"OPTIONAL MATCH $main-[$r_written_by:WRITTEN_BY]->(user:User)",
					"WHERE NOT id(user) = {userId}",
					"DELETE $r_written_by",
				"WITH distinct $main",
				"OPTIONAL MATCH (user:User)",
					"WHERE id(user) = {userId}",
					"MERGE $main-[:WRITTEN_BY]->user",
				'WITH distinct $main',
				"OPTIONAL MATCH $main-[$r_has_tag:HAS_TAG]->(tag:Tag)",
					"WHERE NOT id(tag) IN {tagIds}",
					"DELETE $r_has_tag",
				"WITH distinct $main",
				"OPTIONAL MATCH (tag:Tag)",
					"WHERE id(tag) IN {tagIds}",
					"MERGE $main-[:HAS_TAG]->tag",
				"WITH distinct $main",
				"RETURN id($main) as id"
// @formatter:on
			].join(' '),
			params: {
				id: postId,
				data: postData,
				userId: userId,
				tagIds: tagIds
			}
		}
		encypher
			.match('Post').whereId(postId)
			.setNode(postData)
			.optionalMatchRelation(aliasRelation('WRITTEN_BY'), 'User')
			.where({ not: { field: 'id', op: 'eq', value: userId } })
			.deleteRelation()
			.optionalMatch('User').whereId(userId).mergeRelation('WRITTEN_BY')
			.optionalMatchRelation(aliasRelation('HAS_TAG'), 'Tag')
			.where({ not: { field: 'id', op: 'in', value: tagIds } })
			.deleteRelation()
			.optionalMatch('Tag').whereIdIn(tagIds).mergeRelation('HAS_TAG')
			.return({ select: 'id' })
			.toCypher().valueOf().should.eql(expectedCypher)
	})
})

function aliasRelation(relationType) {
	return { type: relationType, alias: '$default' }
}
