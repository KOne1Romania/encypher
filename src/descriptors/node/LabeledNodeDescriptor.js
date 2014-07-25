"use strict";

var _ = require('lodash-node'),
    camelize = require('inflection').camelize;

var NodeDescriptor = require('./NodeDescriptor'),
    rootContextChain = require('../../context/chain'),
    $matchNodePart = require('../../parts/match').node;

function LabeledNodeDescriptor(def) {
	_.defaults(this, def, { alias: camelize(def.label, true) });
	this.contextChain = rootContextChain.nestIn(this.alias);
}

LabeledNodeDescriptor.prototype = _.create(NodeDescriptor.prototype, {
	constructor: LabeledNodeDescriptor,

	matchPart: function() {
		return $matchNodePart({
			label: this.label,
			alias: this.contextChain.nestIn(this.context).value()
		});
	}
});

module.exports = LabeledNodeDescriptor;
