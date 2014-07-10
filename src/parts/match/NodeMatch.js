'use strict';

var defaults = require('lodash-node').defaults;

function NodeMatch(def) {
	defaults(this, def);
}

NodeMatch.prototype = {
	constructor: NodeMatch,

	toString: function() {
		return '(' + [this.alias, this.label].join(':') + ')';
	}

};

module.exports = NodeMatch;
