'use strict';

var _ = require('lodash-node');

var BaseCondition = require('./BaseCondition.js'),
    QueryObject = require('../query/QueryObject');

function TreeCondition(def) {
	BaseCondition.call(this);
	_.defaults(this, def, {
		op      : 'and',
		children: []
	});
	if (this.contextName) {
		this.on(this.contextName);
	}
}

TreeCondition.prototype = _.create(BaseCondition.prototype, {
	constructor: TreeCondition,

	on: function(node) {
		this.children.forEach(function(child) {
			child.on(node);
		});
		return this;
	},

	queryObject: function() {
		var childrenQObjects = this.children.map(function(child) {
			return child.queryObject();
		});
		return QueryObject.merge(childrenQObjects, {
			separator: ' ' + this.op.toUpperCase() + ' ',
			left     : '(',
			right    : ')'
		})
	},

	toString: function() {
		return this.queryObject().toString();
	}
});

module.exports = TreeCondition;
