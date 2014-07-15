"use strict";

var create = require('lodash-node').create;

function DescriptorArgsError(message) {
	Error.call(this);
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = message;
}

DescriptorArgsError.prototype = create(Error.prototype, {
	constructor: DescriptorArgsError
});

module.exports = DescriptorArgsError;
