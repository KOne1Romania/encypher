"use strict";

var inflection = require('inflection');

function RelationDescriptor(def) {
	this.type = def.type;
	this.label = def.label;
	this.dir = def.dir || 'outbound';
	this.card = def.card || 'many';
	this.alias = def.alias || inflection.camelize(this.label, true);
}

module.exports = RelationDescriptor;
