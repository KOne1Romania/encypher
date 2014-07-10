"use strict";

var RelationDescriptor = require('./RelationDescriptor');

function EntityDescriptor(def) {
	this.name = def.name;
	this.fields = def.fields || [];
	this.rels = (def.rels || []).map(function(relDef) {
		return RelationDescriptor.ensureInstance(relDef);
	});
}

EntityDescriptor.ensureInstance = function(instance) {
	return instance instanceof  EntityDescriptor
		? instance
		: new EntityDescriptor(instance);
};

module.exports = EntityDescriptor;
