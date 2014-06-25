"use strict";

var compact = require('lodash-node').compact;

function Context(opts) {
	opts = opts || {};
	this.self = opts.self;
	this.child = opts.child;
}

Context.prototype.toString = function() {
	var value = compact([this.self, this.child]).join('_');
	return  value == '' ? '$self' : value;
};

Context.ensureContext = function(context) {
	return new Context(context);
};

module.exports = Context;
