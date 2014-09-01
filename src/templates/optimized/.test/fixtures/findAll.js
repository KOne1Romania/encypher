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
			'} as $self'
		].join(' ')
	},
	{
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
			orderSection        : {
				orderParts: [
					{ field: 'name' },
					{ field: 'timestamp', direction: 'desc' }
				]
			},
			subsetSection       : {
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
						},
						fetchOptions: { retrieve: 'id' }
					},
					{
						relationDescriptor: {
							type       : 'PROMOTES',
							related    : { label: 'CompetitorProduct', alias: 'product' }
						},
						fetchOptions: { retrieve: 'id' }
					}
				]
			}
		},
		queryString: [
			"MATCH ($self:Activity)",
				"WHERE $self.`name` =~ \"(?i).*Month.*\"",
			"WITH distinct $self",
			"MATCH $self-[:PROMOTES]->(product:CompetitorProduct)",
				"WHERE id(product) = 3039",
			"WITH distinct $self",
				"ORDER BY $self.name ASC, $self.timestamp DESC",
				"SKIP 10",
				"LIMIT 10",
			"OPTIONAL MATCH $self<-[:RUNS]-(competitor:Competitor)",
			"WITH $self, id(competitor) as competitorId",
			"OPTIONAL MATCH $self-[:PROMOTES]->(product:CompetitorProduct)",
			"WITH $self, competitorId, collect(distinct id(product)) as productIds",
			"RETURN {",
				"id: id($self),",
				"name: $self.name,",
				"competitorId: competitorId,",
				"productIds: productIds",
			"} as $self"
		].join(' ')
	}
];

