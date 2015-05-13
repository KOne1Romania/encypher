'use strict';

var _ = require('lodash-node');

var $resultParts = require('../parts').result,
    $clauses = require('../clauses'),
    QueryObject = require('../query/QueryObject');

function ReturnCountSection() {
}

ReturnCountSection.prototype = {
	constructor: ReturnCountSection,

	queryObject: function() {
		var queryString = $clauses.return([$resultParts.count().of('$self')]).toString();
		return new QueryObject(queryString);
	},

	toString: function() {
		return this.queryObject().toString();
	}
};

module.exports = ReturnCountSection;
