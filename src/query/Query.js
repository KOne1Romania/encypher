'use strict';

var _ = require('lodash-node');

function Query(def) {
	_.defaults(this, def, {
		string: '',
		params: {}
	})
}

Query.prototype = {
	constructor: Query
};

module.exports = Query;
