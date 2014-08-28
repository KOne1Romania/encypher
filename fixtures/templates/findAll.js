'use strict';

module.exports = [
	{
		name       : 'simple',
		template   : {
			filterSection: {
				filterDescriptors: [
					{ label: 'Competitor' }
				]},
			returnSection: {
				fields          : ['name', 'coverage'],
				fetchDescriptors: [
					{
						relationDescriptor: { type: 'COVERS', related: { label: 'Market' } },
						fetchOptions      : {
							aggregate: 'count'
						}
					}
				]
			}
		},
		queryString: [
			"MATCH ($self:Competitor)",
			"OPTIONAL MATCH $self-[:COVERS]->(market:Market)",
			"RETURN {",
			"id: id($self),",
			"name: $self.name,",
			"coverage: $self.coverage,",
			"marketsCount: count(distinct market)",
			"} as $self"
		].join(' ')
	},
	{
		skip       : true,
		name       : 'complex',
		template   : {
			filterSection       : {
				filterDescriptors: [
					{
						label     : 'Activity',
						conditions: [
							{ field: 'name', op: 'regex', value: '.*Month.*' }
						]
					},
					{
						relation  : { type: 'PROMOTES', related: { label: 'CompetitorProduct', alias: 'product' } },
						conditions: [
							{ value: 3039 }
						]
					}
				]
			},
			orderedSubsetSection: {
				order: [
					{ field: 'name' },
					{ field: 'timestamp', direction: 'desc' }
				],
				skip : 10,
				limit: 10
			},
			returnSection: {
				fields          : ['name'],
				fetchDescriptors: [
					{
						relationDescriptor: {
							type       : 'RUNS',
							related    : { label: 'Competitor' },
							direction  : 'inbound',
							cardinality: 'one'
						}
					},
					{
						relationDescriptor: {
							type       : 'RUNS',
							related    : { label: 'Competitor' },
							direction  : 'inbound',
							cardinality: 'one'
						}
					}
				]
			}
		},
		queryString: [
			"MATCH ($self:Activity)",
				"WHERE $self.name =~ '.*Month.*'",
			"WITH distinct $self",
			"MATCH $self-[:PROMOTES]->(product:CompetitorProduct)",
				"WHERE id(product) = 3039",
			"WITH distinct $self",
				"ORDER BY $self.name, $self.timestamp DESC",
				"SKIP 10",
				"LIMIT 10",
			"OPTIONAL MATCH $self<-[:RUNS]-(competitor:Competitor)",
			"WITH $self, id(competitor) as competitorId",
			"OPTIONAL MATCH $self-[:PROMOTES]->(product:CompetitorProduct)",
			"WITH $self, competitorId, collect(distinct id(product)) as productIds",
			"RETURN {",
				"id: id($self),",
				"name: $self.`name`,",
				"competitorId: competitorId,",
				"productIds: productIds",
			"}"
		].join(' ')
	}
];

