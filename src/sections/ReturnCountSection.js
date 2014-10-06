'use strict';

var _ = require('lodash-node');

var $resultParts = require('../parts/index').result,
    $clauses = require('../clauses/index'),
    QueryObject = require('../query/QueryObject');

function ReturnSection() {
}

ReturnSection.prototype = {
	constructor: ReturnSection,

	queryObject: function() {
		var queryString = $clauses.return([$resultParts.count().of('$self')]).toString();
		return new QueryObject(queryString);
	},

	toString: function() {
		return this.queryObject().toString();
	}
};

module.exports = ReturnSection;
