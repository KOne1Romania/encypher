'use strict'

var _ = require('lodash-node')

var $relationDescriptor = require('../descriptors').relation,
    $resultParts        = require('../parts').result,
    $orderPart          = require('../parts').order,
    $clauses            = require('../clauses'),
    QueryObject         = require('../query/QueryObject')

function ReturnSection(def) {
	_.defaults(this, def, {
		fields: [],
		relationDescriptors: [],
		orderParts: []
	})
	this.relationDescriptors = this.relationDescriptors.map(function(fetchDescriptor) {
		return $relationDescriptor(fetchDescriptor)
	})
	this.orderParts = this.orderParts.map(function(orderPartDef) {
		return $orderPart(orderPartDef)
	})
}

ReturnSection.prototype = {
	constructor: ReturnSection,

	_ownResultParts: function() {
		return [$resultParts.id()].concat(this.fields)
	},

	_relatedResultParts: function() {
		return this.relationDescriptors.map(function(fetchDescriptor) {
			return $resultParts.node().of(fetchDescriptor.resultPart().alias())
		})
	},

	_resultParts: function() {
		return this._ownResultParts().concat(this._relatedResultParts())
	},

	_fetchSubsection: function() {
		var fetchedEntities = ['$self']
		return this.relationDescriptors.reduce(function(clauseStrings, fetchDescriptor) {
			clauseStrings.push(fetchDescriptor != null ? [
				$clauses.optionalMatch(fetchDescriptor.matchPart()),
				$clauses.with(fetchedEntities.concat(fetchDescriptor.resultPart()))
			].join(' ') : '')
			fetchedEntities.push(fetchDescriptor.resultPart().alias())
			return clauseStrings
		}, []).join(' ')
	},

	_orderClause: function() {
		return $clauses.order(this.orderParts).toString()
	},

	_returnCaluse: function() {
		return $clauses.return([$resultParts.map(this._resultParts())])
	},

	queryObject: function() {
		var queryString  = _.compact([
			this._fetchSubsection(),
			this._orderClause(),
			this._returnCaluse()
		]).join(' ')
		return new QueryObject(queryString)
	},

	toString: function() {
		return this.queryObject().toString()
	}
}

module.exports = ReturnSection
