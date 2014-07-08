module.exports = {
	name  : 'Competitor',
	fields: ['name', 'coverage'],
	rels  : [
		{
			alias: 'products',
			dir  : 'inbound',
			type : 'SOLD_BY',
			label: 'CompetitorProduct'
		},
		{
			type : 'COVERS',
			label: 'Market'
		}
	]
};
