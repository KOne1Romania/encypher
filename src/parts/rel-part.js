"use strict";

var extend = require('lodash-node').extend;

var ARROWS = {
	outbound: { left: '-', right: '->' },
	inbound : { left: '<-', right: '-' }
};

/**
 * @constructor
 */
function RelationPart(type, other, opts) {
	opts = extend({
		self: '$self',
		dir : 'outbound',
		name: ''
	}, opts);
	this.self = opts.self;
	this.name = opts.name;
	this.arrows = ARROWS[opts.dir];
	this.type = type.toUpperCase();
	this.other = other;
}

RelationPart.prototype.toString = function() {
	return [
		this.self,
		this.arrows.left,
		'['+ this.name + ':' + this.type + ']',
		this.arrows.right,
		this.other
	].join('');
};

module.exports = RelationPart;
