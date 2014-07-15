"use strict";

var defaults = require('lodash-node').defaults;
var create = require('lodash-node').create;
var camelize = require('inflection').camelize;

var NodeDescriptor = require('./NodeDescriptor');
var $matchNodePart = require('../../parts/match').node;

function LabeledNodeDescriptor(def) {
	defaults(this, def, { alias: camelize(def.label, true) });
}

LabeledNodeDescriptor.prototype = create(NodeDescriptor.prototype, {
	constructor: LabeledNodeDescriptor,

	withContext: function(context) {
		this.context = context;
		return this;
	},

	matchPart: function() {
		return $matchNodePart(this).of(this.context);
	}
});

module.exports = LabeledNodeDescriptor;
