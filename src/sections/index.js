'use strict';

var ensureInstance = require('ensure-instance');

module.exports = {
	'filter': ensureInstance(require('./FilterSection')),
	'return': ensureInstance(require('./ReturnSection'))
};
