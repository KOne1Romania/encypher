"use strict";

var create = require('lodash-node').create;
var pluralize = require('inflection').pluralize;

var BaseRes = require('./BaseRes');
var Context = require('../../context');
var QueryPartError = require('../../errors/QueryPartError');

function CountRes() {
	BaseRes.call(this);
}

CountRes.prototype = create(BaseRes.prototype, {
	constructor: CountRes,

	value: function() {
		return ['count(distinct ', this.context.value(), ')'].join('');
	},

	alias: function() {
		if (this.context.isRoot()) {
			throw new QueryPartError('Count result part requires a context');
		}
		return [pluralize(this.context.alias()), 'Count'].join('');
	}
});

module.exports = CountRes;
