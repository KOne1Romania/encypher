"use strict";

var create = require('lodash-node').create;
var pluralize = require('inflection').pluralize;

var BaseResult = require('./BaseResult');
var Context = require('../../context');

function CollectResult(context) {
	this.context = context || new Context();
}

CollectResult.prototype = create(BaseResult.prototype, {
	constructor: CollectResult,

	value: function() {
		return ['collect(distinct ', this.context.value(), ')'].join('');
	},

	alias: function() {
		return pluralize(this.context.alias());
	}
});

module.exports = CollectResult;
