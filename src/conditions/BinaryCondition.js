'use strict';

var _ = require('lodash-node');

var $resultParts = require('../parts/result');
var encode = require('./util/encode');
var BaseCondition = require('./BaseCondition.js');

var OPS_MAPPING = {
	'eq'   : '=',
	'lt'   : '<',
	'gt'   : '>',
	'ne'   : '<>',
	'isnt' : 'IS NOT',
	'regex': '=~'
};

function BinaryCondition(def) {
	BaseCondition.call(this);
	_.defaults(this, def, {
		field: 'id',
		op   : 'eq',
		value: null
	});

	this.fieldPart = this.field === 'id'
		? $resultParts.id()
		: $resultParts.field(encode.field(this.field));

	this.value = this.op === 'regex'
		? encode.regex(this.value)
		:encode.value(this.value)

	if (this.context) {
		this.contextChain = this.contextChain.nestIn(this.context);
	}
}

BinaryCondition.prototype = _.create(BaseCondition.prototype, {
	constructor: BinaryCondition,

	_opSymbol: function() {
		return OPS_MAPPING[this.op] || this.op.toUpperCase();
	},

	toString: function() {
		return [
			this.fieldPart.withContext(this.contextChain).value(),
			this._opSymbol(),
			this.value
		].join(' ');
	}
});

module.exports = BinaryCondition;
