"use strict";

var uniq = require('lodash-node').uniq;
var Context = require('../../context');

function BaseRes() {
	this.context = new Context();
}

BaseRes.prototype = {
	constructor: BaseRes,

	of: function(node) {
		this.context = this.context.of(node);
		return this;
	},

	as: function(node) {
		this.context = this.context.as(node);
		return this;
	},

	toString: function() {
		return uniq([this.value(), this.alias()]).join(' as ');
	},

	aliasWith: function(suffix) {
		return this.context.aliasWith(suffix);
	}
};

module.exports = BaseRes;
