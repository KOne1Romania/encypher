'use strict';

var RelationDescriptor = require('../descriptors/RelationDescriptor');
var FetchData = require('./FetchData');

function RelationData(relationDescriptor, fetchOptions) {
	this.descriptor = RelationDescriptor.ensureInstance(relationDescriptor);
	this.fetchData = new FetchData(
		this.descriptor.identifier,
		fetchOptions,
		this.descriptor.cardinality
	);
}

RelationData.prototype = {
	constructor: RelationData,

	matchPart: function() {
		return this.descriptor.matchPart();
	},

	resultPart: function() {
		return this.fetchData.resultPart();
	}
};

RelationData.ensureInstance = function(instance) {
	return instance instanceof  RelationData
		? instance
		: new RelationData(instance);
};

module.exports = RelationData;
