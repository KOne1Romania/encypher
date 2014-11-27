'use strict';

var defn = require('defn');
var defaults = require('lodash-node').defaults;

var $resultParts = require('../../parts/index').result;

function FetchOptions(def, cardinality) {
	defaults(this, def, {
		aggregate: cardinality == 'one' ? 'identity' : 'collect',
		retrieve: 'id'
	});
}

var buildBaseResultPart = defn({
	'String': function(fetchedStuff) {
		return $resultParts[fetchedStuff]()
	},
	'[String]': function(fetchedFields) {
		return $resultParts.map([$resultParts.id()].concat(fetchedFields));
	},
	'{field: String}': function(fieldDef) {
		var fieldName = fieldDef.field;
		return $resultParts.field(fieldName);
	}
});

FetchOptions.prototype = {
	constructor: FetchOptions,

	get aggregateFn() {
		return $resultParts[this.aggregate];
	},

	resultPart: function(context) {
		var baseResultPart = buildBaseResultPart(this.retrieve);
		return this.aggregateFn(baseResultPart).of(context);
	}
};

module.exports = FetchOptions;
