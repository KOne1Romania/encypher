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

	matchPart: function() {
		return $matchNodePart(this);
	}
});

module.exports = LabeledNodeDescriptor;
