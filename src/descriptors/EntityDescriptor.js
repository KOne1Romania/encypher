"use strict";

var $relation = require('./.').relation;

function EntityDescriptor(def) {
	this.label = def.label;
	this.fields = def.fields || [];
	this.relationDescriptors = (def.rels || [])
		.map(function(relationDescriptor) {
			return $relation(relationDescriptor);
		});
}

module.exports = EntityDescriptor;
