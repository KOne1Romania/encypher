"use strict";

var create = require('lodash-node').create;

function ConditionFormatError(message) {
	Error.call(this);
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = message;
}

ConditionFormatError.prototype = create(Error.prototype, {
	constructor: ConditionFormatError
});

module.exports = ConditionFormatError;
