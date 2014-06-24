var generator = require('obj-generator');
var forOwn = require('lodash-node').forOwn;

exports.exportGenerators = function(exports, dirname, suffix) {
	var klasses = require('require-all')({
		dirname: dirname,
		filter: new RegExp('^(.*)' + suffix + '\\.js$'),
		excludeDirs: /.+/
	});

	forOwn(klasses, function(klass, name) {
		exports[name] = generator(klass);
	});
};
