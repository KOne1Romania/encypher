"use strict";

var inflection = require('inflection');
var compact = require('lodash-node').compact;

var Context= require('../context');

function FieldResPart(name, context) {
	this.context = Context.ensureContext(context);
	this.name = name;
}

FieldResPart.prototype = {
	constructor: FieldResPart,

	value: function() {
		return [ this.context, this.name].join('.');
	},

	alias: function() {
		var underscoredAlias = compact([this.context.child, this.name]).join('_');
		return  inflection.camelize(underscoredAlias, true);
	},

	toString: function() {
		return [this.value(), 'as', this.alias()].join(' ');
	}

};

module.exports = FieldResPart;
