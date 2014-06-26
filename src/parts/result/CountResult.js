"use strict";

var create = require('lodash-node').create;
var pluralize = require('inflection').pluralize;

var BaseResult = require('./BaseResult');
var QueryPartError = require('../../errors/QueryPartError');

function CountResult() {
	BaseResult.call(this);
}

CountResult.prototype = create(BaseResult.prototype, {
	constructor: CountResult,

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

module.exports = CountResult;
