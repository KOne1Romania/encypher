'use strict';

var baseQueryString = [
	'MATCH ($self:Activity)',
	'WITH distinct $self',
	'RETURN count(distinct $self)'
].join(' ');

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
		queryString: baseQueryString,
		queryParams: {},
		generatedString: baseQueryString
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
			}
		},
		queryString: [
			"MATCH ($self:Activity)",
				"WHERE $self.`name` =~ {nameRegex}",
			"WITH distinct $self",
			"MATCH $self-[:PROMOTES]->(product:CompetitorProduct)",
				"WHERE id(product) = {productId}",
			"WITH distinct $self",
			"RETURN count(distinct $self)"
		].join(' '),
		queryParams: {
			nameRegex: '(?i).*Month.*',
			productId: 3039
		},
		generatedString: [
			"MATCH ($self:Activity)",
				"WHERE $self.`name` =~ \"(?i).*Month.*\"",
			"WITH distinct $self",
			"MATCH $self-[:PROMOTES]->(product:CompetitorProduct)",
				"WHERE id(product) = 3039",
			"WITH distinct $self",
			"RETURN count(distinct $self)"
		].join(' ')
	}
];

