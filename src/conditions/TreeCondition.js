'use strict';

var _ = require('lodash-node');

var BaseCondition = require('./BaseCondition.js');

function TreeCondition(def) {
	BaseCondition.call(this);
	_.defaults(this, def, {
		op: 'and',
		children: []
	});
}

TreeCondition.prototype = _.create(BaseCondition.prototype, {
	constructor: TreeCondition,

	on: function(node) {
		this.children.forEach(function(child) {
			child.on(node);
		});
		return this;
	},

	toString: function() {
		var separator = ' ' + this.op.toUpperCase() + ' ';
		var joinedClause = this.children.join(separator);
		return this.children.length > 1
			? '(' + joinedClause + ')'
			: joinedClause;
	}
});

module.exports = TreeCondition;
