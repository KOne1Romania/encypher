'use strict';

var ensureInstance = require('ensure-instance');

module.exports = {
	node    : require('./node'),
	relation: ensureInstance(require('./RelationDescriptor')),
	entity  : ensureInstance(require('./EntityDescriptor')),
	fetch   : ensureInstance(require('./fetch/FetchDescriptor'))
};
