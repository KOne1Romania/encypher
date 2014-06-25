"use strict";

var create = require('lodash-node').create;

var ResPart = require('./res-part');

function MapResPart(resParts, context) {
	ResPart.call(this, context);
	resParts = Array.isArray(resParts) ? resParts : [resParts];
	this.resParts = resParts.map(function(resPart) {
		return resPart.withSelf(this.self);
	}.bind(this));
}

MapResPart.prototype = create(ResPart.prototype, {
	constructor: MapResPart,

	value: function() {
		var entries = this.resParts.map(function(resPart) {
			return [resPart.alias(), resPart.value()].join(': ')
		});
		return ['{', entries.join(', '), '}'].join(' ');
	},

	alias: function() {
		return this.context.toString();
	}
});

module.exports = MapResPart;
