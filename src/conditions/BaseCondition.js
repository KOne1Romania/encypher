'use strict';

var rootContextChain = require('../context/chain');

function BaseCondition() {
	this.contextChain = rootContextChain;
}

BaseCondition.prototype = {
	constructor: BaseCondition,

	on: function(node) {
		this.contextChain = this.contextChain.nestIn(node);
		return this;
	}
};

module.exports = BaseCondition;
