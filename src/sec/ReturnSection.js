"use strict";

var $p = require('../parts');
var $r = $p.result;

var compact = require('lodash-node').compact;

function ReturnSection(entityDescriptor, fetchDescriptors) {
	this.fields = entityDescriptor.fields || [];
	this.relDefs = entityDescriptor.rels || [];
	this.fetchDescriptors = fetchDescriptors || {};
}

ReturnSection.prototype._idResultPart = function() {
	return $r.id();
};

ReturnSection.prototype._relsResultPart = function() {
	var fetchHandlers = {
		'$id': $r.id,
		'$count': $r.count
	};
	return this.relDefs.map(function(relDef) {
		var fetchDesc = this.fetchDescriptors[relDef.alias];
		var oneResultPart = fetchHandlers[fetchDesc.fetch]().of(relDef.alias);
		return  relDef.card === 'one' || fetchDesc.fetch === '$count'
			?	oneResultPart
			: $r.collect(oneResultPart);
	}.bind(this));
};

ReturnSection.prototype.buildResultMap = function() {
	var resultMap = $r.map([].concat(this._idResultPart(), this.fields, this._relsResultPart())).toString();
	return ['RETURN', resultMap].join(' ');
};

ReturnSection.prototype.buildOptionalRels = function() {
	return this.relDefs.map(function(relDef) {
		var relPart = $p.rel(relDef.type, $p.node(relDef.label, relDef.alias), { dir: relDef.dir });
		return ['OPTIONAL MATCH', relPart].join(' ')
	}).join(' ');
};

ReturnSection.prototype.toString = function() {
	return compact([this.buildOptionalRels(), this.buildResultMap()]).join(' ');
};

module.exports = ReturnSection;
