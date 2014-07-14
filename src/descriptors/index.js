'use strict';

var ensureInstance = require('ensure-instance');

module.exports = {
	node    : require('./node'),
	entity  : ensureInstance(require('./EntityDescriptor')),
	relation: ensureInstance(require('./RelationDescriptor'))
};
