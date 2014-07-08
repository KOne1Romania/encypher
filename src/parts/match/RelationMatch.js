'use strict';

var defaults = require('lodash-node').defaults;

var ARROWS = {
	outbound: { left: '-', right: '->' },
	inbound : { left: '<-', right: '-' }
};

function RelationMatch(def) {
	defaults(this, def);
	this.arrows = ARROWS[this.direction];
}

RelationMatch.prototype.toString = function() {
	return [
		this.self,
		this.arrows.left,
			'[:' + this.type + ']',
		this.arrows.right,
		this.related
	].join('');
};

module.exports = RelationMatch;
