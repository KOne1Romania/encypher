'use strict';

var defn = require('defn');
var defaults = require('lodash-node').defaults;
var ensureInstance = require('ensure-instance');

var $resultParts = require('../parts').result;

function FetchOptions(def, cardinality) {
	defaults(this, def, {
		aggregate: cardinality == 'one' ? 'identity' : 'collect',
		fetch: 'node'
	});
}

var buildBaseResultPart = defn({
	'String': function(fetchedStuff) {
		return $resultParts[fetchedStuff]()
	},
	'[String]': function(fetchedFields) {
		return $resultParts.map([$resultParts.id()].concat(fetchedFields));
	}
});

FetchOptions.prototype = {
	constructor: FetchOptions,

	get aggregateFn() {
		return $resultParts[this.aggregate];
	},

	resultPart: function(context) {
		var baseResultPart = buildBaseResultPart(this.fetch);
		return this.aggregateFn(baseResultPart).of(context);
	}
};

FetchOptions.ensureInstance = ensureInstance(FetchOptions);

module.exports = FetchOptions;
