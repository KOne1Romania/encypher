'use strict';

var defn = require('defn');
var defaults = require('lodash-node').defaults;

var $resultParts = require('../parts').result;

function FetchData(fetchOptions, cardinality) {
	this.fetchOptions = buildFetchOptions(fetchOptions, cardinality);
}

function buildFetchOptions(fetchOptions, cardinality) {
	return defaults(fetchOptions || {}, {
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

FetchData.prototype = {
	constructor: FetchData,

	get aggregateFn() {
		return $resultParts[this.fetchOptions.aggregate];
	},

	resultPart: function(context) {
		var baseResultPart = buildBaseResultPart(this.fetchOptions.fetch);
		return this.aggregateFn(baseResultPart).of(context);
	}
};

FetchData.buildFetchOptions = buildFetchOptions;
module.exports = FetchData;
