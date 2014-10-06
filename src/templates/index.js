'use strict';

var ensureInstance = require('ensure-instance');

exports.findAll = ensureInstance(require('./FindAllTemplate'));
exports.count = ensureInstance(require('./CountTemplate'));
