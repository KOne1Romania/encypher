'use strict';

var defaults = require('lodash-node').defaults;
var rootContextChain = require('../../context/chain');

function NodeMatch(def) {
	defaults(this, def);
	this.contextChain = rootContextChain.nestIn(this.alias);
}

NodeMatch.prototype = {
	constructor: NodeMatch,

	of: function(nodeName) {
		this.contextChain = this.contextChain.nestIn(nodeName);
		return this;
	},

	toString: function() {
		return '(' + [this.alias, this.label].join(':') + ')';
	}

};

module.exports = NodeMatch;
