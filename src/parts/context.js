"use strict";

function Context() {
}

var root = {
	get name() {
		return '$self';
	},

	get path() {
		return this.name;
	},

	nest: function(context) {
		return NestedContext.ensure(context)
	}
};

var empty = {
	get path() {
		return null;
	}
};

function NestedContext(name, parent) {
	this.name = name;
	this.parent = parent || empty;
}

NestedContext.prototype = {
	constructor: NestedContext,

	get path() {
		return [this.parent.path, this.name].join('_');
	}

};

Context.ensure = function(nestedContext) {
	return nestedContext instanceof NestedContext
		? nestedContext
		: typeof(nestedContext) === 'string'
			? new NestedContext(nestedContext)
			: root;
};

Context.root = root;
Context.Nested = NestedContext;

module.exports = Context;
