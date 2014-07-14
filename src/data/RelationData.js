'use strict';

var ensureInstance = require('ensure-instance');

var RelationDescriptor = require('../descriptors/RelationDescriptor');
var FetchOptions = require('./FetchOptions');

function RelationData(def) {
	this.descriptor = ensureInstance(RelationDescriptor)(def.descriptor);
	this.fetchOptions = ensureInstance(FetchOptions)(
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
