"use strict";

var inflection = require('inflection');
var _= require('lodash-node');

function NodeResPart(opts) {
	opts = opts || {};
	this.self = opts.self;
	this.child = opts.child;
}

NodeResPart.prototype = {
	constructor: NodeResPart,

	value: function() {
		var value = _.compact([this.self, this.child]).join('_');
		return  value == '' ? '$self' : value;
	},

	alias: function() {
		return inflection.camelize(this.value(), true);
	},

	toString: function() {
		return _.uniq([this.value(), this.alias()]).join(' as ');
	}

};

module.exports = NodeResPart;
