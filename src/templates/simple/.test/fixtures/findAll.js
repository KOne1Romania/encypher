'use strict';

module.exports = [
	{
		name       : 'basic',
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
	}
];

