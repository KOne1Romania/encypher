"use strict";

var create = require('lodash-node').create;

var BaseRes = require('./BaseRes');

function NodeRes() {
	BaseRes.call(this);
}

NodeRes.prototype = create(BaseRes.prototype, {
	constructor: NodeRes,

	value: function() {
		return this.context.value();
	},

	alias: function() {
		return this.context.alias();
	}
});

module.exports = NodeRes;
