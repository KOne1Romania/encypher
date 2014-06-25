"use strict";

var NodeResPart = require('./node-res-part');

var inflection = require('inflection');

function CollectResPart(resultPart, node) {
	this.node = NodeResPart.ensureNode(node);
	this.resultPart = resultPart.withNode(node);
}

CollectResPart.prototype = {
	constructor: CollectResPart,

	value: function() {
		return 'collect(distinct ' + this.resultPart.value() + ')';
	},

	alias: function() {
		return inflection.pluralize(this.resultPart.alias());
	},

	toString: function() {
		return [this.value(), 'as', this.alias()].join(' ');
	}

};

module.exports = CollectResPart;
