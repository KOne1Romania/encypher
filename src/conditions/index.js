'use strict';

var generator = require('obj-generator'),
    _ = require('lodash-node');

var BaseCondition = require('./BaseCondition'),
    BinaryCondition = require('./BinaryCondition'),
    TreeCondition = require('./TreeCondition'),
		ConditionFormatError = require('../errors/ConditionFormatError');

var condition = module.exports = function (def) {
	switch (true) {
		case def instanceof BaseCondition:
			return def;
		case def.value != null:
			return new BinaryCondition(def);
		case def.children != null:
			return new TreeCondition(def);
		default:
			var errorMessage = 'Condition def requires one of fields: `value`, `children`';
			throw new ConditionFormatError(errorMessage);
	}
};

_.merge(condition, {
	binary: generator(BinaryCondition),
	tree: generator(TreeCondition)
});
