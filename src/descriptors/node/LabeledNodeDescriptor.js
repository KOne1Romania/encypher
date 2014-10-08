"use strict";

var _ = require('lodash-node'),
    camelize = require('inflection').camelize;

var NodeDescriptor = require('./NodeDescriptor'),
    $matchNodePart = require('../../parts/match').node;

function LabeledNodeDescriptor(def) {
	_.defaults(this, def, { alias: camelize(def.label, true) });
}

LabeledNodeDescriptor.prototype = _.create(NodeDescriptor.prototype, {
	constructor: LabeledNodeDescriptor,

	matchPart: function() {
		return $matchNodePart({
			label: this.label,
			alias: this._aliasWithContext()
		});
	}
});

module.exports = LabeledNodeDescriptor;
