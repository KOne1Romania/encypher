"use strict";

var RelationDescriptor = require('./RelationDescriptor');

function EntityDescriptor(def) {
	this.label = def.label;
	this.fields = def.fields || [];
	this.relationDescriptors = (def.rels || [])
		.map(function(relationDescriptor) {
			return RelationDescriptor.ensureInstance(relationDescriptor);
		});
}

EntityDescriptor.ensureInstance = function(instance) {
	return instance instanceof  EntityDescriptor
		? instance
		: new EntityDescriptor(instance);
};

module.exports = EntityDescriptor;
