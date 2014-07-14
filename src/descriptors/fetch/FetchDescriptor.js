'use strict';

var ensureInstance = require('ensure-instance');

var RelationDescriptor = require('../RelationDescriptor');
var FetchOptions = require('./FetchOptions');

function FetchDescriptor(def) {
	this.relationDescriptor = ensureInstance(RelationDescriptor)(def.relationDescriptor);
	this.fetchOptions = ensureInstance(FetchOptions)(
		def.fetchOptions,
		this.relationDescriptor.cardinality
	);
}

FetchDescriptor.prototype = {
	constructor: FetchDescriptor,

	matchPart: function() {
		return this.relationDescriptor.matchPart();
	},

	resultPart: function() {
		return this.fetchOptions.resultPart(this.relationDescriptor.identifier);
	}
};

module.exports = FetchDescriptor;
