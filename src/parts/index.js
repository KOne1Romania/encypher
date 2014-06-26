var exportGenerators = exports.exportGenerators = require('..').exportGenerators;

exportGenerators(exports, __dirname, '-part');
exports.results = require('./res');
