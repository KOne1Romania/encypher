"use strict";

var create = require('lodash-node').create;

var ContextChain = require('./ContextChain');
var NestedContextChain = require('./NestedContextChain');

var rootContextChain = create(ContextChain.prototype, {
	value: function() {
		return '$self';
	},

	withSuffix: function(s) {
		return s == null ? this.value() : s;
	},

	nestIn: function(contextName) {
		return contextName == null || contextName === rootContextChain
			? this
			: new NestedContextChain([contextName]);
	}
});

module.exports = rootContextChain;
