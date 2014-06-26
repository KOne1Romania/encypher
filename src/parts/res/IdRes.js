"use strict";

var create = require('lodash-node').create;

var BaseRes = require('./BaseRes');

function IdRes() {
	BaseRes.call(this);
}

IdRes.prototype = create(BaseRes.prototype, {
	constructor: IdRes,

	value: function() {
		return ['id(', this.context.value(), ')'].join('');
	},

	alias: function() {
		return this.context.aliasWith('id');
	}
});

module.exports = IdRes;
