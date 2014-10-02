'use strict';

var _ = require('lodash-node'),
    inflection = require('inflection');

var $resultParts = require('../parts/result'),
    encode = require('../util/encode'),
    BaseCondition = require('./BaseCondition.js'),
    QueryObject = require('../query/QueryObject');

var OPS_MAPPING = {
	'eq'   : '=',
	'lt'   : '<',
	'gt'   : '>',
	'ne'   : '<>',
	'regex': '=~'
};

function joinCamelCase(first, second) {
	return inflection.camelize([first, second].join('_'), true);
}

function append(suffix) {
	return _.partialRight(joinCamelCase, suffix);
}

function prepend(prefix) {
	return _.partial(joinCamelCase, prefix);
}

var OPS_FIELD_DECORATORS = {
	'eq': _.identity,
	'ne': prepend('wrong'),
	'lt': prepend('max'),
	'gt': prepend('min'),
	'regex': append('regex'),
	'in': inflection.pluralize
};

function caseInsensitiveRegex(regexString) {
	return '(?i)' + regexString;
}

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

	this.value = this.op === 'regex' ? caseInsensitiveRegex(this.value) : this.value;

	this.on(this.context);

	this.decoratedField = this._decorateField();
}

BinaryCondition.prototype = _.create(BaseCondition.prototype, {
	constructor: BinaryCondition,

	_decorateField: function() {
		var decorator = OPS_FIELD_DECORATORS[this.op] || _.identity;
		return decorator(this.field);
	},

	_opSymbol: function() {
		return OPS_MAPPING[this.op] || this.op.toUpperCase();
	},

	_queryString: function() {
		return [
			this.fieldPart.withContext(this.contextChain).value(),
			this._opSymbol(),
			QueryObject.varNameToToken(this.decoratedField)
		].join(' ');
	},

	_queryParams: function() {
		var params = {};
		params[this.decoratedField] = this.value;
		return params;
	},

	queryObject: function() {
		return new QueryObject(this._queryString(), this._queryParams());
	},

	toString: function() {
		return this.queryObject().toString();
	}
});

module.exports = BinaryCondition;
