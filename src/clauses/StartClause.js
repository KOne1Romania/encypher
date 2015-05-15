'use strict';

var stampit = require('stampit')

var Ensure = require('../util/stamps').Ensure

var StartPart = require('../parts/StartPart'),
    QueryObject = require('../query/QueryObject');

var StartClause = stampit()
	.state({
		startPart: {}
	})
	.methods({
		toString: function() {
			return this.queryObject().toString();
		},

		queryObject: function() {
			return new QueryObject('START ' + this.startPart);
		}
	})
	.compose(Ensure({
		startPart: StartPart
	}))

module.exports = StartClause
