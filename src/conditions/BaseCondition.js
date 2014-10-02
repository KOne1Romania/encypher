'use strict';

var Context = require('../context');

function BaseCondition() {
	this.context = new Context();
}

BaseCondition.prototype = {
	constructor: BaseCondition,

	on: function(node) {
		this.context = this.context.of(node);
		return this;
	}
};

module.exports = BaseCondition;
