'use strict';

var RelationDescriptor = require('../descriptors/RelationDescriptor');
var FetchData = require('./FetchData');

function RelationData(def) {
	this.descriptor = RelationDescriptor.ensureInstance(def.descriptor);
	this.fetchData = new FetchData(
		def.fetchOptions,
		this.descriptor.cardinality
	);
}

RelationData.prototype = {
	constructor: RelationData,

	matchPart: function() {
		return this.descriptor.matchPart();
	},

	resultPart: function() {
		return this.fetchData.resultPart(this.descriptor.identifier);
	}
};

RelationData.ensureInstance = function(instance) {
	return instance instanceof  RelationData
		? instance
		: new RelationData(instance);
};

module.exports = RelationData;
