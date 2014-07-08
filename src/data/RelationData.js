'use strict';

var RelationDescriptor = require('../descriptors/RelationDescriptor');
var FetchData = require('./FetchData');

function RelationData(relationDescriptor, fetchOptions) {
	this.descriptor = new RelationDescriptor(relationDescriptor);
	this.fetchData = new FetchData(
		this.descriptor.related.alias,
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

	}
};
