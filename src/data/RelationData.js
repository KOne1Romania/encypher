'use strict';

var $relationDescriptor = require('../descriptors').relation;
var FetchOptions = require('./FetchOptions');

function RelationData(def) {
	this.descriptor = $relationDescriptor(def.descriptor);
	this.fetchOptions = FetchOptions.ensureInstance(
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
		return this.fetchOptions.resultPart(this.descriptor.identifier);
	}
};

module.exports = RelationData;
