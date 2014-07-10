'use strict';

function NodeDescriptor() {
}

NodeDescriptor.prototype = {
	constructor: NodeDescriptor,

	matchPart: function() {
	},

	toString: function() {
		return this.matchPart().toString();
	}
};

module.exports = NodeDescriptor;
