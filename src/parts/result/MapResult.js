"use strict";

var create = require('lodash-node').create;

var BaseResult = require('./BaseResult');
var FieldResult = require('./FieldResult');
var QueryPartError = require('../../errors/QueryPartError');

function MapResult(parts) {
	BaseResult.call(this);
	if (parts == null || parts.length === 0) {
		throw new QueryPartError('Map result part requires a list of child parts');
	}
	this.parts = ensureParts(Array.isArray(parts) ? parts : [parts]);
}

MapResult.prototype = create(BaseResult.prototype, {
	constructor: MapResult,

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

function ensureParts(parts) {
	return parts.map(function(part) {
		return part instanceof BaseResult
			? part
			: new FieldResult(part);
	});
}

module.exports = MapResult;
