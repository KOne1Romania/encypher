"use strict";

var create = require('lodash-node').create;

var BaseResult = require('./BaseResult');

function FieldResult(name) {
	BaseResult.call(this);
	this.name = name;
}

FieldResult.prototype = create(BaseResult.prototype, {
	constructor: FieldResult,

	value: function() {
		return [this.context.value(), this.name].join('.');
	},

	alias: function() {
		return this.context.aliasWith(this.name);
	}
});

module.exports = FieldResult;
