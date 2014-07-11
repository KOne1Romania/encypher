'use strict';

var rootContextChain = require('../context/chain');

function Condition() {
	this.contextChain = rootContextChain;
}

Condition.prototype = {
	constructor: Condition,

	on: function(node) {
		this.contextChain = this.contextChain.nestIn(node);
		return this;
	}
};

module.exports = Condition;
