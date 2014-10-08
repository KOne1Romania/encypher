"use strict";



function EntityDescriptor(def) {
	this.label = def.label;
	this.fields = def.fields || [];

	var $relation = require('./.').relation;
	this.relationDescriptors = (def.rels || [])
		.map(function(relationDescriptor) {
			return $relation(relationDescriptor);
		});
}

module.exports = EntityDescriptor;
