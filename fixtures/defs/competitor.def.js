module.exports = {
	name  : 'Competitor',
	fields: ['name', 'coverage'],
	rels  : [
		{
			alias  : 'products',
			inbound: true,
			type   : 'SOLD_BY',
			label  : 'CompetitorProduct'
		},
		{
			type : 'COVERS',
			label: 'Market'
		}
	]
}
