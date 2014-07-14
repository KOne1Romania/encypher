"use strict";

var generator = require('obj-generator');

var rootChain = require('./chain/rootContextChain');

function Context() {
	this.absoluteChain = rootChain;
	this.relativeChain = rootChain;
	this._isRoot = true;
}

Context.prototype = {
	constructor: Context,

	of: function(nodeName) {
		if (nodeName) {
			this.absoluteChain = this.absoluteChain.nestIn(nodeName);
			this.relativeChain = this.relativeChain.nestIn(nodeName);
			this._isRoot = false;
		}
		return this;
	},

	as: function(nodeName) {
		this.absoluteChain = this.absoluteChain.nestIn(nodeName);
		return this;
	},

	value: function() {
		return this.absoluteChain.value();
	},

	aliasWith: function(suffix) {
		return this.relativeChain.withSuffix(suffix);
	},

	alias: function() {
		return this.aliasWith();
	},

	isRoot: function() {
		return this._isRoot;
	}

};

Context.create = generator(Context);

module.exports = Context;
