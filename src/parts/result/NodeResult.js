"use strict";

var create = require('lodash-node').create;

var BaseResult = require('./BaseResult');

function NodeResult() {
	BaseResult.call(this);
}

NodeResult.prototype = create(BaseResult.prototype, {
	constructor: NodeResult,

	value: function() {
		return this.context.value();
	},

	alias: function() {
		return this.context.alias();
	}
});

module.exports = NodeResult;
