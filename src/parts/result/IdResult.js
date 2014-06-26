"use strict";

var create = require('lodash-node').create;

var BaseResult = require('./BaseResult');

function IdResult() {
	BaseResult.call(this);
}

IdResult.prototype = create(BaseResult.prototype, {
	constructor: IdResult,

	value: function() {
		return ['id(', this.context.value(), ')'].join('');
	},

	alias: function() {
		return this.context.aliasWith('id');
	}
});

module.exports = IdResult;
