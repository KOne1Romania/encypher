"use strict";

var create = require('lodash-node').create;
var compact = require('lodash-node').compact;
var inflection = require('inflection');

var ContextChain = require('./ContextChain');

function NestedContextChain(contextNames) {
	this.contextNames = contextNames || [];
}

NestedContextChain.prototype = create(ContextChain, {
	constructor: NestedContextChain,

	nestIn: function(nodeName) {
		if (nodeName == null || (nodeName.value &&  nodeName.value() === '$self') || nodeName === '$self') {
			return this;
		}
		this.contextNames.unshift(nodeName);
		return this;
	},

	value: function() {
		return joinWithUnderscore(this.contextNames);
	},

	withSuffix: function(suffix) {
		return inflection.camelize(joinWithUnderscore(this.contextNames.concat([suffix])), true);
	}

});

function joinWithUnderscore(contextNames) {
	return compact(contextNames).join('_');
}

module.exports = NestedContextChain;
