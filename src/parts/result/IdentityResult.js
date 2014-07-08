"use strict";

var create = require('lodash-node').create;

var BaseResult = require('./BaseResult');
var Context = require('../../context');

function IdentityResult(context) {
	this.context = context || new Context();
}

IdentityResult.prototype = create(BaseResult.prototype, {
	constructor: IdentityResult,

	value: function() {
		return this.context.value();
	},

	alias: function() {
		return this.context.alias();
	}
});

module.exports = IdentityResult;
