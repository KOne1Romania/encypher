module.exports = {
	label : 'Competitor',
	fields: ['name', 'coverage'],
	rels  : [
		{
			type   : 'SOLD_BY',
			related: { label: 'CompetitorProduct', alias: 'product' },
			dir    : 'inbound'
		},
		{
			type   : 'COVERS',
			related: { label: 'Market' }
		}
	]
};
