'use strict';

var _ = require('lodash-node'),
    inflection = require('inflection');

var $resultParts = require('../parts/result'),
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

var prepend = _.partial(_.partial, joinCamelCase),
    append = _.partial(_.partialRight, joinCamelCase);

var OPS_FIELD_DECORATORS = {
	'eq'   : _.identity,
	'ne'   : prepend('wrong'),
	'lt'   : prepend('max'),
	'gt'   : prepend('min'),
	'regex': append('regex'),
	'in'   : inflection.pluralize
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
		: $resultParts.field(this.field);

	this.value = this.op === 'regex' ? caseInsensitiveRegex(this.value) : this.value;

	this.on(this.contextName);
}

BinaryCondition.prototype = _.create(BaseCondition.prototype, {
	constructor: BinaryCondition,

	_fieldPartWithContext: function() {
		return this.fieldPart.withContext(this.context);
	},

	_decoratedField: function() {
		var decorator = OPS_FIELD_DECORATORS[this.op] || _.identity;
		return decorator(this._fieldPartWithContext().alias());
	},

	_opSymbol: function() {
		return OPS_MAPPING[this.op] || this.op.toUpperCase();
	},

	_queryString: function() {
		return [
			this._fieldPartWithContext().value(),
			this._opSymbol(),
			QueryObject.varNameToToken(this._decoratedField())
		].join(' ');
	},

	_queryParams: function() {
		var params = {};
		params[this._decoratedField()] = this.value;
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
