"use strict";

var defaults = require('lodash-node').defaults;
var merge = require('lodash-node').merge;

var nodeDescriptor = require('./node');
var $matchRelationPart = require('../parts/match').relation;
var FetchOptions = require('./fetch/FetchOptions');

function RelationDescriptor(def) {
	defaults(this, def, {
		self: {},
		direction: 'outbound',
		cardinality: 'many',
		fetch: {}
	});
	this.self = nodeDescriptor(this.self);
	this.related = nodeDescriptor(this.related);
	this.fetch = new FetchOptions(this.fetch, this.cardinality);
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
			self: this.self.withContext(this.context).matchPart(),
			related: this.related.withContext(this.context).matchPart()
		}));
	},

	resultPart: function() {
		return this.fetch.resultPart(this.identifier);
	}
};

module.exports = RelationDescriptor;
