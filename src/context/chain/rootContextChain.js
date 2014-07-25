"use strict";

var _ = require('lodash-node');

var ContextChain = require('./ContextChain');
var NestedContextChain = require('./NestedContextChain');

var rootContextChain = _.create(ContextChain.prototype, {
	value: function() {
		return '$self';
	},

	withSuffix: function(s) {
		return s == null ? this.value() : s;
	},

	nestIn: function(contextName) {
		return contextName == null || contextName === rootContextChain || contextName === '$self'
			? this
			: new NestedContextChain([contextName]);
	}
});

module.exports = rootContextChain;
