"use strict";

var create = require('lodash-node').create;

var BaseRes = require('./BaseRes');
var Context = require('../../context');
var QueryPartError = require('../../errors/QueryPartError');

function MapRes(parts) {
	BaseRes.call(this);
	if (parts == null || parts.length === 0) {
		throw new QueryPartError('Map result part requires a list of child parts');
	}
	this.parts = Array.isArray(parts) ? parts : [parts];
}

MapRes.prototype = create(BaseRes.prototype, {
	constructor: MapRes,

	of: function(node) {
		this.context = this.context.of(node);
		this.parts = this.parts.map(function(part) {
			return part.as(node);
		});
		return this;
	},

	as: function(node) {
		this.context = this.context.as(node);
		this.parts = this.parts.map(function(part) {
			return part.as(node);
		});
		return this;
	},

	value: function() {
		var entries = this.parts.map(function(part) {
			return [part.alias(), part.value()].join(': ')
		});
		return ['{', entries.join(', '), '}'].join(' ');
	},

	alias: function() {
		return this.context.alias();
	}
});

module.exports = MapRes;
