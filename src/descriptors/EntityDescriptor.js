"use strict";

var RelationDescriptor = require('./RelationDescriptor');

function EntityDescriptor(def) {
	this.name = def.name;
	this.fields = def.fields;
	this.rels = (def.rels || []).map(function(relDef) {
		return new RelationDescriptor(relDef);
	});
}

module.exports = EntityDescriptor;
