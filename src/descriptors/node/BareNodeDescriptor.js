"use strict";

var create = require('lodash-node').create;

var NodeDescriptor = require('./NodeDescriptor');

function BareNodeDescriptor(alias) {
	this.alias = alias || '$self';
}

BareNodeDescriptor.prototype = create(NodeDescriptor.prototype, {
	constructor: BareNodeDescriptor,

	matchPart: function() {
		return this.alias;
	}
});

module.exports = BareNodeDescriptor;
