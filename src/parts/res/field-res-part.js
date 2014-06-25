"use strict";

var inflection = require('inflection');
var create = require('lodash-node').create;
var compact = require('lodash-node').compact;

var ResPart = require('./res-part');

function FieldResPart(name, context) {
	ResPart.call(this, context);
	this.name = name;
}

FieldResPart.prototype = create(ResPart.prototype, {
	constructor: FieldResPart,

	value: function() {
		return [ this.context, this.name].join('.');
	},

	alias: function() {
		var underscoredAlias = compact([this.context.child, this.name]).join('_');
		return  inflection.camelize(underscoredAlias, true);
	}
});

module.exports = FieldResPart;
