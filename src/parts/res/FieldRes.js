"use strict";

var create = require('lodash-node').create;

var BaseRes = require('./BaseRes');

function FieldRes(name) {
	BaseRes.call(this);
	this.name = name;
}

FieldRes.prototype = create(BaseRes.prototype, {
	constructor: FieldRes,

	value: function() {
		return [this.context.value(), this.name].join('.');
	},

	alias: function() {
		return this.context.aliasWith(this.name);
	}
});

module.exports = FieldRes;
