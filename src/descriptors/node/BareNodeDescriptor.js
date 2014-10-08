"use strict";

var _ = require('lodash-node');

var NodeDescriptor = require('./NodeDescriptor');

function BareNodeDescriptor(def) {
	_.defaults(this, def);
}

BareNodeDescriptor.prototype = _.create(NodeDescriptor.prototype, {
	constructor: BareNodeDescriptor,

	matchPart: function() {
		return this._aliasWithContext();
	}
});

module.exports = BareNodeDescriptor;
