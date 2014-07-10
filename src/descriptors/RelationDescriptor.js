"use strict";

var defaults = require('lodash-node').defaults;
var merge = require('lodash-node').merge;

var nodeDescriptor = require('./node');
var $matchRelationPart = require('../parts/match').relation;

function RelationDescriptor(def) {
	defaults(this, def, {
		self       : '$self',
		direction  : 'outbound',
		cardinality: 'many'
	});
	this.self = nodeDescriptor(this.self);
	this.related = nodeDescriptor(this.related);
}

RelationDescriptor.prototype = {
	constructor: RelationDescriptor,

	get identifier() {
		return this.related.alias;
	},

	matchPart: function() {
		return $matchRelationPart(merge(this, {
			self   : this.self.matchPart(),
			related: this.related.matchPart()
		}));
	}
};

RelationDescriptor.ensureInstance = function(instance) {
	return instance instanceof  RelationDescriptor
		? instance
		: new RelationDescriptor(instance);
};

module.exports = RelationDescriptor;
