"use strict";

var ensureInstance = require('ensure-instance');

var RelationDescriptor = require('./RelationDescriptor');

function EntityDescriptor(def) {
	this.label = def.label;
	this.fields = def.fields || [];
	this.relationDescriptors = (def.rels || [])
		.map(function(relationDescriptor) {
			return ensureInstance(RelationDescriptor)(relationDescriptor);
		});
}

module.exports = EntityDescriptor;
