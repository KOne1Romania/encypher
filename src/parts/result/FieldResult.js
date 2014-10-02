"use strict";

var create = require('lodash-node').create;

var BaseResult = require('./BaseResult'),
    encode = require('../../util/encode');

function FieldResult(name) {
	BaseResult.call(this);
	this.name = name;
}

FieldResult.prototype = create(BaseResult.prototype, {
	constructor: FieldResult,

	value: function() {
		return [this.context.value(), encode.field(this.name)].join('.');
	},

	alias: function() {
		return this.context.aliasWith(this.name);
	}
});

module.exports = FieldResult;
