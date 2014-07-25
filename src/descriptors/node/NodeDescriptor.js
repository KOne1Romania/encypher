'use strict';

function NodeDescriptor() {
}

NodeDescriptor.prototype = {
	constructor: NodeDescriptor,

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
