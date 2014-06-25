"use strict";

var uniq = require('lodash-node').uniq;

var Context = require('../context');

function ResPart(context) {
	this.context = Context.ensureContext(context);
}

ResPart.prototype = {
	constructor: ResPart,

	value: function() {
		throw Error('unimplemented method value in ResPart ' + this.constructor.name);
	},

	alias: function() {
		throw Error('unimplemented method alias in ResPart ' + this.constructor.name);
	},

	toString: function() {
		return uniq([this.value(), this.alias()]).join(' as ');
	}

};

module.exports = ResPart;
