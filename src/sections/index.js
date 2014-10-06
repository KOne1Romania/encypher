'use strict';

var ensureInstance = require('ensure-instance');

module.exports = {
	'order': ensureInstance(require('./OrderSection')),
	'subset': ensureInstance(require('./SubsetSection')),
	'filter': ensureInstance(require('./FilterSection')),
	'return': ensureInstance(require('./ReturnSection')),
	'returnCount': ensureInstance(require('./ReturnCountSection'))
};
