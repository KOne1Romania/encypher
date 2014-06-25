"use strict";

var create = require('lodash-node').create;

var FieldResultPart = require('./field-res-part');

function IdResPart(opts) {
	FieldResultPart.call(this, 'id', opts);
}

IdResPart.prototype = create(FieldResultPart.prototype, {
	constructor: IdResPart,

	value: function() {
		return 'id(' + this.node.value() + ')';
	}

});

module.exports = IdResPart;
