'use strict';

var defn = require('defn');
var defaults = require('lodash-node').defaults;

var $resultParts = require('../parts').result;

function FetchData(context, fetchOptions, cardinality) {
	this.context = context;
	this.fetchOptions = buildFetchOptions(fetchOptions, cardinality);
}

function buildFetchOptions(fetchOptions, cardinality) {
	return defaults(fetchOptions || {}, {
		aggregate: cardinality == 'many' ? 'collect' : 'identity',
		fetched  : 'node'
	});
}

var buildBaseResultPart = defn({
	'String'  : function(fetched) {
		return $resultParts[fetched]()
	},
	'[String]': function(fetchedFields) {
		return $resultParts.map(fetchedFields);
	}
});

FetchData.prototype = {
	constructor: FetchData,

	get aggregateFn() {
		return $resultParts[this.fetchOptions.aggregate];
	},

	resultPart: function() {
		var baseResultPart = buildBaseResultPart(this.fetchOptions.fetched);
		return this.aggregateFn(baseResultPart).of(this.context);
	}
};

FetchData.buildFetchOptions = buildFetchOptions;
module.exports = FetchData;
