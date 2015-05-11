'use strict';

var _ = require('lodash-node');

var QueryObject = require('../query/QueryObject');

function SubsetSection(def) {
	_.defaults(this, def, {
		skip : 0,
		limit: 0
	});
}

SubsetSection.prototype = {
	constructor: SubsetSection,

	queryObject: function() {
		return QueryObject.merge(['skip', 'limit'].map(this._queryObjectFor.bind(this)));
	},

	_queryObjectFor: function(part) {
		var queryString = this._queryStringFor(part),
		    queryParams = _compactObject(_.pick(this, part));
		return new QueryObject(queryString, queryParams);
	},

	_queryStringFor: function(part) {
		var value = this[part],
		    partName = part.toUpperCase(),
		    partToken = [ partName, QueryObject.varNameToToken(part) ].join(' ')
		return value ? partToken : '';
	},

	toString: function() {
		return this.queryObject().toString();
	}
};

function _compactObject(subsetOptions) {
	return _.pick(subsetOptions, _.identity);
}

module.exports = SubsetSection;
