"use strict";

var create = require('lodash-node').create;
var pluralize = require('inflection').pluralize;

var BaseRes = require('./BaseRes');
var Context = require('../../context');

function CollectRes(context) {
	this.context = context || new Context();
}

CollectRes.prototype = create(BaseRes.prototype, {
	constructor: CollectRes,

	value: function() {
		return ['collect(distinct ', this.context.value(), ')'].join('');
	},

	alias: function() {
		return pluralize(this.context.alias());
	}
});

module.exports = CollectRes;
