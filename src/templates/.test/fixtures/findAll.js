'use strict';

module.exports = [
	{
		name: 'basic',
		template: {
			filterSection: {
				filterDescriptors: [
					{ label: 'Activity' }
				]
			}
		},
		queryString: [
			'MATCH ($self:Activity)',
			'WITH distinct $self',
			'RETURN {',
			'id: id($self)',
			'}'
		].join(' '),
		queryParams: {},
		generatedString: [
			'MATCH ($self:Activity)',
			'WITH distinct $self',
			'RETURN {',
			'id: id($self)',
			'}'
		].join(' ')
	},
	{
		name: 'complex',
		template: {
			filterSection: {
				filterDescriptors: [
					{
						label: 'Activity',
						conditions: [
							{ field: 'name', op: 'regex', value: '.*Month.*' }
						]
					},
					{
						relation: {
							type: 'PROMOTES',
							related: { label: 'CompetitorProduct', alias: 'product' }
						},
						conditions: [
							{ value: 3039 }
						]
					}
				]
			},
			subsetSection: {
				skip: 10,
				limit: 10
			},
			returnSection: {
				fields: ['name'],
				orderParts: [
					{ field: 'name' },
					{ field: 'timestamp', direction: 'desc' }
				],
				relationDescriptors: [
					{

						type: 'RUNS',
						related: { label: 'Competitor' },
						direction: 'inbound',
						cardinality: 'one',
						fetch: { retrieve: 'id' }
					},
					{
						type: 'PROMOTES',
						related: { label: 'CompetitorProduct', alias: 'product' },
						fetch: { retrieve: 'id' }
					}
				]
			}
		},
		queryString: [ // @formatter:off
			"MATCH ($self:Activity)",
				"WHERE $self.`name` =~ {nameRegex}",
			"WITH distinct $self",
			"MATCH $self-[:PROMOTES]->(product:CompetitorProduct)",
				"WHERE id(product) = {productId}",
			"WITH distinct $self",
				"SKIP {skip}",
				"LIMIT {limit}",
			"OPTIONAL MATCH $self<-[:RUNS]-(competitor:Competitor)",
			"WITH $self, id(competitor) as competitorId",
			"OPTIONAL MATCH $self-[:PROMOTES]->(product:CompetitorProduct)",
			"WITH $self, competitorId, collect(distinct id(product)) as productIds",
				"ORDER BY $self.`name` ASC, $self.`timestamp` DESC",
			"RETURN {",
				"id: id($self),",
				"name: $self.`name`,",
				"competitorId: competitorId,",
				"productIds: productIds",
			"}" // @formatter:on
		].join(' '),
		queryParams: {
			nameRegex: '(?i).*Month.*',
			productId: 3039,
			skip: 10,
			limit: 10
		},
		generatedString: [ // @formatter:off
			"MATCH ($self:Activity)",
				"WHERE $self.`name` =~ \"(?i).*Month.*\"",
			"WITH distinct $self",
			"MATCH $self-[:PROMOTES]->(product:CompetitorProduct)",
				"WHERE id(product) = 3039",
			"WITH distinct $self",
				"SKIP 10",
				"LIMIT 10",
			"OPTIONAL MATCH $self<-[:RUNS]-(competitor:Competitor)",
			"WITH $self, id(competitor) as competitorId",
			"OPTIONAL MATCH $self-[:PROMOTES]->(product:CompetitorProduct)",
			"WITH $self, competitorId, collect(distinct id(product)) as productIds",
				"ORDER BY $self.`name` ASC, $self.`timestamp` DESC",
			"RETURN {",
				"id: id($self),",
				"name: $self.`name`,",
				"competitorId: competitorId,",
				"productIds: productIds",
			"}" // @formatter:on
		].join(' ')
	}
];

