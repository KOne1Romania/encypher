"use strict";

var inflection = require('inflection');
var uniq = require('lodash-node').uniq;

var Context = require('../context');

function NodeResPart(context) {
	this.context = Context.ensureContext(context);
}

NodeResPart.prototype = {
	constructor: NodeResPart,

	value: function() {
		return this.context.toString();
	},

	alias: function() {
		return inflection.camelize(this.value(), true);
	},

	toString: function() {
		return uniq([this.value(), this.alias()]).join(' as ');
	}

};

NodeResPart.ensureNode = function(node) {
	return new NodeResPart(node);
};

module.exports = NodeResPart;
