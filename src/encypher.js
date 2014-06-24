var QueryStructure = require('./QueryStructure');

var EntityDescriptor = require('./descriptors/EntityDescriptor');
var competitorDef = require('../fixtures/defs/competitor.def');

var encypher = {

	findOne: function(entityName, entityId) {
		var entityDescriptor = new EntityDescriptor(competitorDef);
		var queryStructure = new QueryStructure()
			.addTo('startNode')
			.addTo('optionalRels', new RelationPart());
		queryPartsBuilder = new QueryPartsBuilder(entityName);
		queryPartsBuilder.buildStructure('START', 'OPTIONAL MATCH', 'RETURN');
	}

};
