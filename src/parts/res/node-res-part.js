"use strict";

var inflection = require('inflection');
var create = require('lodash-node').create;

var ResPart = require('./res-part');

function NodeResPart(context) {
	ResPart.call(this, context);
}

NodeResPart.prototype = create(ResPart.prototype, {
	constructor: NodeResPart,

	value: function() {
		return this.context.toString();
	},

	alias: function() {
		return inflection.camelize(this.value(), true);
	}
});

module.exports = NodeResPart;
