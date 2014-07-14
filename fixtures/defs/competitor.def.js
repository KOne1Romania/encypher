module.exports = {
	label: 'Competitor',
	fields: ['name', 'coverage'],
	relationDescriptors: [
		{
			type: 'SOLD_BY',
			related: { label: 'CompetitorProduct', alias: 'product' },
			dir: 'inbound'
		},
		{
			type: 'COVERS',
			related: { label: 'Market' }
		}
	]
};
