"use strict";

var _ = require('lodash-node');

var NodeDescriptor = require('./NodeDescriptor'),
    rootContextChain = require('../../context/chain');

function BareNodeDescriptor(def) {
	_.defaults(this, def);
	this.contextChain = rootContextChain.nestIn(this.alias);
}

BareNodeDescriptor.prototype = _.create(NodeDescriptor.prototype, {
	constructor: BareNodeDescriptor,

	matchPart: function() {
		return this.contextChain.nestIn(this.context).value();
	}
});

module.exports = BareNodeDescriptor;
