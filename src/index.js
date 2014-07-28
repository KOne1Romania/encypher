var generator = require('obj-generator'),
    forOwn = require('lodash-node').forOwn,
    inflection = require('inflection');

exports.exportGenerators = function(exports, dirname, suffix) {
	var klasses = require('require-all')({
		dirname: dirname,
		filter: new RegExp('^(.*)' + suffix + '\\.js$'),
		excludeDirs: /.+/
	});

	forOwn(klasses, function(klass, name) {
		exports[inflection.camelize(name, true)] = generator(klass);
	});
};
