"use strict";

var uniq = require('lodash-node').uniq;
var create = require('lodash-node').create;

var Context = require('../context');

function ResPart(context) {
	this.context = Context.ensureContext(context);
}

ResPart.prototype = {
	constructor: ResPart,

	value: function() {
		throw Error('unimplemented #value in ' + this.constructor.name);
	},

	alias: function() {
		throw Error('unimplemented #alias in ' + this.constructor.name);
	},

	withContext: function(context) {
		return create(this, { context: Context.ensureContext(context) });
	},

	toString: function() {
		return uniq([this.value(), this.alias()]).join(' as ');
	}
};

module.exports = ResPart;
