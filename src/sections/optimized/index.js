'use strict';

var ensureInstance = require('ensure-instance');

module.exports = {
	'order': require('../common').order,
	'subset': require('../common').subset,
	'filter': ensureInstance(require('./OptimizedFilterSection')),
	'return': ensureInstance(require('./OptimizedReturnSection'))
};
