'use strict';

var rootContextChain = require('../../context/chain');

function NodeDescriptor() {
}

NodeDescriptor.prototype = {
	constructor: NodeDescriptor,

	_aliasWithContext: function() {
		return rootContextChain.nestIn(this.alias).nestIn(this.context).value()
	},

	matchPart: function() {
	},

	withContext: function(node) {
		this.context = node;
		return this;
	},

	toString: function() {
		return this.matchPart().toString();
	}
};

module.exports = NodeDescriptor;
