"use strict";

var defaults = require('lodash-node').defaults;
var merge = require('lodash-node').merge;

var nodeDescriptor = require('./node');
var $matchRelationPart = require('../parts/match').relation;

function RelationDescriptor(def) {
	defaults(this, def, {
		self       : {},
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

	withContext: function(context) {
		this.context = context;
		return this;
	},

	matchPart: function() {
		return $matchRelationPart(merge({}, this, {
			self   : this.self.withContext(this.context).matchPart(),
			related: this.related.withContext(this.context).matchPart()
		}));
	}
};

module.exports = RelationDescriptor;
