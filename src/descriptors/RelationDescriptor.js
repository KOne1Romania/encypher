"use strict";

var inflection = require('inflection');

function RelationDescriptor(def) {
	this.type = def.type;
	this.label = def.label;
	this.inbound = def.inbound || false;
	this.singular = def.singular || false;
	this.alias = def.alias || inflection.camelize(this.label, true);
	if (!this.singular) {
		this.alias = inflection.pluralize(this.alias);
	}
}

module.exports = RelationDescriptor;
