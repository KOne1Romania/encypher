'use strict';

var defaults = require('lodash-node').defaults;

function NodeMath(def) {
	defaults(this, def);
}

NodeMath.prototype = {
	constructor: NodeMath,

	toString: function() {
		return '(' + [this.alias, this.label].join(':') + ')';
	}

};

module.exports = NodeMath;
