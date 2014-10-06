'use strict';

var ensureInstance = require('ensure-instance');

module.exports = {
	'order': ensureInstance(require('./OrderSection')),
	'subset': ensureInstance(require('./SubsetSection')),
	'filter': ensureInstance(require('./OptimizedFilterSection')),
	'return': ensureInstance(require('./OptimizedReturnSection'))
};
